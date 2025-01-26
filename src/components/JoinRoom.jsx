import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function JoinRoom() {
    const [name, setName] = useState("")
    const { roomId } = useParams()
    const navigate = useNavigate()

    const handleJoin = (e) => {
        e.preventDefault()
        if (name.trim()) {
            navigate(`/${roomId}`, { state: { name } })
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg">
            <CardHeader className="rounded-t-lg">
                <CardTitle className="text-2xl font-bold">Join Room: {roomId}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <form onSubmit={handleJoin} className="space-y-4">
                    <Input
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value.toLowerCase())}
                        required
                        className="text-lg lowercase"
                    />
                    <Button type="submit" className="w-full text-lg">
                        Join Chat
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

