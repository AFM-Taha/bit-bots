const isPropertyMatched = (game, id, property) => {
  const gamePlatforms = game[property]
  if (!gamePlatforms) return false
  const exists = gamePlatforms.find((platform) => platform.id === id)
  if (exists) {
    return true
  }
  return false
}

export default isPropertyMatched
