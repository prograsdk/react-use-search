import { renderHook, cleanup } from 'react-hooks-testing-library'
import useSearch from './use-search'

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
})
