"use client"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, X, Send, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Merhaba! HotelComments'e hoş geldiniz! 👋 Size nasıl yardımcı olabilirim?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const botResponses = [
    "Paketlerimiz hakkında detaylı bilgi almak ister misiniz? 📊",
    "Demo izlemek için size özel link gönderebilirim! 🎥",
    "Hangi otel zincirindesiniz? Size özel çözüm hazırlayabilirim 🏨",
    "15 dakika içinde ücretsiz danışmanlık görüşmesi ayarlayabilir miyiz? 📞",
    "Rakip analizi örneği görmek ister misiniz? 📈",
    "Müşterilerimiz ortalama %35 gelir artışı yaşıyor. Sizin için de hesaplayalım mı? 💰",
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        sender: "user",
        timestamp: new Date(),
      }

      setMessages([...messages, newMessage])
      setInputMessage("")
      setIsTyping(true)

      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: botResponses[Math.floor(Math.random() * botResponses.length)],
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      }, 1500)
    }
  }

  const quickReplies = ["💰 Fiyatlar", "📊 Demo İzle", "📞 Arayın", "❓ SSS"]

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply)
    handleSendMessage()
  }

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
          >
            <MessageCircle className="w-8 h-8 text-white" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">1</span>
            </div>
          </Button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 z-50">
          <Card className="h-full flex flex-col shadow-2xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32&text=AI" />
                    <AvatarFallback className="bg-white text-blue-600 text-xs">AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">Destek Ekibi</div>
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-400" : "bg-gray-400"}`}></div>
                      <span className="text-xs opacity-90">{isOnline ? "Çevrimiçi" : "Çevrimdışı"}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 p-0 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                        message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-3 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              <div className="p-2 border-t">
                <div className="flex flex-wrap gap-1 mb-2">
                  {quickReplies.map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs h-6 px-2"
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Mesajınızı yazın..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <Button onClick={handleSendMessage} size="sm" className="bg-blue-500 hover:bg-blue-600">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-center space-x-4 mt-2">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Phone className="w-3 h-3 mr-1" />
                    Ara
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Mail className="w-3 h-3 mr-1" />
                    Email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
