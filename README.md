# react-use-search

> 🔍 React hook for searching and filtering data

[![NPM](https://img.shields.io/npm/v/react-use-search.svg)](https://www.npmjs.com/package/react-use-search)
[![CircleCI](https://circleci.com/gh/prograsdk/react-use-search.svg?style=svg)](https://circleci.com/gh/prograsdk/react-use-search)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This React hook aims to provide a simple way to implement search/filter functionality in React components.

## Install

```bash
yarn add react-use-search
```

## Usage

#### `useSearch<T>`

`react-use-search` provides the `useSearch` hook as named export; it takes three parameters:

 * `collection: T[]`
 An array of elements of type `T`.
 
 * `predicate:`[`Predicate<T>`](#predicatet):
 A boolean predicate function used for filtering elements in `collection` based on a query.
 
 * `options:`[`Options`](#options): 
 configuration object.

The hook returns a 4-tuple of type `[T[], string, React.ChangeEventHandler<HTMLInputElement>, (query: string) => void]` consisting of the following elements:

 * `T[]`:
 A filtered version of `collection` passed to `useSearch`.
 
 * `string`:
 The current query.
 
 * `React.ChangeEventHandler<HTMLInputElement>`:
 An event handler for an HTML input element.
 This is to be passes to the search input element as its `onChange` prop.
 
 * `(query: text) => void`:
 A function to programmatically set the query value

The example show a simple component listing users that can be searched by email.

```JSX
import React from 'react'
import {useSearch} from 'react-use-search'
import User from './User'

const predicate = (user, query) => user.email.includes(query)

const UserList = ({users}) => {
  const [filteredUsers, query, handleChange, setQuery] = useSearch(users, predicate, {debounce: 200})

  return (
    <div>
      <input placeholder="Search users by email..." value={query} onChange={handleChange} />
      {filteredUsers.map(user => <User key={user.id} {...user} />)}
      <button onClick={() => setQuery('@example')}>Search for @example addresses</button>
    </div>
  )
}
```

### Types

`react-use-search` exports the following types used to describe the parameteres of `useSearch`.

#### `Predicate<T>`

A binary boolean predicate function of type `(item: T, query: string) => boolean` used in `useSearch` to determine which elements of `collection` should be returned based on the current query.
The parameters of the function are:

 * `item: T`:
 The current element being evaluated.
 
 * `query: string`:
 The current query string.

```typescript
import {Predicate} from 'react-use-search'

interface User {
  email: string;
}

const predicate: Predicate<User> = (user, query) => user.email.includes(query)
```

#### `Options`

An options object used to configure `useSearch`.
It has the following properties:

 * `initialQuery?: string`: 
 The query used for the initial collection returned from `useSearch`.
 
 * `filter?: boolean`: 
 Determines if `useSearch` should behave in a _filtering_ or _searching_ like manner (according to [this definition on StackExchange](https://ux.stackexchange.com/a/4756)).
 If `true`, all elements in `collection` are returned if the current query is empty;
 if `false` (default), an empty array is returned.
 
 * `debounce?: number`:
 This option allows the internal filtering functionality of `useSearch` to be debounced.
 This can be advantageous in cases where `predicate` is complex or `collection` is large.

## License

MIT © [Progras ApS](https://github.com/prograsdk)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
