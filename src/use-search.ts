import * as React from "react";
import lodashDebounce from "lodash.debounce";
import lodashIsEqual from "lodash.isequal";
import usePrevious from "./use-previous";

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
  const isMounted = React.useRef<boolean>(false);
  const [query, setQuery] = React.useState<string>(initialQuery);
  const prevCollection = usePrevious(collection);
  const prevPredicate = usePrevious(predicate);
  const prevQuery = usePrevious(query);
  const prevFilter = usePrevious(filter);
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
        if (isMounted.current) {
          setFilteredCollection(
            filterCollection(collection, predicate, query, filter)
          );
        }
      },
      debounce
    ),
    [debounce]
  );

  React.useEffect(() => {
    if (
      !lodashIsEqual(collection, prevCollection) ||
      !lodashIsEqual(predicate, prevPredicate) ||
      !lodashIsEqual(query, prevQuery) ||
      !lodashIsEqual(filter, prevFilter)
    )
      debouncedFilterCollection(collection, predicate, query, filter);
  }, [collection, predicate, query, filter]);

  React.useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return [filteredCollection, query, handleChange, setQuery];
}
