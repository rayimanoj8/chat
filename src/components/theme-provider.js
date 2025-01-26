import React from "react";

let ThemeContext = React.createContext({
    theme : "dark",
    toggleTheme : () => {}
});

const ThemeProvider = ThemeContext.Provider;
function useTheme(){
    return React.useContext(ThemeContext);
}

export {ThemeProvider, useTheme}