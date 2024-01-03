export function stringToColor(inputString: string) {
  // Simple hash function to generate a numeric value from the string
  let hash = 0
  for (let i = 0; i < inputString.length; i++) {
    hash = inputString.charCodeAt(i) + ((hash << 5) - hash)
  }

  // Convert the hash to a hex color
  let color = (hash & 0x00ffffff).toString(16).toUpperCase()

  // Ensure the color is not too light by adjusting brightness
  while (color.length < 6) {
    color = '0' + color // pad with leading zeros if needed
  }

  // Adjust brightness (make sure it's not too light)
  const threshold = 128
  const brightness =
    (parseInt(color.substring(0, 2), 16) * 299 +
      parseInt(color.substring(2, 4), 16) * 587 +
      parseInt(color.substring(4, 6), 16) * 114) /
    1000
  if (brightness > threshold) {
    // If color is too light, make it darker
    color = darkenColor(color)
  }

  if (!isValidHexColor(color)) {
    // If color is not valid, return a default color
    color = '000000'
  }

  return '#' + color
}

function darkenColor(hexColor: string) {
  // Darken the color by subtracting a fixed amount (adjust as needed)
  const darkenAmount = 30
  return (parseInt(hexColor, 16) - darkenAmount).toString(16).toUpperCase()
}

function isValidHexColor(hexColor: string) {
  // Regular expression to validate hex color (6 characters)
  const hexColorRegex = /^[0-9A-Fa-f]{6}$/
  return hexColorRegex.test(hexColor)
}
