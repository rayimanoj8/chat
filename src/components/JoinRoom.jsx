import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"

export function JoinRoom() {
    const [name, setName] = useState("")
    const { roomId } = useParams()
    const navigate = useNavigate()

    const handleJoin = (e) => {
        e.preventDefault()
        if (name.trim()) {
            navigate(`/chat/${roomId}`, { state: { name } })
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg">
            <CardHeader className="rounded-t-lg">
                <CardTitle className="text-2xl font-bold">{roomId} /&nbsp;{name}</CardTitle>
            </CardHeader>
                <form onSubmit={handleJoin} className="space-y-4">
            <CardContent className="p-6">
                    <Input
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value.toLowerCase())}
                        required
                        className="text-lg lowercase placeholder:capitalize"
                    />

            </CardContent>
                    <CardFooter>
                        <Button type="submit" variant='outline' className="w-fit">
                            Join Chat
                        </Button>
                    </CardFooter>
                </form>
        </Card>
    )
}

