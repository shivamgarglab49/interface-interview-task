function classNames(
  values: Record<string, boolean | number | string | null | undefined>,
  baseClassNames?: string,
): string | undefined {
  const names: string[] = []
  for (const [name, enabled] of Object.entries(values)) {
    if (enabled) {
      names.push(name)
    }
  }

  if (names.length === 0) {
    return baseClassNames
  }

  return baseClassNames ? `${baseClassNames} ${names.join(' ')}` : names.join(' ')
}

export default classNames
