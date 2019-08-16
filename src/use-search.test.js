import { renderHook, act } from "@testing-library/react-hooks";
import { useSearch } from "./use-search";

describe("useSearch", () => {
  let collection;
  let predicate;

  beforeAll(() => {
    predicate = (item, query) => item.includes(query);
  });

  beforeEach(() => {
    collection = ["test1@test.dk", "test2@test.dk"];
  });

  it("returns the entire collection", () => {
    const {
      result: {
        current: [filtered]
      }
    } = renderHook(() => useSearch(collection, predicate));

    expect(filtered).toEqual(collection);
  });

  it("returns filtered collection if initialQuery is passed", () => {
    const {
      result: {
        current: [filtered]
      }
    } = renderHook(() =>
      useSearch(collection, predicate, { initialQuery: "test2" })
    );

    expect(filtered).toEqual(["test2@test.dk"]);
  });

  it("sets query based on handleChange", () => {
    const hook = renderHook(() => useSearch(collection, predicate));

    const value = "test";

    act(() => hook.result.current[2]({ target: { value } }));

    expect(hook.result.current[1]).toEqual(value);
  });
});
