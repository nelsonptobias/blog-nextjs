import '../styles/global.css'
import { ChakraProvider } from "@chakra-ui/core"
import { ThemeProvider, theme } from '@chakra-ui/core';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}