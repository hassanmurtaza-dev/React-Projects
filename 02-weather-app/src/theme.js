const groups = {
  clear: [0, 1],
  cloud: [2, 3, 45, 48],
  rain: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
  snow: [71, 73, 75, 77, 85, 86],
  storm: [95, 96, 99],
}

export function themeFor(code, isDay) {
  const group = Object.keys(groups).find((key) => groups[key].includes(code))
  if (!group) return 'cloud'
  if (!isDay) return group === 'storm' ? 'storm' : 'night'
  return group
}
