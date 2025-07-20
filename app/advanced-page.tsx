"use client"

import { useState, useEffect } from "react"
import { ExitIntentPopup } from "@/components/exit-intent-popup"
import { LiveChatWidget } from "@/components/live-chat-widget"
import { VideoTestimonials } from "@/components/video-testimonials"
import { PricingCalculator } from "@/components/pricing-calculator"
import { FAQSection } from "@/components/faq-section"

export default function AdvancedHotelCommentsApp() {
  const [showExitIntent, setShowExitIntent] = useState(false)
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false)

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitIntent) {
        setShowExitIntent(true)
        setHasShownExitIntent(true)
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => document.removeEventListener("mouseleave", handleMouseLeave)
  }, [hasShownExitIntent])

  // Show exit intent after 30 seconds if not shown
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasShownExitIntent) {
        setShowExitIntent(true)
        setHasShownExitIntent(true)
      }
    }, 30000)

    return () => clearTimeout(timer)
  }, [hasShownExitIntent])

  const handleExitIntentClose = () => {
    setShowExitIntent(false)
  }

  const handleExitIntentConvert = () => {
    setShowExitIntent(false)
    // Track conversion
    console.log("Exit intent conversion!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section with Advanced Features */}
      <section className="container mx-auto px-4 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-3xl"></div>
        <div className="relative max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg">
              <span>🚀 Gelişmiş Özellikler Aktif!</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Otel Yorumlarını
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Süper Güçlere Çevir! ⚡
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            <strong>AI destekli analiz, canlı destek, video testimonials ve daha fazlası!</strong>
            Müşteri memnuniyetini %50 artır, gelirini %300 yükselt! 🎯
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl mb-2">🎥</div>
              <div className="font-semibold text-gray-800">Video Testimonials</div>
              <div className="text-sm text-gray-600">Gerçek müşteri hikayeleri</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl mb-2">💬</div>
              <div className="font-semibold text-gray-800">Canlı Destek</div>
              <div className="text-sm text-gray-600">7/24 anlık yardım</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl mb-2">🧮</div>
              <div className="font-semibold text-gray-800">ROI Hesaplayıcı</div>
              <div className="text-sm text-gray-600">Kişisel yatırım analizi</div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <VideoTestimonials />

      {/* Pricing Calculator */}
      <PricingCalculator />

      {/* FAQ Section */}
      <FAQSection />

      {/* Advanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h3 className="text-5xl font-bold mb-6">🚀 Hazır mısınız?</h3>
          <p className="text-2xl mb-8 opacity-90">
            Binlerce otel sahibi zaten HotelComments kullanıyor.
            <br />
            <strong>Siz de bu başarı hikayesinin parçası olun! ⭐</strong>
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-4xl font-bold mb-2">234+</div>
              <div className="text-lg">Mutlu Müşteri</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-4xl font-bold mb-2">%98.7</div>
              <div className="text-lg">Memnuniyet Oranı</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-lg">Analiz Edilen Yorum</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-lg font-semibold">🎁 Şimdi başlayanlara özel:</div>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">✅ %50 İndirim</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">✅ Ücretsiz Kurulum</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">✅ 30 Gün Garanti</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">✅ Bonus Özellikler</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Chat Widget */}
      <LiveChatWidget />

      {/* Exit Intent Popup */}
      {showExitIntent && <ExitIntentPopup onClose={handleExitIntentClose} onConvert={handleExitIntentConvert} />}
    </div>
  )
}
