import React, { useState, useEffect, useRef } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { Client } from "@stomp/stompjs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, LogOut,Copy } from "lucide-react"
import {Toaster} from "@/components/ui/toaster.jsx";
import {useToast} from "@/hooks/use-toast.js";

export function Chat() {
    const {toast} = useToast();
    const { roomId } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const [connected, setConnected] = useState(false)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const stompClientRef = useRef(null)
    const messagesEndRef = useRef(null)

    const sender = location.state?.name

    useEffect(() => {
        if (!sender) {
            navigate(`/${roomId}`)
            return
        }

        stompClientRef.current = new Client({
            brokerURL: "wss://myapp-latest-3umz.onrender.com/gs-guide-websocket",
        })

        stompClientRef.current.onConnect = (frame) => {
            setConnected(true)
            console.log("Connected: " + frame)
            stompClientRef.current.subscribe(`/topic/${roomId}`, (greeting) => {
                const message = JSON.parse(greeting.body)
                setMessages((prev) => [...prev, message])
            })
        }

        stompClientRef.current.onWebSocketError = (error) => {
            console.error("Error with websocket", error)
        }

        stompClientRef.current.onStompError = (frame) => {
            console.error("Broker reported error: " + frame.headers["message"])
            console.error("Additional details: " + frame.body)
        }

        stompClientRef.current.activate()

        return () => {
            stompClientRef.current?.deactivate()
        }
    }, [roomId, sender, navigate])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    const sendMessage = (e) => {
        e.preventDefault()
        if (message.trim() && connected) {
            stompClientRef.current?.publish({
                destination: "/app/hello",
                body: JSON.stringify({
                    sender: sender,
                    message: message,
                    reciever: roomId,
                }),
            })
            setMessage("")
        }
    }

    const leaveRoom = () => {
        navigate("/")
    }
    const handleClick = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
                .writeText(`chat-mate-box.netlify.app/#/${roomId}`)
                .then(() => {})
                .catch((err) => {
                    console.error("Failed to copy: ", err);
                });
            toast({
                description: "link copied to your clipboard",
            });
        } else {
            // Fallback for unsupported browsers
            const textArea = document.createElement("textarea");
            textArea.value = `chat-mate-box.netlify.app/#/${roomId}`;
            textArea.style.position = "fixed"; // Prevent scrolling
            textArea.style.opacity = "0";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand("copy");
                toast({
                    description: "link copied to your clipboard"
                });

            } catch (err) {
                toast({
                    description: "Error Copying",
                    variant: "destructive",
                });
            }
            document.body.removeChild(textArea);
        }
    };
    return (
        <div className='w-full max-w-2xl'>
            <Card>
                <CardHeader>
                    <CardTitle>Share and ask your friends to join</CardTitle>
                    <CardDescription className='flex gap-4'>
                        <p className='mt-2'>chat-mate-box.netlify.app/#/{roomId}</p>
                        <Button variant='outline' onClick={handleClick}>
                            <Copy className='size-4'/>
                        </Button>
                    </CardDescription>
                </CardHeader>
            </Card>
            <Card className="w-full max-w-2xl mx-auto h-[80vh] flex flex-col shadow-lg">
                <CardContent className="flex flex-col h-full p-0">
                    <div className="p-4 flex justify-between items-center rounded-t-lg">
                        <div>
                            <h2 className="inline text-2xl font-bold hover:cursor-pointer hover:bg-muted rounded p-1  hover:text-xl transition-all ease-in-out">{roomId} /&nbsp;
                                <p className='inline capitalize'>
                                    {sender}
                                </p>
                            </h2>
                        </div>
                        <Button variant="secondary" size="icon" onClick={leaveRoom}>
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                    <ScrollArea className="flex-grow p-4 space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index}

                                 className={`flex m-1 ${msg.sender === sender ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`px-3 py-2 rounded-xl ${
                                        msg.sender === sender
                                            ? "bg-primary text-primary-foreground rounded-br-none"
                                            : "bg-muted rounded-bl-none max-w-[70%]"
                                    }`}
                                >
                                    <h1 className='font-semibold capitalize'>{msg.sender}</h1>
                                    <p className={`text-sm flex italic ${
                                        msg.sender === sender
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}>{msg.message}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef}/>
                    </ScrollArea>
                    <form onSubmit={sendMessage} className="p-4 bg-background border-t">
                        <div className="flex space-x-2">
                            <Input
                                placeholder="Type a message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="flex-grow"
                            />
                            <Button type="submit" size="icon" disabled={!connected || !message.trim()}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <Toaster />
        </div>
    )
}