---
title: 'Building a Configurable Gesture Engine With Native Events'
created: '2026-11-11T16:18:21.000Z'
edited: '2026-11-11T16:18:21.000Z'
description: 'How we designed the gesture engine behind MUI X Charts so that gestures are regular DOM events that can be named, combined and reconfigured at runtime.'
keywords: gestures, pointer events, custom events, typescript, mui, mui x, charts, zoom, pan, pinch, wheel, multitouch
---

Charts look like a read-only thing until you try to interact with one. Then you need to pan, pinch, zoom with the wheel, tap, press, brush a selection, and all of it has to work with a mouse, a finger and a pen. On top of that, every team wants it slightly different: "zoom only when `Ctrl` is pressed", "drag to pan on touch, but not with the mouse".

At [MUI](https://mui.com) we ended up writing a small engine to handle all of that for [MUI X Charts](https://mui.com/x/react-charts/), it lives in the [`@mui/x-internal-gestures`](https://github.com/mui/mui-x/tree/master/packages/x-internal-gestures) package. In this post I want to go over the decisions that made it dynamic and configurable. Spoiler: almost all of them come down to using the event system the browser already gives us.

<aside>
  <b>Note:</b> as the name implies, this is an <b>internal</b> package. It powers the charts, but it is not meant to be used directly and its API can change at any time. The ideas, however, are easy to take with you.
</aside>

## Gestures Are Just Events

The whole engine can be described in one sentence: native pointer events go in, native `CustomEvent`s come out.

```typescript
import {
  GestureManager,
  PanGesture,
  TapGesture,
} from '@mui/x-internal-gestures/core'

const gestureManager = new GestureManager({
  gestures: [
    new TapGesture({ name: 'tap' }),
    new PanGesture({ name: 'pan' }),
  ],
})

const target = gestureManager.registerElement(
  ['tap', 'pan'],
  document.getElementById('target')
)

target.addEventListener('tap', (event) => {
  console.log(`Tap at: x=${event.detail.x}, y=${event.detail.y}`)
})

target.addEventListener('pan', (event) => {
  const { totalDeltaX: x, totalDeltaY: y } = event.detail
  target.style.transform = `translate(${x}px, ${y}px)`
})
```

There is no `onPan` callback and no custom `subscribe` function. You listen to a gesture the same way you listen to a `click`, and you stop listening with `removeEventListener`. When a gesture is recognized, this is all the engine does:

```typescript
const domEvent = new CustomEvent(eventName, {
  bubbles: true,
  cancelable: true,
  composed: true,
  detail: customEventData,
})

element.dispatchEvent(domEvent)
```

That small block gives us a lot for free. The event **bubbles**, so you can listen on a parent. It is **composed**, so it crosses shadow DOM boundaries. It works with any framework, since all of them know how to deal with DOM events. In React it is a regular effect with a cleanup function. And the original event is always available in `event.detail.srcEvent`, in case you need to call `preventDefault` yourself.

## The Name Is the API

A gesture class does not own its event name, the **instance** does. Whatever you pass as `name` becomes the event. Gestures with phases emit `<name>Start`, `<name>`, `<name>End` and `<name>Cancel`, while single phase ones, like a tap or a wheel turn, only emit `<name>`.

```typescript
function createEventName(gesture: string, phase: GesturePhase): string {
  if (phase === 'ongoing') {
    return gesture
  }

  return `${gesture}${phase.charAt(0).toUpperCase()}${phase.slice(1)}`
}
```

This looks like a detail, but it is what allows the same gesture to be used many times with different settings. The charts create three instances of `PanGesture`, each one for a different feature:

```typescript
new PanGesture({ name: 'pan', threshold: 0, maxPointers: 1 })
new PanGesture({ name: 'brush', threshold: 0, maxPointers: 1 })
new PanGesture({
  name: 'zoomPan',
  threshold: 0,
  preventIf: ['zoomTapAndDrag', 'zoomPressAndDrag'],
})
```

The axis interaction, which drives the tooltip and the highlight, listens to `pan`, the brush listens to `brush` and the zoom listens to `zoomPan`. None of them knows the others exist.

Since gesture names share the same space as regular DOM events, the constructor throws if you try to use a native name like `click` or `wheel`. Mixing those up would be a very annoying bug to find.

## One Set of Listeners

Gestures do not add their own pointer listeners. A single `PointerManager` listens to `pointerdown`, `pointermove`, `pointerup` and `pointercancel` on a root element, keeps a `Map` with every active pointer, and hands that map to each registered gesture.

```typescript
const handler = this.handlePointerEvent
const options = { passive: this.passive }

this.root.addEventListener('pointerdown', handler, options)
this.root.addEventListener('pointermove', handler, options)
this.root.addEventListener('pointerup', handler, options)
this.root.addEventListener('pointercancel', handler, options)
```

Multi-touch comes almost for free from this. A gesture receives all the pointers that are relevant to its element and works with their **centroid**, so panning with one finger or with three is the same code path. When a finger is added or lifted in the middle of a gesture, the starting centroid is adjusted to compensate, which prevents the content from jumping.

The same pipeline is used for the unhappy paths. When the window loses focus or a context menu opens, the manager sends a synthetic `forceCancel` event through the same handlers, so the gestures can cancel properly instead of staying stuck in an active state.

## Templates and Clones

The gestures you give to the `GestureManager` are not attached to anything, they are **templates**. When you register an element, each template is cloned for it, so every element has its own state and its own configuration. You can also override options for that element only:

```typescript
gestureManager.registerElement(['pan', 'pinch'], element, {
  pan: { threshold: 20, direction: ['left', 'right'] },
})
```

## Configuration Travels Through Events Too

This is the part I like the most. Changing the options of a gesture that is already running is a single call:

```typescript
gestureManager.setGestureOptions('pan', element, { threshold: 5 })
```

But the manager does not reach into the gesture instance to do it. It dispatches another event on the element, and the gesture, which has been listening for it since it was initialized, updates itself:

```typescript
const event = new CustomEvent(`${gestureName}ChangeOptions`, {
  detail: options,
  bubbles: false,
  cancelable: false,
  composed: false,
})

element.dispatchEvent(event)
```

The internal state works the same way, through a `<name>ChangeState` event. It is useful when a value is changed from somewhere else and the gesture needs to follow, like the accumulated delta of a wheel gesture.

Nothing is destroyed or registered again, which is exactly what we needed for the charts. The `zoomInteractionConfig` prop lets users decide which interactions are enabled and when:

```tsx
<BarChartPro
  zoomInteractionConfig={{
    // Only zoom when Control key is pressed
    zoom: [{ type: 'wheel', requiredKeys: ['Control'] }],
    // Only pan when Shift key is pressed
    pan: [{ type: 'drag', requiredKeys: ['Shift'] }],
  }}
/>
```

When that prop changes, the zoom plugin only has to forward the new options to the gesture that is already there.

## Letting Gestures Coexist

Having many gestures on the same element means they will fight each other. Three options handle most of the conflicts:

- `preventIf`: a list of gesture names that block this gesture while they are active. The engine keeps a registry of the active gestures of each element to answer that question. Only gestures with phases can block others, since a tap is never "active".
- `requiredKeys`: the keys that must be pressed for the gesture to be recognized. There is a special `ControlOrMeta` key, which resolves to `Meta` on Apple devices and to `Control` everywhere else.
- `pointerMode` and `pointerOptions`: the first one restricts a gesture to `mouse`, `touch` or `pen`, the second one overrides options for a specific pointer type.

```typescript
new PanGesture({
  name: 'zoomPan',
  preventIf: ['zoomPinch'],
  pointerOptions: {
    mouse: { requiredKeys: ['ControlOrMeta'] },
    touch: { requiredKeys: [] },
  },
})
```

With the configuration above, a mouse user needs to hold a key in order to pan, while a touch user can simply drag. Every emitted event also carries an `activeGestures` object in its `detail`, so a listener can make its own decisions when the options are not enough.

## Only Pay for What You Use

Templates can also be added and removed after the manager is created, using `addGestures` and `removeGestures`. We use it to keep the bundle small. The core of the charts only registers what every chart needs, like `pan`, `move` and `tap`. The pinch, wheel and tap and drag gestures are registered by the zoom plugin when it mounts, so their code is only bundled when the zoom is.

## Types That Follow the Names

Custom event names are usually where type safety ends. To avoid that, `registerElement` returns the same element you gave it, but with `addEventListener` and `removeEventListener` typed for the gestures you registered. The event names are derived from the gesture names using template literal types. Simplified, it looks like this:

```typescript
type PhasedEvents<Name extends string> =
  | `${Name}Start`
  | Name
  | `${Name}End`
  | `${Name}Cancel`
```

So `target.addEventListener('zoomPanStart', ...)` autocompletes, and `event.detail` has the type of a pan event. I will be honest, the real types behind it are not pretty and needed a few `@ts-expect-error` comments to work, but that complexity stays inside the package.

## Testing With Real Events

Because the engine only consumes native events, testing it does not require any mocks. The package has a `testing` entry point that simulates a user by dispatching real pointer events:

```typescript
import { touchGesture } from '@mui/x-internal-gestures/testing'

const touch = touchGesture.setup()

await touch.pan(element, {
  start: { x: 100, y: 100 },
  end: { x: 200, y: 100 },
})
await touch.pinch(element, { scale: 1.5 })
```

The tests go through the exact same path a real finger would.

## Wrapping Up

Looking back, the engine is dynamic because we avoided inventing our own communication layer. Pointer events are the input, custom events are the output and even the configuration is sent as an event. Naming instances instead of classes lets us reuse the same gesture for different features, and templates let every element have its own copy.

If you are building something that needs gestures, you might not need a big abstraction. The platform is already pretty good at telling you that something happened.
