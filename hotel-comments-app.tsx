"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { useTheme } from "next-themes"
import {
  Star,
  Users,
  TrendingUp,
  Shield,
  Award,
  BarChart3,
  Globe,
  Clock,
  MessageSquare,
  PieChart,
  Activity,
  Building2,
  Eye,
  Zap,
  Target,
  Rocket,
  DollarSign,
  PlayCircle,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Sparkles,
  Crown,
  Gift,
  Sun,
  Moon,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
  LineChart,
  Line,
  Tooltip,
  Legend,
} from "recharts"

// Github Pages basePath desteği için asset yolunu otomatik ekleyen fonksiyon
const getAssetPath = (path: string) => {
  const base = "/HotelComments";
  if (path.startsWith("/")) return `${base}${path}`;
  return `${base}/${path}`;
}

// Custom Tooltip Component (Modal dışında tanımlandı)
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <p className="font-medium text-gray-800 dark:text-gray-100">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

// Purchase Modal Component (Modal dışında tanımlandı)
const PurchaseModal = ({ selectedPackage, formData, setFormData, setShowPurchaseForm }: any) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`${formData.name}, ${selectedPackage.name} paketiniz için ödeme sayfasına yönlendiriliyorsunuz!`)
    setShowPurchaseForm(false) // Form gönderildikten sonra modalı kapat
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto shadow-2xl transform scale-95 animate-scale-in">
        <div className="text-center mb-8">
          <div
            className={`w-20 h-20 bg-gradient-to-r ${selectedPackage?.color} rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg`}
          >
            <Award className="text-white w-10 h-10" />
          </div>
          <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">{selectedPackage?.name} Paketi</h3>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Bilgilerinizi doldurun, hemen başlayın!</p>
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-xl p-4 mt-6">
            <div className="flex items-center justify-center space-x-3">
              <Gift className="w-6 h-6 text-green-600 dark:text-green-400" />
              <span className="text-green-800 dark:text-green-200 font-semibold text-base">
                🎉 İlk 100 müşteriye özel %{selectedPackage?.discount} indirim!
              </span>
            </div>
          </div>
        </div>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Ad Soyad *
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-3 focus:ring-blue-400 dark:focus:ring-blue-600 focus:border-transparent transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Adınız ve soyadınız"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              E-posta *
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-3 focus:ring-blue-400 dark:focus:ring-blue-600 focus:border-transparent transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@ornek.com"
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Şirket/Otel Adı *
            </label>
            <input
              type="text"
              id="company"
              required
              className="w-full px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-3 focus:ring-blue-400 dark:focus:ring-blue-600 focus:border-transparent transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Otel/şirket adınız"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Telefon *
            </label>
            <input
              type="tel"
              id="phone"
              required
              className="w-full px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-3 focus:ring-blue-400 dark:focus:ring-blue-600 focus:border-transparent transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="0555 123 45 67"
            />
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl p-5 mb-8 shadow-inner">
            <h4 className="font-bold text-gray-800 dark:text-gray-100 text-lg mb-3">Paket Özeti</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-200 text-base">{selectedPackage?.name} Paketi</span>
                <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                  {selectedPackage?.price}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">Normal Fiyat</span>
                <span className="text-gray-500 dark:text-gray-400 line-through">{selectedPackage?.originalPrice}</span>
              </div>
              <div className="flex justify-between items-center text-base">
                <span className="text-green-700 dark:text-green-300 font-semibold">Tasarrufunuz</span>
                <span className="text-green-700 dark:text-green-300 font-bold">{selectedPackage?.savings}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowPurchaseForm(false)}
              className="flex-1 py-3 text-base rounded-xl border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              İptal
            </Button>
            <Button
              type="submit"
              className="flex-1 py-3 text-base rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-[1.01] shadow-lg"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Hemen Başla
            </Button>
          </div>
          <div className="text-center mt-6">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Shield className="w-4 h-4" />
              <span>30 gün para iade garantisi</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

// Demo Modal Component (Modal dışında tanımlandı)
const DemoModal = ({
  activeTab,
  setActiveTab,
  setShowDemo,
  demoData,
  sentimentData,
  departmentData,
  trendData,
  revenueData,
}: any) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-7xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform scale-95 animate-scale-in">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-t-3xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">🚀 Canlı Demo - Otel Yorum Analizi</h3>
              <p className="text-gray-600 dark:text-gray-300">Gerçek verilerle analiz örnekleri - Ücretsiz keşfedin!</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowDemo(false)}
              className="rounded-full px-4 py-2 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Kapat
            </Button>
          </div>
        </div>
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-white data-[state=active]:dark:bg-gray-950 data-[state=active]:shadow-sm data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 rounded-lg transition-all text-gray-700 dark:text-gray-200"
              >
                📊 Genel Bakış
              </TabsTrigger>
              <TabsTrigger
                value="sentiment"
                className="data-[state=active]:bg-white data-[state=active]:dark:bg-gray-950 data-[state=active]:shadow-sm data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 rounded-lg transition-all text-gray-700 dark:text-gray-200"
              >
                💭 Duygu Analizi
              </TabsTrigger>
              <TabsTrigger
                value="departments"
                className="data-[state=active]:bg-white data-[state=active]:dark:bg-gray-950 data-[state=active]:shadow-sm data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 rounded-lg transition-all text-gray-700 dark:text-gray-200"
              >
                🏢 Departmanlar
              </TabsTrigger>
              <TabsTrigger
                value="roi"
                className="data-[state=active]:bg-white data-[state=active]:dark:bg-gray-950 data-[state=active]:shadow-sm data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 rounded-lg transition-all text-gray-700 dark:text-gray-200"
              >
                💰 ROI Analizi
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="data-[state=active]:bg-white data-[state=active]:dark:bg-gray-950 data-[state=active]:shadow-sm data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 rounded-lg transition-all text-gray-700 dark:text-gray-200"
              >
                📝 Yorumlar
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="hover:shadow-lg transition-shadow border-l-4 border-blue-500 dark:border-blue-700 bg-white dark:bg-gray-900">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-200">Toplam Yorum</CardTitle>
                    <MessageSquare className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">2,780</div>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">+12% geçen aya göre</p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow border-l-4 border-yellow-500 dark:border-yellow-700 bg-white dark:bg-gray-900">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      Ortalama Puan
                    </CardTitle>
                    <Star className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">8.4</div>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">+0.3 geçen aya göre</p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow border-l-4 border-green-500 dark:border-green-700 bg-white dark:bg-gray-900">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-200">Pozitif Oran</CardTitle>
                    <TrendingUp className="h-5 w-5 text-green-500 dark:text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">75%</div>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">+5% geçen aya göre</p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow border-l-4 border-purple-500 dark:border-purple-700 bg-white dark:bg-gray-900">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-200">Gelir Artışı</CardTitle>
                    <DollarSign className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">+35%</div>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">Son 6 ayda</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle className="text-gray-800 dark:text-white">Platform Performansı</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Hangi platformda daha iyi performans gösteriyorsunuz?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { platform: "Google", score: 8.7, reviews: 1250, trend: "+5%" },
                        { platform: "Booking.com", score: 8.2, reviews: 890, trend: "+3%" },
                        { platform: "TripAdvisor", score: 8.9, reviews: 420, trend: "+8%" },
                        { platform: "Zoover", score: 8.1, reviews: 220, trend: "+2%" },
                      ].map((platform, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                            <div>
                              <span className="font-semibold text-gray-800 dark:text-gray-100">
                                {platform.platform}
                              </span>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{platform.reviews} yorum</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-xl text-gray-900 dark:text-white">{platform.score}</div>
                            <Badge
                              variant="secondary"
                              className="text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30"
                            >
                              {platform.trend}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle className="text-gray-800 dark:text-white">Aylık Trend</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Pozitif ve negatif yorum trendleri
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" className="dark:stroke-gray-700" />
                          <XAxis dataKey="month" axisLine={false} tickLine={false} className="dark:text-gray-300" />
                          <YAxis axisLine={false} tickLine={false} className="dark:text-gray-300" />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="positive"
                            stroke="#22c55e"
                            strokeWidth={3}
                            dot={{ r: 5 }}
                            activeDot={{ r: 8 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="negative"
                            stroke="#ef4444"
                            strokeWidth={3}
                            dot={{ r: 5 }}
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="sentiment" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle className="text-gray-800 dark:text-white">Duygu Dağılımı</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Yorumların genel duygu analizi
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={sentimentData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {sentimentData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle className="text-gray-800 dark:text-white">Duygu Detayları</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Her duygu kategorisinin yüzdesel dağılımı
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {sentimentData.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-5 h-5 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="font-semibold text-gray-800 dark:text-gray-100">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}%</div>
                          <Progress value={item.value} className="w-28 mt-2 h-3" indicatorColor={item.color} />
                        </div>
                      </div>
                    ))}
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900">
                      <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2 flex items-center">
                        <Sparkles className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" /> AI Önerisi
                      </h4>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">
                        Pozitif yorumlarınız çok iyi! Ancak negatif yorumların %60'ı "oda temizliği" konusunda. Bu alana
                        odaklanarak genel memnuniyeti %85'e çıkarabilirsiniz.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="departments" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle className="text-gray-800 dark:text-white">Departman Performansı</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Hangi departmanlar daha iyi performans gösteriyor?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={departmentData} layout="vertical" margin={{ left: 20, right: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" className="dark:stroke-gray-700" />
                          <XAxis type="number" axisLine={false} tickLine={false} className="dark:text-gray-300" />
                          <YAxis
                            dataKey="department"
                            type="category"
                            width={100}
                            axisLine={false}
                            tickLine={false}
                            className="dark:text-gray-300"
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Bar dataKey="positive" fill="#22c55e" barSize={20} radius={[0, 10, 10, 0]} />
                          <Bar dataKey="negative" fill="#ef4444" barSize={20} radius={[0, 10, 10, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle className="text-gray-800 dark:text-white">Departman Detayları</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Her departmanın pozitif ve negatif geri bildirim oranları
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {departmentData.map((dept, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-bold text-gray-800 dark:text-gray-100 text-lg">{dept.department}</h4>
                          <Badge
                            variant={dept.positive > 80 ? "default" : dept.positive > 70 ? "secondary" : "destructive"}
                            className={
                              dept.positive > 80
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : dept.positive > 70
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            }
                          >
                            {dept.positive}% Pozitif
                          </Badge>
                        </div>
                        <Progress
                          value={dept.positive}
                          className="mb-2 h-3"
                          indicatorColor={dept.positive > 80 ? "#22c55e" : dept.positive > 70 ? "#3b82f6" : "#ef4444"}
                        />
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {dept.positive > 80
                            ? "🏆 Mükemmel performans!"
                            : dept.positive > 70
                              ? "👍 İyi performans"
                              : "⚠️ İyileştirme gerekli"}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="roi" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle className="text-gray-800 dark:text-white">Gelir Artışı</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Analiz öncesi vs sonrası aylık gelir karşılaştırması
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" className="dark:stroke-gray-700" />
                          <XAxis dataKey="month" axisLine={false} tickLine={false} className="dark:text-gray-300" />
                          <YAxis axisLine={false} tickLine={false} className="dark:text-gray-300" />
                          <Tooltip content={<CustomTooltip />} />
                          <Area
                            type="monotone"
                            dataKey="before"
                            stackId="1"
                            stroke="#94a3b8"
                            fill="#94a3b8"
                            fillOpacity={0.6}
                          />
                          <Area
                            type="monotone"
                            dataKey="after"
                            stackId="2"
                            stroke="#22c55e"
                            fill="#22c55e"
                            fillOpacity={0.8}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle className="text-gray-800 dark:text-white">ROI Hesaplaması</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Yatırımınızın geri dönüşünü detaylı görün
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-5 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-900">
                        <div className="text-3xl font-bold text-red-600 dark:text-red-400">₺115K</div>
                        <div className="text-sm text-red-700 dark:text-red-300 mt-1">Önceki Ortalama</div>
                      </div>
                      <div className="text-center p-5 bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-200 dark:border-green-900">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">₺170K</div>
                        <div className="text-sm text-green-700 dark:text-green-300 mt-1">Mevcut Ortalama</div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-700 dark:text-gray-200">Aylık Artış:</span>
                        <span className="font-bold text-green-600 dark:text-green-400 text-lg">+₺55K</span>
                      </div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-700 dark:text-gray-200">Yıllık Artış:</span>
                        <span className="font-bold text-green-600 dark:text-green-400 text-lg">+₺660K</span>
                      </div>
                      <div className="flex justify-between items-center mb-5">
                        <span className="text-gray-700 dark:text-gray-200">Platform Maliyeti:</span>
                        <span className="text-red-600 dark:text-red-400 font-bold text-lg">-₺96K/yıl</span>
                      </div>
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 p-5 rounded-xl border border-green-200 dark:border-green-900 shadow-md">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-gray-800 dark:text-gray-100 text-xl">Net ROI:</span>
                          <span className="text-3xl font-extrabold text-green-700 dark:text-green-300">+₺564K</span>
                        </div>
                        <div className="text-center mt-3">
                          <Badge className="bg-green-600 text-white text-base px-4 py-2 rounded-full shadow-lg">
                            %590 Yatırım Getirisi
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="space-y-6 mt-6">
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-white">Son Yorumlar</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    AI analizi ile kategorize edilmiş gerçek yorumlar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {demoData.map((review, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-12 h-12 border-2 border-blue-300 dark:border-blue-700">
                              <AvatarFallback className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold text-lg">
                                {review.User.slice(0, 2)}
                              </AvatarFallback>
                              {/* Eğer ileride review.User görseli eklenirse: */}
                              {/* <AvatarImage src={getAssetPath('/placeholder-user.jpg') || "/placeholder.svg"} /> */}
                            </Avatar>
                            <div>
                              <div className="font-bold text-gray-800 dark:text-gray-100 text-lg">{review.User}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {review.Platform} • {review.CommentDate}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge
                              variant={review.Sentiment === "Positive" ? "default" : "destructive"}
                              className={
                                review.Sentiment === "Positive"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-sm px-3 py-1"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm px-3 py-1"
                              }
                            >
                              {review.Sentiment === "Positive" ? "😊 Pozitif" : "😞 Negatif"}
                            </Badge>
                            <div className="flex items-center text-gray-700 dark:text-gray-200">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span className="ml-1 font-semibold">{review.UserScore}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed text-base">
                          {review.ReviewText}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {review.ReasonDepartment.split(", ").map((dept, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                            >
                              {dept}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

const HotelCommentsApp = () => {
  const [selectedPackage, setSelectedPackage] = useState<any>(null)
  const [showPurchaseForm, setShowPurchaseForm] = useState(false)
  const [showDemo, setShowDemo] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [liveStats, setLiveStats] = useState({
    reviews: 50247,
    customers: 234,
    satisfaction: 98.7,
  })
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45,
  })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    packageId: "",
  })
  const [activeTab, setActiveTab] = useState("overview")
  const { theme, setTheme } = useTheme()
  const [demoData, setDemoData] = useState<any[]>([])

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Live stats animation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) => ({
        reviews: prev.reviews + Math.floor(Math.random() * 3),
        customers: prev.customers + (Math.random() > 0.8 ? 1 : 0),
        satisfaction: Math.min(99.9, prev.satisfaction + (Math.random() - 0.5) * 0.1),
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const testimonials = [
    {
      name: "Mehmet Özkan",
      role: "Genel Müdür",
      company: "Antalya Palace Hotel",
      image: getAssetPath("/placeholder.svg?height=60&width=60&text=MÖ"),
      content:
        "Hotalyze sayesinde müşteri memnuniyetimizi %35 artırdık. Artık hangi alanlarda iyileştirme yapmamız gerektiğini tam olarak biliyoruz.",
      rating: 5,
      results: "+35% Müşteri Memnuniyeti",
    },
    {
      name: "Ayşe Demir",
      role: "Pazarlama Direktörü",
      company: "Bodrum Resort & Spa",
      image: getAssetPath("/placeholder.svg?height=60&width=60&text=AD"),
      content:
        "Rakip analizi özelliği sayesinde pazardaki konumumuzu net olarak görebiliyoruz. ROI'mız 3 ay içinde %250 arttı.",
      rating: 5,
      results: "+250% ROI Artışı",
    },
    {
      name: "Can Yılmaz",
      role: "İşletme Sahibi",
      company: "Kapadokya Cave Hotel",
      image: getAssetPath("/placeholder.svg?height=60&width=60&text=CY"),
      content:
        "Daha önce yorumları tek tek okumak zorundaydık. Şimdi tüm insights'ları dakikalar içinde alıyoruz. Zaman tasarrufu inanılmaz!",
      rating: 5,
      results: "90% Zaman Tasarrufu",
    },
  ]
  const clientLogos = [
    { name: "Hilton", logo: getAssetPath("/placeholder.svg?height=40&width=120&text=HILTON") },
    { name: "Marriott", logo: getAssetPath("/placeholder.svg?height=40&width=120&text=MARRIOTT") },
    { name: "Radisson", logo: getAssetPath("/placeholder.svg?height=40&width=120&text=RADISSON") },
    { name: "Sheraton", logo: getAssetPath("/placeholder.svg?height=40&width=120&text=SHERATON") },
    { name: "Hyatt", logo: getAssetPath("/placeholder.svg?height=40&width=120&text=HYATT") },
  ]
  // demoData artık dışarıdan fetch edilecek
  useEffect(() => {
    fetch(getAssetPath("/demo-data.json"))
      .then((res) => res.json())
      .then((data) => setDemoData(data))
      .catch(() => setDemoData([]))
  }, [])
  // Analysis data for charts
  const sentimentData = [
    { name: "Pozitif", value: 75, color: "#22c55e" },
    { name: "Negatif", value: 15, color: "#ef4444" },
    { name: "Nötr", value: 10, color: "#6b7280" },
  ]
  const departmentData = [
    { department: "Personel", positive: 85, negative: 15 },
    { department: "Yemek", positive: 70, negative: 30 },
    { department: "Temizlik", positive: 90, negative: 10 },
    { department: "Oda", positive: 65, negative: 35 },
    { department: "Hizmet", positive: 80, negative: 20 },
    { department: "Genel", positive: 75, negative: 25 },
  ]
  const platformData = [
    { platform: "Google", count: 1250, percentage: 45 },
    { platform: "Booking.com", count: 890, percentage: 32 },
    { platform: "TripAdvisor", count: 420, percentage: 15 },
    { platform: "Zoover", count: 220, percentage: 8 },
  ]
  const trendData = [
    { month: "Oca", positive: 65, negative: 35 },
    { month: "Şub", positive: 70, negative: 30 },
    { month: "Mar", positive: 75, negative: 25 },
    { month: "Nis", positive: 80, negative: 20 },
    { month: "May", positive: 85, negative: 15 },
    { month: "Haz", positive: 78, negative: 22 },
    { month: "Tem", positive: 82, negative: 18 },
  ]
  const revenueData = [
    { month: "Oca", before: 100000, after: 135000 },
    { month: "Şub", before: 95000, after: 142000 },
    { month: "Mar", before: 110000, after: 158000 },
    { month: "Nis", before: 105000, after: 165000 },
    { month: "May", before: 120000, after: 180000 },
    { month: "Haz", before: 115000, after: 195000 },
  ]
  const packages = [
    {
      id: 1,
      name: "Starter",
      subtitle: "Küçük Oteller İçin",
      price: "2,999₺",
      originalPrice: "4,999₺",
      monthlyPrice: "299₺/ay",
      discount: "40%",
      reviews: "500+ Yorum",
      hotels: "5 Otel",
      features: [
        "Google ve Booking.com yorumları",
        "Temel sentiment analizi",
        "Departman kategorilendirme",
        "Excel raporları",
        "Email destek",
        "Aylık güncelleme",
      ],
      badge: "En Popüler",
      color: "from-blue-500 to-purple-600",
      popular: true,
      savings: "2,000₺ Tasarruf",
    },
    {
      id: 2,
      name: "Professional",
      subtitle: "Büyüyen İşletmeler İçin",
      price: "7,999₺",
      originalPrice: "12,999₺",
      monthlyPrice: "799₺/ay",
      discount: "38%",
      reviews: "2,000+ Yorum",
      hotels: "15 Otel",
      features: [
        "Tüm platformlardan yorumlar",
        "Gelişmiş AI analizi",
        "Rekabet analizi",
        "Trend raporları",
        "API entegrasyonu",
        "Özel dashboard",
        "Öncelikli destek",
        "Haftalık güncelleme",
      ],
      badge: "En Çok Tercih Edilen",
      color: "from-purple-500 to-pink-600",
      popular: false,
      savings: "5,000₺ Tasarruf",
    },
    {
      id: 3,
      name: "Enterprise",
      subtitle: "Büyük Zincirler İçin",
      price: "19,999₺",
      originalPrice: "29,999₺",
      monthlyPrice: "1,999₺/ay",
      discount: "33%",
      reviews: "Sınırsız",
      hotels: "50+ Otel",
      features: [
        "Sınırsız otel verisi",
        "AI-powered insights",
        "Gerçek zamanlı analiz",
        "Özelleştirilebilir raporlar",
        "Dedicated hesap yöneticisi",
        "White-label çözüm",
        "Günlük veri akışı",
        "7/24 telefon desteği",
        "Özel eğitim",
      ],
      badge: "Premium",
      color: "from-yellow-500 to-red-600",
      popular: false,
      savings: "10,000₺ Tasarruf",
    },
  ]
  const stats = [
    {
      icon: MessageSquare,
      number: liveStats.reviews.toLocaleString(),
      label: "Analiz Edilen Yorum",
      color: "text-blue-600",
      change: "+1,247",
      period: "Bu hafta",
    },
    {
      icon: Users,
      number: liveStats.customers.toString(),
      label: "Mutlu Müşteri",
      color: "text-purple-600",
      change: "+12",
      period: "Bu ay",
    },
    {
      icon: Globe,
      number: "25+",
      label: "Platform",
      color: "text-green-600",
      change: "+3",
      period: "Yeni eklenen",
    },
    {
      icon: TrendingUp,
      number: `${liveStats.satisfaction.toFixed(1)}%`,
      label: "Müşteri Memnuniyeti",
      color: "text-red-600",
      change: "+2.3%",
      period: "Son 3 ay",
    },
  ]
  const handlePackageSelect = useCallback(
    (pkg: any) => {
      setSelectedPackage(pkg)
      setFormData({ ...formData, packageId: pkg.id })
      setShowPurchaseForm(true)
    },
    [formData],
  )

  const openDemo = useCallback((tab = "overview") => {
    setActiveTab(tab)
    setShowDemo(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-purple-950 font-sans">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <BarChart3 className="text-white w-7 h-7" />
              </div>
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Hotalyze
              </h1>
              <Badge
                variant="secondary"
                className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-sm px-3 py-1 rounded-full"
              >
                AI Powered
              </Badge>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Button
                variant="ghost"
                onClick={() => openDemo("overview")}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 px-4 py-2 rounded-lg transition-colors text-base font-medium"
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                Demo
              </Button>
              <a
                href="#analysis"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium flex items-center transition-colors text-base"
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById("analysis")
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                Analizler
              </a>
              <a
                href="#packages"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium flex items-center transition-colors text-base"
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById("packages")
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                Fiyatlar
              </a>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full px-6 py-3 font-semibold shadow-md transition-all transform hover:scale-105"
              >
                <Phone className="w-5 h-5 mr-2" />
                Hemen Ara
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                aria-label="Toggle dark mode"
              >
                {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Limited Time Offer Banner */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-3.5 animate-pulse-slow">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4 text-base font-semibold">
            <Sparkles className="w-6 h-6 animate-bounce-slow" />
            <span>🔥 SINIRLI SÜRE! İlk 100 müşteriye özel %40 indirim</span>
            <div className="flex items-center space-x-2 bg-white/30 dark:bg-black/30 rounded-full px-4 py-1.5 shadow-inner">
              <Clock className="w-5 h-5" />
              <span>
                {timeLeft.days}g {timeLeft.hours}s {timeLeft.minutes}d {timeLeft.seconds}sn
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24 text-center relative overflow-hidden">
        {/* Yeni, daha dinamik arka plan efekti */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/60 via-purple-100/60 to-pink-100/60 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 rounded-[40px] transform -rotate-1 -translate-y-4 shadow-2xl animate-scale-in-bg"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-[40px] transform rotate-2 translate-y-8 scale-98 shadow-xl animate-scale-in-bg delay-100"></div>
        </div>
        <div className="relative max-w-6xl mx-auto z-10">
          <Badge className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2.5 text-base rounded-full shadow-lg animate-fade-in-up">
            🚀 Türkiye'nin #1 Otel Yorum Analiz Platformu
          </Badge>
          <h2 className="text-6xl md:text-8xl font-extrabold text-gray-900 dark:text-white mb-8 leading-tight tracking-tight animate-fade-in-up delay-100">
            Otel Yorumlarını
            <span className="bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent block">
              AI ile Gelire Çevir!
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-10 leading-relaxed max-w-4xl mx-auto animate-fade-in-up delay-200">
            <strong>Binlerce yorumu saniyeler içinde analiz et.</strong> Müşteri memnuniyetini %35 artır, gelirini %250
            yükselt. Rakiplerinizi geride bırak!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up delay-300">
            <Button
              size="lg"
              onClick={() => openDemo("overview")}
              className="px-10 py-7 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-2xl text-xl tracking-wide"
            >
              <PlayCircle className="w-7 h-7 mr-3" />🎯 Ücretsiz Demo İzle
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })}
              className="px-10 py-7 border-3 border-blue-500 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-500 hover:text-white rounded-full font-bold transition-all text-xl shadow-lg hover:shadow-xl tracking-wide"
            >
              <Rocket className="w-7 h-7 mr-3" />
              Hemen Başla
            </Button>
          </div>
          {/* Social Proof */}
          <div className="mb-10 animate-fade-in-up delay-400">
            <p className="text-gray-600 dark:text-gray-300 mb-5 text-lg font-medium">
              🏆 Türkiye'nin önde gelen otel zincirlerinin tercihi
            </p>
            <div className="flex flex-wrap justify-center items-center gap-10 opacity-70">
              {clientLogos.map((client, index) => (
                <img
                  key={index}
                  src={client.logo || "/placeholder.svg"}
                  alt={client.name}
                  className="h-10 grayscale hover:grayscale-0 transition-all duration-300"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="bg-white dark:bg-gray-900 py-20 shadow-inner-top">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-base px-4 py-2 rounded-full">
              📈 Canlı İstatistikler
            </Badge>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Şu Anda Platform'da</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div
                  className={`w-20 h-20 ${stat.color.replace("text-", "bg-").replace("-600", "-100")} dark:${stat.color.replace("text-", "bg-").replace("-600", "-900/30")} rounded-full flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                >
                  <stat.icon className={`w-10 h-10 ${stat.color} dark:${stat.color.replace("-600", "-400")}`} />
                </div>
                <div className="text-4xl font-extrabold text-gray-900 dark:text-white">{stat.number}</div>
                <div className="text-gray-700 dark:text-gray-200 text-lg mb-1">{stat.label}</div>
                <div className="text-sm text-green-600 dark:text-green-400 font-semibold">
                  {stat.change} {stat.period}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Success Stories */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-base px-4 py-2 rounded-full">
              💬 Müşteri Hikayeleri
            </Badge>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Başarı Hikayeleri</h3>
            <p className="text-xl text-gray-700 dark:text-gray-200">Gerçek müşterilerimizin gerçek sonuçları</p>
          </div>
          <div className="max-w-5xl mx-auto">
            <Card className="p-10 shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-950/30 rounded-3xl">
              <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-10">
                <div className="flex-shrink-0">
                  <Avatar className="w-28 h-28 border-4 border-blue-300 dark:border-blue-700 shadow-lg">
                    <AvatarImage
                      src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                      alt={testimonials[currentTestimonial].name}
                    />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-3xl font-bold">
                      {testimonials[currentTestimonial].name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-xl text-gray-800 dark:text-gray-100 mb-5 italic leading-relaxed">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white text-lg">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300 text-base">
                        {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}
                      </div>
                    </div>
                    <Badge className="mt-4 md:mt-0 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-4 py-2 text-base rounded-full shadow-sm">
                      {testimonials[currentTestimonial].results}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${index === currentTestimonial
                    ? "bg-blue-600 dark:bg-blue-400 scale-125"
                    : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                    }`}
                  aria-label={`Testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Preview Section */}
      <section
        id="analysis"
        className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-5 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 text-base px-4 py-2 rounded-full">
              🤖 AI Destekli Analizler
            </Badge>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Profesyonel Analiz Raporları
            </h3>
            <p className="text-xl text-gray-700 dark:text-gray-200">
              Verilerinizi anlamlı içgörülere ve kâra dönüştürüyoruz
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Duygu Analizi Card */}
            <Card
              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-950/30 rounded-3xl p-6 cursor-pointer"
              onClick={() => openDemo("sentiment")}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3 text-2xl font-bold text-gray-900 dark:text-white">
                  <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center shadow-md">
                    <PieChart className="w-7 h-7 text-green-600 dark:text-green-400" />
                  </div>
                  <span>Duygu Analizi</span>
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-base">
                  Müşterileriniz gerçekte ne düşünüyor?
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[200px] mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-xl mt-6 border border-green-200 dark:border-green-900">
                  <div className="text-base text-green-800 dark:text-green-200 font-bold flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" /> AI Önerisi
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Pozitif yorumlarınızı pazarlamada kullanın!
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Departman Analizi Card */}
            <Card
              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-950/30 rounded-3xl p-6 cursor-pointer"
              onClick={() => openDemo("departments")}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3 text-2xl font-bold text-gray-900 dark:text-white">
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shadow-md">
                    <Building2 className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span>Departman Analizi</span>
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-base">
                  Hangi departmanınız daha iyi performans gösteriyor?
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[200px] mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentData} layout="vertical" margin={{ left: 20, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" className="dark:stroke-gray-700" />
                      <XAxis type="number" axisLine={false} tickLine={false} className="dark:text-gray-300" />
                      <YAxis
                        dataKey="department"
                        type="category"
                        width={100}
                        axisLine={false}
                        tickLine={false}
                        className="dark:text-gray-300"
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="positive" fill="#22c55e" barSize={15} radius={[0, 10, 10, 0]} name="Pozitif" />
                      <Bar dataKey="negative" fill="#ef4444" barSize={15} radius={[0, 10, 10, 0]} name="Negatif" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-xl mt-6 border border-yellow-200 dark:border-yellow-900">
                  <div className="text-base text-yellow-800 dark:text-yellow-200 font-bold flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400" /> Dikkat
                  </div>
                  <div className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    Oda departmanında iyileştirme gerekli!
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ROI Analizi Card */}
            <Card
              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-950/30 rounded-3xl p-6 cursor-pointer"
              onClick={() => openDemo("roi")}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3 text-2xl font-bold text-gray-900 dark:text-white">
                  <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center shadow-md">
                    <Activity className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span>ROI Analizi</span>
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-base">
                  Yatırımınızın geri dönüşü ne kadar?
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[200px] mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" className="dark:stroke-gray-700" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} className="dark:text-gray-300" />
                      <YAxis axisLine={false} tickLine={false} className="dark:text-gray-300" />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="before"
                        stackId="1"
                        stroke="#94a3b8"
                        fill="#94a3b8"
                        fillOpacity={0.6}
                        name="Önceki Gelir"
                      />
                      <Area
                        type="monotone"
                        dataKey="after"
                        stackId="2"
                        stroke="#22c55e"
                        fill="#22c55e"
                        fillOpacity={0.8}
                        name="Mevcut Gelir"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-xl mt-6 border border-purple-200 dark:border-purple-900">
                  <div className="text-base text-purple-800 dark:text-purple-200 font-bold flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" /> Hedef
                  </div>
                  <div className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                    6 ayda %50 gelir artışı mümkün!
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="text-center">
            <Button
              size="lg"
              onClick={() => openDemo("overview")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-10 py-5 text-xl rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <Eye className="w-6 h-6 mr-3" />🚀 Detaylı Demo İzle - Ücretsiz
            </Button>
            <p className="text-base text-gray-600 dark:text-gray-300 mt-4">
              Kredi kartı gerektirmez • 2 dakikada kurulum
            </p>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section
        id="packages"
        className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-base px-4 py-2 rounded-full">
              💎 Özel Fiyatlar
            </Badge>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Size Özel Paketler</h3>
            <p className="text-xl text-gray-700 dark:text-gray-200">İhtiyacınıza uygun paketi seçin, hemen başlayın!</p>
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl p-4 mt-8 max-w-md mx-auto shadow-md">
              <div className="flex items-center justify-center space-x-3">
                <AlertCircle className="w-6 h-6 text-red-500 dark:text-red-400" />
                <span className="text-red-800 dark:text-red-200 font-semibold text-base">
                  ⏰ Sınırlı süre! {timeLeft.days} gün {timeLeft.hours} saat kaldı
                </span>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`relative bg-white dark:bg-gray-900 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 ${pkg.popular
                  ? "scale-105 border-4 border-purple-400 dark:border-purple-700 ring-4 ring-purple-100 dark:ring-purple-900/50"
                  : ""
                  }`}
              >
                {pkg.badge && (
                  <div
                    className={`absolute -top-5 left-1/2 transform -translate-x-1/2 px-8 py-2.5 bg-gradient-to-r ${pkg.color} text-white text-base font-bold rounded-full shadow-lg`}
                  >
                    {pkg.badge}
                  </div>
                )}
                <div className="p-10">
                  <div className="text-center mb-8">
                    <h4 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">{pkg.name}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-lg mb-5">{pkg.subtitle}</p>
                    <div className="mb-5">
                      <div className="text-5xl font-extrabold text-gray-900 dark:text-white">
                        {pkg.price}
                        <span className="text-xl text-gray-500 dark:text-gray-400 line-through ml-3">
                          {pkg.originalPrice}
                        </span>
                      </div>
                      <div className="text-base text-gray-600 dark:text-gray-300 mt-2">
                        veya {pkg.monthlyPrice} 12 ay taksit
                      </div>
                      <Badge className="mt-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-sm px-3 py-1.5 rounded-full">
                        %{pkg.discount} İndirim
                      </Badge>
                    </div>
                    <div className="text-base text-gray-600 dark:text-gray-300 mb-6">
                      📊 {pkg.reviews} • 🏨 {pkg.hotels}
                    </div>
                    <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-xl p-4 mb-8 shadow-inner">
                      <div className="text-green-800 dark:text-green-200 font-bold text-base flex items-center justify-center">
                        <DollarSign className="w-5 h-5 mr-2" /> {pkg.savings}
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-10">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700 dark:text-gray-200 text-base">
                        <CheckCircle className="text-green-500 w-6 h-6 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handlePackageSelect(pkg)}
                    className={`w-full py-5 bg-gradient-to-r ${pkg.color} text-white rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-[1.02] text-xl shadow-lg`}
                  >
                    <Rocket className="w-6 h-6 mr-3" />
                    Hemen Başla
                  </Button>
                  <div className="text-center mt-6">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <Shield className="w-4 h-4" />
                      <span>30 gün para iade garantisi</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <p className="text-gray-700 dark:text-gray-200 mb-6 text-xl">
              🤔 Hangi paket size uygun emin değil misiniz?
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border-3 border-blue-500 dark:border-blue-700 text-blue-600 dark:text-blue-400 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:text-blue-700 dark:hover:text-blue-300 px-10 py-5 text-xl rounded-full font-bold shadow-md transition-all transform hover:scale-105"
            >
              <Phone className="w-6 h-6 mr-3" />
              Ücretsiz Danışmanlık Al
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-base px-4 py-2 rounded-full">
              ⚡ Özellikler
            </Badge>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Neden Hotalyze?</h3>
            <p className="text-xl text-gray-700 dark:text-gray-200">Sektörde öncü teknolojiler ile fark yaratıyoruz</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="text-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-300 group transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Shield className="text-blue-600 dark:text-blue-400 w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">🛡️ %100 Güvenilir Veri</h4>
              <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed">
                Tüm verilerimiz gerçek otel yorumlarından elde edilir ve AI ile doğrulanır.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-all duration-300 group transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Zap className="text-purple-600 dark:text-purple-400 w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">⚡ Hızlı Teslimat</h4>
              <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed">
                Ödeme sonrası 24 saat içinde verileriniz hazır! Hemen başlayın.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:bg-green-50 dark:hover:bg-green-950/20 transition-all duration-300 group transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                <TrendingUp className="text-green-600 dark:text-green-400 w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">📈 Kanıtlanmış Sonuçlar</h4>
              <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed">
                Müşterilerimiz ortalama %35 gelir artışı yaşıyor. Siz de katılın!
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:bg-yellow-50 dark:hover:bg-yellow-950/20 transition-all duration-300 group transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Crown className="text-yellow-600 dark:text-yellow-400 w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">👑 Premium Destek</h4>
              <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed">
                7/24 Türkçe destek ekibimiz her zaman yanınızda. Hiç yalnız kalmayın.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-300 group transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Target className="text-red-600 dark:text-red-400 w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">🎯 Aksiyon Odaklı</h4>
              <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed">
                Sadece rapor değil, ne yapmanız gerektiğini de söylüyoruz.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-all duration-300 group transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Sparkles className="text-indigo-600 dark:text-indigo-400 w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">✨ AI Destekli</h4>
              <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed">
                En gelişmiş yapay zeka teknolojileri ile daha akıllı analizler.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900 text-white shadow-inner-top">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-5xl font-extrabold mb-8 leading-tight">🚀 Hemen Başlayın, Farkı Görün!</h3>
          <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto">
            Binlerce otel sahibi zaten Hotalyze kullanıyor. Siz de geride kalmayın!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              onClick={() => openDemo("overview")}
              className="px-10 py-6 bg-white text-blue-600 hover:bg-gray-100 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <PlayCircle className="w-7 h-7 mr-3" />
              Ücretsiz Demo İzle
            </Button>
            <Button
              size="lg"
              onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })}
              className="px-10 py-6 bg-transparent border-3 border-white text-white hover:bg-white hover:text-blue-600 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <Rocket className="w-7 h-7 mr-3" />
              Paketi Seç & Başla
            </Button>
          </div>
          <p className="text-base opacity-80 mt-6">💳 Kredi kartı gerektirmez • ⚡ 2 dakikada kurulum</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 dark:bg-black text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-5">
                <BarChart3 className="text-blue-400 w-8 h-8" />
                <span className="text-2xl font-bold">Hotalyze</span>
              </div>
              <p className="text-gray-400 text-base leading-relaxed mb-6">
                Otel yorumlarını analiz ederek işletmenizin büyümesine katkıda bulunuyoruz.
              </p>
              <div className="flex space-x-4">
                <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-sm px-3 py-1.5 rounded-full">
                  ⭐ 4.9/5
                </Badge>
                <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-sm px-3 py-1.5 rounded-full">
                  🏆 #1 Platform
                </Badge>
              </div>
            </div>
            <div>
              <h5 className="font-bold text-xl mb-5 text-blue-300">🚀 Hizmetler</h5>
              <ul className="space-y-3 text-gray-400 text-base">
                <li>📊 Yorum Analizi</li>
                <li>🏆 Rekabet Analizi</li>
                <li>📈 Trend Raporları</li>
                <li>🔗 API Entegrasyonu</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-xl mb-5 text-purple-300">💬 Destek</h5>
              <ul className="space-y-3 text-gray-400 text-base">
                <li>❓ Yardım Merkezi</li>
                <li>📞 İletişim</li>
                <li>🤔 SSS</li>
                <li>📝 Blog</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-xl mb-5 text-pink-300">📞 İletişim</h5>
              <ul className="space-y-3 text-gray-400 text-base">
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-3" />
                  info@hotalyze.com
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-3" />
                  +90 555 123 45 67
                </li>
                <li className="flex items-center">
                  <Globe className="w-5 h-5 mr-3" />
                  İstanbul, Türkiye
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 dark:border-gray-700 mt-12 pt-8 text-center text-gray-500 dark:text-gray-600 text-sm">
            <p>&copy; 2025 Hotalyze. Tüm hakları saklıdır. 🇹🇷 Türkiye'de tasarlandı.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showPurchaseForm && (
        <PurchaseModal
          selectedPackage={selectedPackage}
          formData={formData}
          setFormData={setFormData}
          setShowPurchaseForm={setShowPurchaseForm}
        />
      )}
      {showDemo && (
        <DemoModal
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setShowDemo={setShowDemo}
          demoData={demoData}
          sentimentData={sentimentData}
          departmentData={departmentData}
          trendData={trendData}
          revenueData={revenueData}
        />
      )}
    </div>
  )
}

export default HotelCommentsApp
