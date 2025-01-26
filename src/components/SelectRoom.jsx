import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SelectRoom() {
    const [roomId, setRoomId] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (roomId.trim()) {
            navigate(`/chat/${roomId}`)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg">
            <CardHeader className="rounded-t-lg">
                <CardTitle className="text-2xl font-bold">Enter Chat Room</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="Enter room ID"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        required
                        className="text-lg lowercase"
                    />
                    <Button type="submit" className="w-full text-lg">
                        Join Room
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

