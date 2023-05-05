import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './samples/node-api'
import './index.scss'
import { GlobalContextProvider } from './contexts/GlobalContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalContextProvider>
    <App />
    </GlobalContextProvider>
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
