"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface FAQ {
  id: number
  question: string
  answer: string
  category: "general" | "pricing" | "technical" | "support"
}

export function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "Hotalyze nasıl çalışır?",
      answer:
        "Hotalyze, otellerin çeşitli platformlardaki yorumlarını toplar ve yapay zeka teknolojisi kullanarak analiz eder. Sentiment analizi, departman bazlı kategorilendirme ve rekabet analizi gibi özelliklerle işletmenizin güçlü ve zayıf yönlerini belirler.",
      category: "general",
    },
    {
      id: 2,
      question: "Hangi platformlardan veri topluyorsunuz?",
      answer:
        "Google, Booking.com, TripAdvisor, Zoover, Expedia, Hotels.com ve 20+ platformdan veri topluyoruz. Sürekli olarak yeni platformlar eklemeye devam ediyoruz.",
      category: "technical",
    },
    {
      id: 3,
      question: "Veriler ne kadar güncel?",
      answer:
        "Starter pakette aylık, Professional pakette haftalık, Enterprise pakette ise günlük güncelleme yapılır. Gerçek zamanlı veri akışı da Enterprise pakette mevcuttur.",
      category: "technical",
    },
    {
      id: 4,
      question: "Para iade garantisi var mı?",
      answer:
        "Evet! Tüm paketlerimizde 30 gün koşulsuz para iade garantisi bulunmaktadır. Memnun kalmazsanız, tam ücret iadesi yapılır.",
      category: "pricing",
    },
    {
      id: 5,
      question: "Kurulum ne kadar sürer?",
      answer:
        "Kurulum çok basittir! Ödeme sonrası 24 saat içinde hesabınız aktif edilir ve verileriniz hazır hale gelir. Teknik bilgi gerektirmez.",
      category: "general",
    },
    {
      id: 6,
      question: "Destek hizmeti nasıl?",
      answer:
        "7/24 Türkçe destek hizmeti sunuyoruz. Email, telefon ve canlı chat ile ulaşabilirsiniz. Enterprise müşterilerimize özel hesap yöneticisi atanır.",
      category: "support",
    },
    {
      id: 7,
      question: "API entegrasyonu mevcut mu?",
      answer:
        "Professional ve Enterprise paketlerde API entegrasyonu mevcuttur. Kendi sistemlerinizle entegre edebilir, otomatik raporlar alabilirsiniz.",
      category: "technical",
    },
    {
      id: 8,
      question: "Fiyatlar değişir mi?",
      answer:
        "Mevcut müşterilerimizin fiyatları sabitlenir. Yeni müşteriler için fiyat güncellemeleri olabilir, ancak siz etkilenmezsiniz.",
      category: "pricing",
    },
    {
      id: 9,
      question: "Rakip analizi nasıl yapılır?",
      answer:
        "Rakiplerinizin yorumlarını analiz ederek güçlü ve zayıf yönlerini belirleriz. Hangi alanlarda öne geçebileceğinizi gösterir, stratejik öneriler sunarız.",
      category: "general",
    },
    {
      id: 10,
      question: "Veri güvenliği nasıl sağlanır?",
      answer:
        "Tüm veriler SSL şifreleme ile korunur. KVKK ve GDPR uyumlu çalışırız. Verileriniz üçüncü taraflarla paylaşılmaz, güvenli sunucularda saklanır.",
      category: "technical",
    },
  ]

  const categories = [
    { id: "all", name: "Tümü", count: faqs.length },
    { id: "general", name: "Genel", count: faqs.filter((f) => f.category === "general").length },
    { id: "pricing", name: "Fiyatlandırma", count: faqs.filter((f) => f.category === "pricing").length },
    { id: "technical", name: "Teknik", count: faqs.filter((f) => f.category === "technical").length },
    { id: "support", name: "Destek", count: faqs.filter((f) => f.category === "support").length },
  ]

  const filteredFAQs = selectedCategory === "all" ? faqs : faqs.filter((faq) => faq.category === selectedCategory)

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-yellow-100 text-yellow-800">❓ Sık Sorulan Sorular</Badge>
          <h3 className="text-4xl font-bold text-gray-800 mb-4">Merak Ettikleriniz</h3>
          <p className="text-xl text-gray-600">En çok sorulan soruların yanıtları burada</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`${selectedCategory === category.id ? "bg-blue-500 text-white" : "text-gray-600 hover:text-blue-600"
                  }`}
              >
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <Card key={faq.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <HelpCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span className="font-semibold text-gray-800">{faq.question}</span>
                    </div>
                    {openFAQ === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>

                  {openFAQ === faq.id && (
                    <div className="px-6 pb-6">
                      <div className="pl-8 text-gray-700 leading-relaxed">{faq.answer}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Support */}
          <div className="text-center mt-12">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-8">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">🤔 Aradığınız soruyu bulamadınız mı?</h4>
                <p className="text-gray-600 mb-6">
                  Uzman ekibimiz size yardımcı olmaya hazır! 7/24 destek alabilirsiniz.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-blue-500 hover:bg-blue-600">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Canlı Destek
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white bg-transparent"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Hemen Arayın
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-4">Ortalama yanıt süresi: 2 dakika</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
