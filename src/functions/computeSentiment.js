import { getSentiment } from '../services/textAnalyticsAPI'

/**
 * Returns the sentiment detected by Azure Text Analytics API (https://azure.microsoft.com/services/cognitive-services/text-analytics/)
 * @param {String} message message
 * @returns {Object} sentiment
 */
async function computeSentiment (message, language) {
  const result = await getSentiment(message, language)
  return {
    score: result.data.documents[0].score,
    sentiment: renderSentimentName(result.data.documents[0].score),
  }
}

/**
 * Returns the sentiment name
 * @param {Float} score score of the message
 * @returns {String} sentiment name
 */
function renderSentimentName (score) {
  if (!score) return null
  if (score === 0.5) return 'neutral'
  if (score > 0.5) return 'positive'
  if (score < 0.5) return 'negative'
}

export default computeSentiment
