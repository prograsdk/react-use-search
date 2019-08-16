import * as React from "react";

interface Options {
  initialQuery?: string;
}

export function useSearch<T>(
  collection: Array<T>,
  predicate: (item: T, query: string) => boolean,
  { initialQuery }: Options = {}
) {
  const [query, setQuery] = React.useState<string>(initialQuery || "");
  const [filteredCollection, setFilteredCollection] = React.useState<Array<T>>(
    () =>
      query ? collection.filter(item => predicate(item, query)) : collection
  );

  function handleChange({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) {
    setQuery(value);
  }

  React.useEffect(() => {
    setFilteredCollection(collection.filter(item => predicate(item, query)));
  }, [query, collection]);

  return [filteredCollection, query, handleChange];
}
