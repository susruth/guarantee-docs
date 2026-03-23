import React from 'https://esm.sh/react@18.3.1'
import ReactDOM from 'https://esm.sh/react-dom@18.3.1/client'
import htm from 'https://esm.sh/htm@3.1.1'
import { BrowserRouter } from 'https://esm.sh/react-router-dom@6.30.1'
import App from './App.js'
import './styles.css'

const html = htm.bind(React.createElement)

ReactDOM.createRoot(document.getElementById('root')).render(
  html`<${React.StrictMode}><${BrowserRouter}><${App} /><//><//>`,
)
