import React from "react"
import { ThemeProvider } from "./theme-provider.jsx"

export function Providers({ children }) {
    return <ThemeProvider defaultTheme="system">{children}</ThemeProvider>
}

