import {renderHook, act} from '@testing-library/react-hooks';
import {useSearch, Predicate} from './use-search';

describe('useSearch', () => {
  const collection = ['test1@test.dk', 'test2@test.dk'];
  const predicate: Predicate<string> = (item, query) => item.includes(query);

  it('returns the entire collection if filter is true', () => {
    const {
      result: {
        current: [filtered],
      },
    } = renderHook(() => useSearch(collection, predicate, {filter: true}));

    expect(filtered).toEqual(collection);
  });

  it('returns empty collection if filter is not passed', () => {
    const {
      result: {
        current: [filtered],
      },
    } = renderHook(() => useSearch(collection, predicate));

    expect(filtered).toEqual([]);
  });

  it('returns filtered collection if initialQuery is passed', () => {
    const {
      result: {
        current: [filtered],
      },
    } = renderHook(() =>
      useSearch(collection, predicate, {initialQuery: 'test2'}),
    );

    expect(filtered).toEqual(['test2@test.dk']);
  });

  it('sets query based on handleChange', () => {
    const hook = renderHook(() => useSearch(collection, predicate));

    const value = 'test';

    act(() => hook.result.current[2]({target: {value}}));

    expect(hook.result.current[1]).toEqual(value);
  });

  it('debounce', () => {
    const {result} = renderHook(() =>
      useSearch(collection, predicate, {debounce: 1000}),
    );

    act(() => result.current[2]({target: {value: 'test'}}));

    expect(result.current[0]).toEqual([]);
  });
});
