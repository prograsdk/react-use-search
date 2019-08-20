import * as React from 'react';

type Predicate<T> = (item: T, query: string) => boolean;

interface Options {
  initialQuery?: string;
  filter?: boolean;
}

export function useSearch<T>(
  collection: Array<T>,
  predicate: Predicate<T>,
  {filter = false, initialQuery = ''}: Options = {},
): [Array<T>, string, React.ChangeEventHandler<HTMLInputElement>] {
  const [query, setQuery] = React.useState<string>(initialQuery);
  const [filteredCollection, setFilteredCollection] = React.useState<Array<T>>(
    () =>
      query
        ? collection.filter(item => predicate(item, query))
        : filter
        ? collection
        : [],
  );

  const handleChange = React.useCallback(
    ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(value);
    },
    [setQuery],
  );

  React.useEffect(() => {
    setFilteredCollection(
      query
        ? collection.filter(item => predicate(item, query))
        : filter
        ? collection
        : [],
    );
  }, [query, collection]);

  return [filteredCollection, query, handleChange];
}
