import { ChakraProvider } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import StoreProvider from 'reduck-store';
import { store } from './store';
import { AppContainer } from './app';
import theme from './app/theme';
import sound from './sound';
import "./index.css"

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
  <ChakraProvider theme={theme}>
    <StoreProvider {...store}>
      <AppContainer/>
    </StoreProvider>
  </ChakraProvider>
);

sound.play()

