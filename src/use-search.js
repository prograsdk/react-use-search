import { useState, useEffect } from 'react'

function defaultPredicate(item, query) {
  return item.includes(query)
}

export function useSearch(
  collection,
  { predicate = defaultPredicate, initialQuery = '' } = {}
) {
  const [query, setQuery] = useState(initialQuery)
  const [filteredCollection, setFilteredCollection] = useState(collection)

  const handleChange = ({ target: { value } }) => setQuery(value)

  useEffect(() => {
    setFilteredCollection(collection.filter(item => predicate(item, query)))
  }, [query])

  return [filteredCollection, query, handleChange]
}
