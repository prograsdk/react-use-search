# use-search

> React hook for searching and filtering data

[![NPM](https://img.shields.io/npm/v/use-search.svg)](https://www.npmjs.com/package/use-search)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add react-use-search
```

## Usage

```jsx
import React from 'react'
import { useSearch } from 'react-use-search'

const predicate = (user, query) => user.name.includes(query)

const Users = ({ users }) => {
  const [filteredUsers, query, handleChange] = useSearch(users, predicate)

  return (
    <div>
      <input placeholder="Search users ..." value={query} onChange={handleChange} />
      {filteredUsers.map(({ id, name }) => (
        <div key={id}>{name}</div>
      )}
    </div>
  )
}
```

## License

MIT © [emilbaekdahl](https://github.com/emilbaekdahl)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
