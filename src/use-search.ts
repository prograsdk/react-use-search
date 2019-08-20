import * as React from 'react';

type Predicate<T> = (item: T, query: string) => boolean;

interface Options {
  initialQuery?: string;
}

export function useSearch<T>(
  collection: Array<T>,
  predicate: Predicate<T>,
  {initialQuery = ''}: Options = {},
): [Array<T>, string, React.ChangeEventHandler<HTMLInputElement>] {
  const [query, setQuery] = React.useState<string>(initialQuery);
  const [filteredCollection, setFilteredCollection] = React.useState<Array<T>>(
    () =>
      query ? collection.filter(item => predicate(item, query)) : collection,
  );

  const handleChange = React.useCallback(
    ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(value);
    },
    [setQuery],
  );

  React.useEffect(() => {
    setFilteredCollection(collection.filter(item => predicate(item, query)));
  }, [query, collection]);

  return [filteredCollection, query, handleChange];
}
