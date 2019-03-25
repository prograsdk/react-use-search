# react-use-search

> Search and filtering for React in the shape of a hook!

[![NPM](https://img.shields.io/npm/v/react-use-search.svg)](https://www.npmjs.com/package/react-use-search) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add react-use-search
```

## Usage

The `useSearch` hooks takes a collection as first argument followed by an options object.

```jsx
import React from 'react'
import { useSearch } from 'react-use-search'

function Search({ users }) {
  function predicate(user, query) {
    return user.name.includes(query)
  }

  const [filteredUsers, query, handleChange] = useSearch(emails, { predicate })

  return (
    <>
      <input value={query} onChange={handleChange} />

      {filteredUsers.map(user => (
        <User key={user.id} {...user} />
      ))}
    </>
  )
}
```
