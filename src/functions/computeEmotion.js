import { getInsult } from '../services/insultAPI'
import { insultsPT } from '../utils/insults'
import { languages } from '../utils/constants'

/**
 * Returns the insult change by a custom made machine learning dataset
 * @param {String} message message
 * @returns {Boolean} isInsult
 */
async function computeEmotion (message, language) {
  if (language === languages.pt || language === languages.es) {
    const isInsult = await messageContainsInsult(message)
    return isInsult
  } else if (language === languages.en) {
    const result = await getInsult(message, language)
    if (!result.data) return 0
    return parseInt(result.data.Results.kindness.value.Values[0][3])
  } else {
    return 0
  }
}

async function messageContainsInsult (message) {
  let isInsult = 0

  await insultsPT.map(insult => {
    if (message.includes(insult.trim())) isInsult = 1
  })
  return isInsult
}

export default computeEmotion
