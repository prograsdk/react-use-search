import { renderHook, cleanup, act } from 'react-hooks-testing-library'
import { useSearch } from './use-search'

describe('useSearch', () => {
  let collection

  beforeEach(() => {
    collection = ['test1@test.dk', 'test2@test.dk']
  })

  afterEach(cleanup)

  it('returns the entire collection', () => {
    const {
      result: {
        current: [filtered]
      }
    } = renderHook(() => useSearch(collection))

    expect(filtered).toEqual(collection)
  })

  it('returns filtered collection if initialQuery is passed', () => {
    const {
      result: {
        current: [filtered]
      }
    } = renderHook(() => useSearch(collection, { initialQuery: 'test2' }))

    expect(filtered).toEqual(['test2@test.dk'])
  })

  it('uses passed predicate for filtering', () => {
    function predicate(item) {
      return item === 'test2@test.dk'
    }

    const {
      result: {
        current: [filtered]
      }
    } = renderHook(() => useSearch(collection, { predicate }))

    expect(filtered).toEqual(['test2@test.dk'])
  })

  it('sets query based on handleChange', () => {
    const hook = renderHook(() => useSearch(collection))

    const value = 'test'

    act(() => hook.result.current[2]({ target: { value } }))

    expect(hook.result.current[1]).toEqual(value)
  })
})
