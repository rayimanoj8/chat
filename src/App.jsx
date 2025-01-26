import {useCallback, useEffect, useState} from "react"
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { SelectRoom } from "./components/SelectRoom"
import { JoinRoom } from "./components/JoinRoom"
import { Chat } from "./components/Chat"
import {ThemeProvider} from "@/components/theme-provider.js";
import {Button} from "@/components/ui/button.jsx";
import {Moon, Sun} from "lucide-react";

function App() {
    const [theme,setTheme] = useState("dark");
    const toggleTheme = useCallback(() => {
        (theme === "dark") ?
            setTheme("light")
            :setTheme("dark");
    },[theme])
    useEffect(() => {
        document.querySelector("html").classList.remove("light","dark");
        document.querySelector("html").classList.add(theme);
    },[theme, toggleTheme])
    return (
        <ThemeProvider value={{theme,toggleTheme}}>
            <div className='flex justify-end'>
                {theme === 'dark' ?
                    <Button variant='ghost' onClick={toggleTheme}><Sun/></Button> :
                    <Button variant='ghost' onClick={toggleTheme}><Moon/></Button>
                }
            </div>
            <Router>
                <div className="min-h-screen flex items-center justify-center p-4">
                    <Routes>
                        <Route path="/" element={<SelectRoom />} />
                        <Route path="/:roomId" element={<JoinRoom />} />
                        <Route path="/chat/:roomId" element={<Chat />} />
                        {/*<Route path="/test" element={<Test />} />*/}
                    </Routes>
                </div>
            </Router>
        </ThemeProvider>
    )
}

export default App
