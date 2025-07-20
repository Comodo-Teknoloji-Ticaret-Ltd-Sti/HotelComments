"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Gift, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ExitIntentPopupProps {
  onClose: () => void
  onConvert: () => void
}

export function ExitIntentPopup({ onClose, onConvert }: ExitIntentPopupProps) {
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes
  const [email, setEmail] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      onConvert()
      alert(`🎉 Tebrikler! ${email} adresine özel indirim kodu gönderildi!`)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 shadow-2xl">
        <div className="relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10">
            <X className="w-5 h-5" />
          </button>

          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="text-white w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-2">🚨 Dur! Gitmeden Önce...</h3>
            <p className="text-gray-600 mb-4">
              Size özel <strong>%50 indirim</strong> fırsatını kaçırmayın!
            </p>

            <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-red-600" />
                <span className="text-red-800 font-bold">Bu teklif sadece {formatTime(timeLeft)} geçerli!</span>
              </div>
              <div className="text-3xl font-bold text-red-600">%50 İNDİRİM</div>
              <div className="text-sm text-red-700">Normal fiyat: 7,999₺ → Şimdi: 3,999₺</div>
            </div>

            <div className="space-y-3 mb-6 text-left">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">✅ 2,000+ yorum analizi</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">✅ AI destekli sentiment analizi</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">✅ Rekabet analizi raporu</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">✅ 30 gün para iade garantisi</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white py-3 text-lg font-semibold"
              >
                🎁 %50 İndirim Kodunu Al
              </Button>
            </form>

            <p className="text-xs text-gray-500 mt-4">* Bu teklif sadece yeni müşteriler için geçerlidir</p>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
