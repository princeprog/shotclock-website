const rules = new Intl.PluralRules('en-US', { type: 'ordinal' })
const suffixes: { [rule: string]: string } = { one: 'st', two: 'nd', few: 'rd', other: 'th' }

export const ordinal = (value: number) => `${value}${suffixes[rules.select(value)]}`
