import * as React from 'react';
import _debounce from 'lodash.debounce';

export type Predicate<T> = (item: T, query: string) => boolean;

export interface Options {
  initialQuery?: string;
  filter?: boolean;
  debounce?: number;
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

function createEventHandler(
  stateSetter: React.Dispatch<React.SetStateAction<string>>,
  debounce?: number,
): React.ChangeEventHandler<HTMLInputElement> {
  const handler = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) =>
    stateSetter(value);

  if (debounce) {
    return _debounce(handler, debounce);
  } else {
    return handler;
  }
}

export function useSearch<T>(
  collection: Array<T>,
  predicate: Predicate<T>,
  {debounce, filter = false, initialQuery = ''}: Options = {},
): [Array<T>, string, React.ChangeEventHandler<HTMLInputElement>] {
  const [query, setQuery] = React.useState<string>(initialQuery);
  const [filteredCollection, setFilteredCollection] = React.useState<Array<T>>(
    () => filterCollection<T>(collection, predicate, query, filter),
  );

  const handleChange = React.useCallback(
    createEventHandler(setQuery, debounce),
    [debounce, setQuery],
  );

  React.useEffect(() => {
    setFilteredCollection(
      filterCollection<T>(collection, predicate, query, filter),
    );
  }, [query, collection, predicate, filter]);

  return [filteredCollection, query, handleChange];
}
