
import { extendTheme, ThemeConfig } from "@chakra-ui/react"

// Chakra UI Theme
const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}
  
const theme = extendTheme({
    config,
    styles: {
        global: () => ({
          "html, body, #root": {
            background: "rgb(18 18 18 / 40%)", 
            position: "fixed",
            top: 0, bottom:0, right:0, left:0,
            margin:0, padding: 0,
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe WPC', 'Segoe UI', system-ui, 'Ubuntu', 'Droid Sans', sans-serif"
          },
        }),
    }
})

export default theme