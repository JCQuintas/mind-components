---
title: 'Advanced Typescript Patterns - Part 1'
created: '2019-12-13T18:19:57.809Z'
edited: '2019-12-15T16:23:57.813Z'
description: 'The basics of Typescript are very straight forward, but the likes of generic types and conditional types can be challenging. This post on Advanced Typescript Patterns tries to demystify them.'
series: 'Advanced Typescript Patterns'
part: 1
---

From experience, most developers grasp the basics of typescript within weeks. But, while typescript infer a lot of types for us, sometimes you need to intervene, and when that happens **all hell breaks loose**.

For the content of this post I will start with more basic patterns and progressively advance to the more complex ones.

## Extending Types

Extending types, also called [intersection types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#intersection-types) is when you want a new type to extend a type you have previously created. This can be useful when having conditional properties on an object for instance. If we have a `Link` component that accepts `className` as a common prop, and `url` or `to` as conditional props, then we can have it typed as follows.

```typescript
import { ExternalType } from 'some-module'

interface Common {
  className?: string
}

// You can extend a single interface
interface Url extends Common {
  url: string
}

// Or multiple interfaces by using a comma
interface To extends Common, ExternalType {
  to: string
}

type Link = To | Url
```

If you need a type to extend an interface it's super easy also, you just need to use the `&` operator.

```typescript
type Url = Common & {
  url: string
}
```

This is all good and will work in most cases. But sometimes you really want to enforce one type **OR** the other. We will cover that in the next section.

## Strict Conditional Properties Type

This can be done using the `never` type. It's a special type that says the variable should **never** be set. We will also be using the `Record` type, it gets a set of keys and **record** them into a new `object` type that has the type of the second parameter.

```typescript {1,4}
const doNotSet: never = ''
// Type '""' is not assignable to type 'never'.

type User = Record<'firstName' | 'lastName', string>

const user: User = {
  firstName: 'Some',
  lastName: 'Name',
}
```

With these properties in mind we can define a stricter interface for our `Link` component.

```typescript {16,17}
// This gets an interface and make all its properties optional and never
type Neverify<T> = Partial<Record<keyof T, never>>

interface Common {
  className?: string
}

interface Url {
  url: string
}

interface To {
  to: string
}

// Type Link consists of Common and To OR Common and Url
type Link = Common & ((To & Neverify<Url>) | (Url & Neverify<To>))
```

We can verify that it works by assigning the variables bellow.

```typescript {19}
const toProps: Link = {
  to: '',
  className: '',
}
// Ok

const urlProps: Link = {
  url: '',
  className: '',
}
// Ok

// But it can't have both 'to' and 'url'
const urlAndToProps: Link = {
  to: '',
  url: '',
  className: '',
}
// Types of property 'to' are incompatible.
```

This is very useful when declaring a type for configuration options for example, where you can have many combinations of properties, but want to warn the user if they use two properties that don't match.

## Generic Types

Generic types, as the name says, are types that the user can modify by inputting one or more types. You probably use generic types a lot, usually whenever you have the `Type<something>` pattern you are using a generic type. But how do you create one? Turns out there are a few ways to do so.

### Common Generic Type

Probably the most common generic types are the ones that can receive a type or more and return a derivation from those types.

We will start by having a generic type `User` that adds a `name` property to any inputted type.

```typescript
// As you can see <T> determines that there will be an input type
// and we can use its value as we want.
type User<T> = T & {
  name: string
}

// Here we use the object type { email: string }
// as the input for the User type
const userWithEmail: User<{ email: string }> = {
  email: 'some@email.com',
  name: 'Some Name',
}
```

You can also use the input type as the value of a property as well.

```typescript {9}
type IndexOfType<T, P> = T & {
  index: P
}

const emailAndIndex: IndexOfType<{ email: string }, number> = {
  email: 'some@email.com',
  index: 'Some Index',
}
// Type 'string' is not assignable to type 'number'.
```

This allows you to create types that can be merged together and used in many different ways. But it is not all, these types will **always require** the type input, on the next section we will see how to use defaults or how to make the input require a specific type.

### Advanced Generic Types

Adding a default type is very handy when you want your type to **optionally generic**. Usually, if your type require an input type that is an object, you can pass an empty object `{}` as the default value, else, if it requires one or a combination of basic types, then you can just use them as you would to declare a `var`.

```typescript
// The default value for T is an empty object,
// so this won't add any new properties to our type
type User<T = {}> = T & {
  name: string
}

// Now you can use it without an input type
const user: User = {
  name: 'Some Name',
}

// or with an input type
const userWithEmail: User<{ email: string }> = {
  email: 'some@email.com',
  name: 'Some Name',
}
```

In case your default type is a basic type you can easily declare it as you declare any variable.

```typescript
// Here, T we have seen before,
// but the default for P is number OR string
type Index<T = {}, P = number | string> = T & {
  index: P
}

// This means that using the default values,
// index can be a string
const stringIndex: Index = {
  index: 'Some Index',
}

// Or it can be a number
const numberIndex: Index = {
  index: 1,
}

// But we can also modify everything in case we need
const arrayIndexWithEmail: Index<{ email: string }, string[]> = {
  index: ['first'],
  email: 'some@email.com',
}
```

Now, what do I do when I need to restrict which types can be inputted in my generic type? For that we can use the `extends` keyword. We will use the `User` example above to illustrate.

```typescript {8}
// These are the possible props for the user object.
interface UserProps {
  email: string
  id: number
}

// The input type T extends a partial of UserProps
type User<T extends Partial<UserProps> = {}> = T & {
  name: string
}

// This is ok, as email exists in UserProps
const userWithEmail: User<{ email: string }> = {
  email: 'some@email.com',
  name: 'Some Name',
}

const userWithAddress: User<{ address: string }> = {
  address: 'some@email.com',
  name: 'Some Name',
}
// Type '{ address: string; }' has no properties in
// common with type 'Partial<UserProps>'.
```

Phew! We covered a lot today, in the next part we will talk about type inference, which looks very similar to generic types, but with added functionalities.

<aside style="text-align: center;">
Continue reading this series on <a href="/advanced-typescript-patterns-part-2">Part 2</a>.
</aside>
