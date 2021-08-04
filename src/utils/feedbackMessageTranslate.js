import feedbackMessage from '@/shared/feedbackMessages'

export default function messageTranslate(message) {
  let translatedMessage

  switch (message) {
    case feedbackMessage.EMAIL_ALREADY_IN_USE:
      translatedMessage = 'Email já cadastrado 😵'
      break

    case feedbackMessage.WRONG_CREDENTIALS:
      translatedMessage = 'Email ou senha incorreto 😵'
      break

    case feedbackMessage.EMAIL_NOT_REGISTERED:
      translatedMessage = 'Email não cadastrado 😵'
      break

    default:
      translatedMessage = 'Ops! Algo deu errado 😵'
  }

  return translatedMessage
}
