import React from 'react'

import Alert from '../../components/elements/Alert'

const emptyFunc = () => {
}

export const NotificationsContext = React.createContext({
  ready: false,

  showSuccessMessage: emptyFunc,
  showErrorMessage: emptyFunc,
})


export const Severity = Object.freeze({
  Error: 'error',
  Success: 'success',
})


/**
 * 通知的 Provider
 * @param children
 * @returns {JSX.Element}
 */
export default function NotificationsProvider({children}) {
  const [severity, setSeverity] = React.useState(Severity.Error)
  const [messageOpen, setMessageOpen] = React.useState(false)
  const [message, setMessage] = React.useState('')

  const showErrorMessage = (message) => {
    setSeverity(Severity.Error)
    setMessage(message)
    setMessageOpen(true)
  }

  const showSuccessMessage = (message) => {
    setSeverity(Severity.Success)
    setMessage(message)
    setMessageOpen(true)
  }

  const hideMessage = () => {
    setMessageOpen(false)
  }

  const notifications = {
    ready: true,

    showSuccessMessage,
    showErrorMessage,
  }

  return (
    <>
      <NotificationsContext.Provider value={notifications}>
        {children}
      </NotificationsContext.Provider>

      <Alert
        open={messageOpen}
        severity={severity}
        message={message}
        onClose={hideMessage}
      />
    </>
  )
}
