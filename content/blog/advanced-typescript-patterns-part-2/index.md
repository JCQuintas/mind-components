---
title: 'Advanced Typescript Patterns - Part 2'
created: '2019-12-15T16:23:57.813Z'
edited: '2019-12-15T16:23:57.813Z'
description: 'This part focuses on type inference, getting a type from a function argument can be challenging at first, but after you understand what is happening it should become a breeze.'
series: 'Advanced Typescript Patterns'
part: 2
---

Previously we started our journey into the advanced typescript patterns and dealt with **type extension**, types with **strict conditional properties** and **generic types**. On this part we will focus on **type inference** and how it can be used to help you, as well as **argument pattern matching**.

Type inference is a way to **deduce** the type of an argument value and allow you to use it in any way you want, without previously having to know the type beforehand. This also means that you don't need to actively declare some of the types.

## Inference From Argument Type

This one is very simple, the function will be able to infer the return type based on the argument received. This is often not necessary, as the typescript engine does it for you in most of the cases, but the way the default inference works is generic, which means it might cause some unwanted side effects.

```typescript {8}
type Input = string | number

// This accepts value as T,
// where T is an extension of string or number
// this means the only acceptable values are string or number.
// It returns an object containing a property value
// this property is of type T
const addValue = <T extends Input>(value: T): { value: T } => {
  return {
    value,
  }
}

addValue('value').value.toUpperCase()
// Ok

addValue('value').value.toFixed()
// Property 'toFixed' does not exist on type '"value"'.

addValue(1).value.toFixed()
// Ok

addValue(1).value.toUpperCase()
// Property 'toUpperCase' does not exist on type '1'.
```

While if we use the default inference we would get an error, since the default engine's inference are generic, `value` will be `string | number`, which means that a method that is only present on the `string` type would throw an error.

```typescript {6}
const addValue = (value: Input) => ({
  value,
})

addValue('value').value.toUpperCase()
// Property 'toUpperCase' does not exist on type 'number'.
```

This proves useful when you need to trim down to an exact type based on argument, as the typescript's engine inference returns a generic type. We will delve in a more advanced use on the next section.

## Derived Object Type From Function Argument

As it turns out, not only can we `return` the value, we can also **manipulate** it into something else entirely. I used this pattern in my own library, [Style-genie 🧞‍♂️🧞‍♀️](https://github.com/JCQuintas/style-genie). It's a collection of style utilities for css-in-js frameworks.

One of these utilities is a function to generate `@media breakpoints`, aptly named `generateBreakpoint`. It receives an object with a **breakpoints** parameter, which is an object of number values `{ [key: string]: number }` itself, but it has to return an object of string values `{ [key: string]: string }`, apart from putting it inside another object. You can try to understand the [full code here](https://github.com/JCQuintas/style-genie/blob/2f10085f05c236f87bf7db1d557557092b65f06e/src/breakpoint/index.ts#L63), but I will provide a simpler example in the next lines.

Here we will create a function that receives an object parameter that has number values `{ [key: string]: number }`, we will turn these values into negative, positive and add pixel values `--px` to it. In the end we will return an object with the slightly more complex shape below.

```typescript
interface Return {
  positive: {
    [key: string]: string
  }
  negative: {
    [key: string]: string
  }
}
```

And not only that, the keys inside `positive` and `negative` will be exactly those of the input object, with **IDE autocompletion** and all. So lets start coding.

  <!-- prettier-ignore-start -->

```typescript
interface Input {
  [key: string]: number
}

// This will be the shape of the return value of the function.
// We will be using Record to use the keys of the inputted T type
// and change whatever type they have into 'string'.
// All the magic is in this Record inside the Return type.
interface Return<T extends Input> {
  positive: Record<keyof T, string>
  negative: Record<keyof T, string>
}

const pixelize = <T extends Input>(entries: T): Return<T> => {
  // This is just to convert the values
  const positive = Object.entries(entries).reduce((acc, [k, v]) => ({ ...acc, [k]: `${v}px` }), {})
  const negative = Object.entries(entries).reduce((acc, [k, v]) => ({ ...acc, [k]: `-${v}px` }), {})

  // We then return everything, the type at the end is because
  // .reduce messes with typing so we just restore it
  return {
    positive,
    negative,
  } as Return<T>
}
```

<!-- prettier-ignore-end -->

This is the bulk of the function and typings. As you can see, it requires very little effort, but can be very powerful. I will also provide a `pixelizeDefault` in CodeSandbox, it will be exactly as the `pixelize` function but without most of the `typings`, so it will use the default typescript inference and you can see that the IDE won't autocomplete the properties of the input object.

<iframe
     src="https://codesandbox.io/embed/pensive-colden-g9huu?autoresize=1&fontsize=14&theme=dark&view=editor"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="mindcomponents/advanced-typescript-patterns-part-2"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

This concludes our current dive on `inferred types`, the next section of this post could be thought of as inferred, but I prefer to think of it as more of a **pattern matching** than inference.

## Function Signature Overload

A function can have plenty of return types and arguments, but you can't always declare them directly. To do that you need to use a pattern named **function overload**, in which you give more than one type to a function. But how we do that?

First you need to know that it is not possible to **directly** overload a function. But there are two ways to do it. One is to overload it on a `.d.ts` file, the other, which is simpler, is by just creating an interface full of functions, as depicted below.

```typescript
interface FunctionTypeOverload {
  (): null
  (value: string): null
}

// And we can use it on any function
const DoSomething: FunctionTypeOverload = () => { ... }
```

This pattern can prove useful when you have a function with **modifiers** that will change the return value type, for example, as we will see bellow, a function that returns a string, but will return a number if `boolean` argument is present.

## Function Return Based on Arguments

As it turns out, we can also return an exact type based on how many arguments were used or what are the argument's types. We do this by having one overload for each of the possible argument patterns.

For this part we will create a function that will receive one of the following combination of arguments and return values:

| arguments              | return   |
| ---------------------- | -------- |
| no argument            | `null`   |
| a `string`             | `string` |
| a `string` and `false` | `string` |
| a `string` and `true`  | `number` |

Now that we have the combinations we want, it's just a game of matching the right typescript pieces together. Note that we merge option 2 and 3, since for the purpose of this function `undefined === false`.

```typescript {1-5}
interface Overload {
  (): null
  (value: string, asNumber?: false): string
  (value: string, asNumber: true): number
}

// You type the actual function with the correct optional values when possible.
// Though on more complex structures you might need to have the arguments
// as (...args: any[]).
const doSomething: Overload = (value?: string, asNumber?: boolean) => {
  if (!value) return null
  if (asNumber) return parseInt(value, 10)
  return value
}

const a = doSomething()
// typeof a === 'null'

const b = doSomething('b')
// typeof b === 'string'

const c = doSomething('c', false)
// typeof c === 'string'

const d = doSomething('1', true)
// typeof d === 'number'
```

With this we conclude this post on typescript patterns. We focused on inferences and manipulation of function arguments and output. This may look simple to some and difficult to others, but ultimately they should help you create more powerful typings for your applications.
