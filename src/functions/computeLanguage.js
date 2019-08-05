import { getLanguage } from '../services/textAnalyticsAPI'
import { languages } from '../utils/constants'
/**
 * Returns the language detected by Azure Text Analytics API (https://azure.microsoft.com/services/cognitive-services/text-analytics/)
 * @param {String} message message
 * @returns {String} language
 */
async function computeLanguage (message) {
  const result = await getLanguage(message)
  if (!result.data) return null
  const languageScore = result.data.documents[0].detectedLanguages[0].score
  const languageName = result.data.documents[0].detectedLanguages[0].iso6391Name

  if (languageScore !== 1) return null

  switch (languageName) {
    case languages.pt:
      return languages.pt
    case languages.es:
      return languages.es
    case languages.en:
      return languages.en
    default:
      return null
  }
}

export default computeLanguage
