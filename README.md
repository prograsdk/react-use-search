# react-use-search

> Search and filtering for React in the shape of a hook!

[![NPM](https://img.shields.io/npm/v/react-use-search.svg)](https://www.npmjs.com/package/react-use-search) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add react-use-search
```

## Usage

```jsx
import React, { Component } from 'react'
import useSearch from 'react-use-search'

function Search({ emails }) {
  const [filtered] = useSearch(emails)

  return filtered.map(email => <p key={email}>{email</p>})
}
```
