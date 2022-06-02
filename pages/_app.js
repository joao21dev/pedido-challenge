import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import 'regenerator-runtime/runtime';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
