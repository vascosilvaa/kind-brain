import computeEmotion from './computeEmotion'
import computeLanguage from './computeLanguage'
import computeSentiment from './computeSentiment'
import { languages } from '../utils/constants'
import { extremeInsults } from '../utils/extremeInsults'

/**
 * Returns if a message is kind or not from 0(negative) to 1(positive)
 * @param {String} message the message being sent
 * @returns {Object} kind
 */
async function computeMessage (message) {
  if(await messageContainsInsult(message)) return {
    score: 1,
    sentimentScore: 0,
    sentiment: 'insult',
    emotionScore: 1,
    language: 'pt',
  }

  const language = await computeLanguage(message)
  // is insult if emotion is 1
  const [emotionScore, sentimentScore] = await Promise.all([
    computeEmotion(message, language),
    computeSentiment(message, language),
  ])
  return computeKindScore(emotionScore, sentimentScore, language)
}

function computeKindScore (emotionScore, sentimentScore, language) {
  let score = 0.5

  // handle portuguese
  if (language === languages.pt || language === languages.es) {
    // score = 0.5
    if (emotionScore === 1) {
      if (sentimentScore.score > 0.7) score = 0
      if (sentimentScore.score < 0.7) score = 1
      if (sentimentScore.score === 0.5) score = 0.5
    } else if (emotionScore === 0) {
      if (sentimentScore.score < 0.5) score = 0
      if (sentimentScore.score > 0.5) score = 0
      if (sentimentScore.score === 0.5) score = 0.5
    } else {
      score = 0.5
    }
    // handle english
  } else {
    if (emotionScore === 1) {
      if (sentimentScore.score > 0.7) score = 0
      if (sentimentScore.score < 0.7) score = 1
      if (sentimentScore.score === 0.5) score = 0.5
    } else if (emotionScore === 0) {
      if (sentimentScore.score < 0.5) score = 1
      if (sentimentScore.score > 0.5) score = 0
      if (sentimentScore.score === 0.5) score = 0.5
    } else {
      score = 0.5
    }
  }

  return {
    score,
    sentimentScore: sentimentScore.score,
    sentiment: sentimentScore.sentiment,
    emotionScore: emotionScore,
    language,
  }
}

async function messageContainsInsult (message) {
  let isInsult = 0

  await extremeInsults.map(insult => {
    if (message.includes(insult.trim())) isInsult = 1
  })
  return isInsult
}
export {
  computeMessage,
}
