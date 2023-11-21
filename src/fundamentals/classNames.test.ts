import cx from './classNames'

describe('classNames', () => {
  it('includes class names iff values are truthy', () => {
    expect(
      cx({
        alpha: true,
        beta: 1,
        gamma: 'true',
        foo: false,
        bar: 0,
        quux: '',
      }),
    ).toBe('alpha beta gamma')
  })

  it('appends conditional class names to provided base names', () => {
    expect(cx({ alpha: true }, 'base')).toBe('base alpha')
  })

  it('returns undefined if no classes produced', () => {
    expect(cx({})).toBeUndefined()
    expect(cx({}, 'base')).toBe('base')
  })
})
