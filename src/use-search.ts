import * as React from 'react';

export type Predicate<T> = (item: T, query: string) => boolean;

export interface Options {
  initialQuery?: string;
  filter?: boolean;
}

function filterCollection<T>(
  collection: Array<T>,
  predicate: Predicate<T>,
  query: string,
  filter: boolean,
): Array<T> {
  if (query) {
    return collection.filter(item => predicate(item, query));
  } else {
    return filter ? collection : [];
  }
}

export function useSearch<T>(
  collection: Array<T>,
  predicate: Predicate<T>,
  {filter = false, initialQuery = ''}: Options = {},
): [Array<T>, string, React.ChangeEventHandler<HTMLInputElement>] {
  const [query, setQuery] = React.useState<string>(initialQuery);
  const [filteredCollection, setFilteredCollection] = React.useState<Array<T>>(
    () => filterCollection<T>(collection, predicate, query, filter),
  );

  const handleChange = React.useCallback(
    ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(value);
    },
    [setQuery],
  );

  React.useEffect(() => {
    setFilteredCollection(
      filterCollection<T>(collection, predicate, query, filter),
    );
  }, [query, collection, predicate, filter]);

  return [filteredCollection, query, handleChange];
}
