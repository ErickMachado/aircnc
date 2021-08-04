import feedbackMessage from '@/shared/feedbackMessages'

export default function messageTranslate(message) {
  let translatedMessage

  switch (message) {
    case feedbackMessage.EMAIL_ALREADY_IN_USE:
      translatedMessage = 'Email já cadastrado 😵'
      break

    default:
      translatedMessage = 'Ops! Algo deu errado 😵'
  }

  return translatedMessage
}
