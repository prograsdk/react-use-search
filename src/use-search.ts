import * as React from "react";
import lodashDebounce from "lodash.debounce";

export type Predicate<T> = (item: T, query: string) => boolean;

export interface Options {
  initialQuery?: string;
  filter?: boolean;
  debounce?: number;
}

function filterCollection<T>(
  collection: T[],
  predicate: Predicate<T>,
  query: string,
  filter: boolean
): T[] {
  if (query) {
    return collection.filter((item) => predicate(item, query));
  } else {
    return filter ? collection : [];
  }
}

export function useSearch<T>(
  collection: T[],
  predicate: Predicate<T>,
  { debounce, filter = false, initialQuery = "" }: Options = {}
): [
  T[],
  string,
  (event: React.ChangeEvent<HTMLInputElement> | string) => void,
  (querty: string) => void
] {
  const [query, setQuery] = React.useState<string>(initialQuery);
  const [filteredCollection, setFilteredCollection] = React.useState<T[]>(() =>
    filterCollection<T>(collection, predicate, query, filter)
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement> | string) => {
      setQuery(typeof event === "string" ? event : event.target.value);
    },
    [setQuery]
  );

  const debouncedFilterCollection = React.useCallback(
    lodashDebounce(
      (
        collection: T[],
        predicate: Predicate<T>,
        query: string,
        filter: boolean
      ) => {
        setFilteredCollection(
          filterCollection(collection, predicate, query, filter)
        );
      },
      debounce
    ),
    [debounce]
  );

  React.useEffect(() => {
    debouncedFilterCollection(collection, predicate, query, filter);
  }, [collection, predicate, query, filter]);

  return [filteredCollection, query, handleChange, setQuery];
}
