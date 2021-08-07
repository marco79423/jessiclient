import React from 'react'

import Alert from '../../components/elements/Alert'

const emptyFunc = () => {
}

export const AlerterContext = React.createContext({
  ready: false,

  showSuccessAlert: emptyFunc,
  showErrorAlert: emptyFunc,
})


export const Severity = Object.freeze({
  Error: 'error',
  Success: 'success',
})


/**
 * Alerter 的 Provider
 * @param children
 * @returns {JSX.Element}
 */
export default function AlerterProvider({children}) {
  const [severity, setSeverity] = React.useState(Severity.Error)
  const [alertOpen, setAlertOpen] = React.useState(false)
  const [message, setMessage] = React.useState('')

  const showErrorAlert = (message) => {
    setSeverity(Severity.Error)
    setMessage(message)
    setAlertOpen(true)
  }

  const showSuccessAlert = (message) => {
    setSeverity(Severity.Success)
    setMessage(message)
    setAlertOpen(true)
  }

  const hideAlert = () => {
    setAlertOpen(false)
  }

  const alerter = {
    ready: true,

    showSuccessAlert,
    showErrorAlert,
  }

  return (
    <>
      <AlerterContext.Provider value={alerter}>
        {children}
      </AlerterContext.Provider>

      <Alert
        open={alertOpen}
        severity={severity}
        message={message}
        onClose={hideAlert}
      />
    </>
  )
}
