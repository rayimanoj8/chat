import React from "react"
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { SelectRoom } from "./components/SelectRoom"
import { JoinRoom } from "./components/JoinRoom"
import { Chat } from "./components/Chat"

function App() {
    return (
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
    )
}

export default App
