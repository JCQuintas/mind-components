---
title: 'Advanced Typescript Patterns - Part 2'
created: '1970-01-01T00:00:00.000Z'
edited: '1970-01-01T00:00:00.000Z'
description: 'This part focuses on type inference, getting a type from a function input can be challenging at first, but after you understand what is happening it should become a breeze.'
---

<aside>
  <b>Note:</b> This is part 2 of 2 in the Advanced Typescript Pattern series, you can find the other parts on the links bellow.
  <br/>
  <br/>
  <a href="/advanced-typescript-patterns-part-1">Part 1</a>
  <br/>
  Part 2
</aside>

## Type Inference From Function Input

Another very powerful pattern is type inference. This means that you don't need to actively declare a type for the output of a function, you can deduce it from the input received. This can be done in a few ways, the main ones are **inference from input type** and **inference from input order**.

### Inference From Input Type

This one is very simple, the function will be able to infer the return type based on the input received. This is often not necessary, as the typescript engine does it for you in most of the cases. But it can be useful when you need to trim down to an exact type based on input, as the typescript's engine inference is often generic.

```typescript
type Input = string | number | null

// This accepts value as T,
// where T is an extension of string, number or null
// it returns an object containing a property value
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

### Inference From Input Order

## Derived Object Type From Function Input
