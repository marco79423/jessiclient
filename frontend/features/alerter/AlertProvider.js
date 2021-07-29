import React, {useState} from 'react'
import Alert from '../../components/elements/Alert'

const emptyFunc = () => {
}

export const AlerterContext = React.createContext({
  ready: false,

  showSuccessAlert: emptyFunc,
  showErrorAlert: emptyFunc,
  throwError: emptyFunc,
})

export default function AlerterProvider({children}) {
  const [severity, setSeverity] = useState('error')
  const [alertOpen, setAlertOpen] = useState(false)
  const [message, setMessage] = useState('')

  const showErrorAlert = (message) => {
    setSeverity('error')
    setMessage(message)
    setAlertOpen(true)
  }

  const showSuccessAlert = (message) => {
    setSeverity('success')
    setMessage(message)
    setAlertOpen(true)
  }

  const hideAlert = () => {
    setAlertOpen(false)
  }

  const throwError = (message) => {
    showErrorAlert(message)
  }


  const alerter = {
    ready: true,

    showSuccessAlert,
    showErrorAlert,
    throwError,
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
