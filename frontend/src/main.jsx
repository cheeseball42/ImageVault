import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"
import App from './App.jsx'

const theme = extendTheme({});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
)
