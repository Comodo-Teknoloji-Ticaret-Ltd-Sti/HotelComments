"use client"

import { useState, useEffect } from "react"
import { Calculator, TrendingUp, DollarSign, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"

export function PricingCalculator() {
  const [hotelCount, setHotelCount] = useState([1])
  const [reviewCount, setReviewCount] = useState([500])
  const [currentRevenue, setCurrentRevenue] = useState([100000])
  const [results, setResults] = useState({
    monthlyPrice: 299,
    yearlyPrice: 2999,
    savings: 2000,
    revenueIncrease: 35000,
    roiPercentage: 1167,
    paybackMonths: 2.5,
  })

  useEffect(() => {
    calculateResults()
  }, [hotelCount, reviewCount, currentRevenue])

  const calculateResults = () => {
    const hotels = hotelCount[0]
    const reviews = reviewCount[0]
    const revenue = currentRevenue[0]

    // Pricing logic
    let monthlyPrice = 299
    if (hotels > 5) monthlyPrice = 799
    if (hotels > 15) monthlyPrice = 1999

    const yearlyPrice = monthlyPrice * 10 // 2 months free
    const savings = monthlyPrice * 12 - yearlyPrice

    // ROI calculations
    const revenueIncreasePercentage = Math.min(50, 15 + (reviews / 100) * 2 + hotels * 1.5)
    const revenueIncrease = (revenue * revenueIncreasePercentage) / 100
    const roiPercentage = ((revenueIncrease - yearlyPrice) / yearlyPrice) * 100
    const paybackMonths = yearlyPrice / (revenueIncrease / 12)

    setResults({
      monthlyPrice,
      yearlyPrice,
      savings,
      revenueIncrease,
      roiPercentage,
      paybackMonths,
    })
  }

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800">🧮 ROI Hesaplayıcı</Badge>
          <h3 className="text-4xl font-bold text-gray-800 mb-4">Yatırımınızın Geri Dönüşünü Hesaplayın</h3>
          <p className="text-xl text-gray-600">İşletmenize özel ROI hesaplaması yapın</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <Card className="p-8">
              <CardHeader className="p-0 mb-8">
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="w-6 h-6 text-blue-600" />
                  <span>İşletme Bilgileriniz</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0 space-y-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Otel Sayısı: <span className="text-blue-600 font-bold">{hotelCount[0]}</span>
                  </label>
                  <Slider
                    value={hotelCount}
                    onValueChange={setHotelCount}
                    max={50}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>1 otel</span>
                    <span>50+ otel</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Aylık Yorum Sayısı:{" "}
                    <span className="text-blue-600 font-bold">{reviewCount[0].toLocaleString()}</span>
                  </label>
                  <Slider
                    value={reviewCount}
                    onValueChange={setReviewCount}
                    max={10000}
                    min={100}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>100 yorum</span>
                    <span>10,000+ yorum</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Aylık Gelir: <span className="text-blue-600 font-bold">{currentRevenue[0].toLocaleString()}₺</span>
                  </label>
                  <Slider
                    value={currentRevenue}
                    onValueChange={setCurrentRevenue}
                    max={1000000}
                    min={50000}
                    step={10000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>50,000₺</span>
                    <span>1,000,000₺+</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-700">
                        +{results.revenueIncrease.toLocaleString()}₺
                      </div>
                      <div className="text-green-600">Yıllık Gelir Artışı</div>
                    </div>
                  </div>
                  <div className="text-sm text-green-700">Müşterilerimiz ortalama %35 gelir artışı yaşıyor</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-700">%{Math.round(results.roiPercentage)}</div>
                      <div className="text-blue-600">ROI Oranı</div>
                    </div>
                  </div>
                  <div className="text-sm text-blue-700">
                    Yatırımınız {results.paybackMonths.toFixed(1)} ayda kendini amorti ediyor
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-lg font-semibold text-gray-800">Önerilen Paket</div>
                      <div className="text-purple-600">Size en uygun çözüm</div>
                    </div>
                    <Badge className="bg-purple-500 text-white">
                      {hotelCount[0] <= 5 ? "Starter" : hotelCount[0] <= 15 ? "Professional" : "Enterprise"}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Aylık Fiyat</span>
                      <span className="font-semibold">{results.monthlyPrice}₺</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Yıllık Fiyat</span>
                      <span className="font-semibold">{results.yearlyPrice.toLocaleString()}₺</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span className="text-sm">Yıllık Tasarruf</span>
                      <span className="font-semibold">{results.savings.toLocaleString()}₺</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                    <Zap className="w-4 h-4 mr-2" />
                    Bu Paketi Seç
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h4 className="font-semibold text-yellow-800 mb-2">💡 Hesaplama Nasıl Yapılıyor?</h4>
              <p className="text-sm text-yellow-700">
                ROI hesaplaması, mevcut müşterilerimizin ortalama performans artışları ve sektör verilerine
                dayanmaktadır. Gerçek sonuçlar işletmenize özel faktörlere göre değişebilir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
