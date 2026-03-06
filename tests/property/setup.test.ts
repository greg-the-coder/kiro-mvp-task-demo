import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'

describe('Property-based testing setup', () => {
  it('should have fast-check working', () => {
    fc.assert(
      fc.property(fc.integer(), fc.integer(), (a, b) => {
        expect(a + b).toBe(b + a)
      })
    )
  })
})
