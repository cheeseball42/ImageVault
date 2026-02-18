import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"
import App from './App.jsx'
import "@fontsource/ubuntu/300.css"
import "@fontsource/ubuntu/400.css"
import "@fontsource/ubuntu/500.css"
import "@fontsource/ubuntu/700.css"

const theme = extendTheme({
  fonts: {
    heading: "Ubuntu, sans-serif",
    body: "Ubuntu, sans-serif",
  },
   colors: {
    brand: {
      main: "#1A237E",
      greyshift: "#4A4F6B"
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
)
