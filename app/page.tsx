"use client"

import { useState, useEffect } from "react"
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
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Recharts import'larını düzelt
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
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '/HotelComments';
  if (path.startsWith('/')) return `${base}${path}`;
  return `${base}/${path}`;
};

const HotelCommentsApp = () => {
  const [selectedPackage, setSelectedPackage] = useState(null)
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
  // DEĞIŞEN:
  const [activeTab, setActiveTab] = useState("overview")
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

  const demoData = [
    {
      id: 29,
      Platform: "Google",
      Company: "Otel5",
      User: "ERHAN TEZEL",
      ReviewText:
        "Küçük çocuğumuz olduğu için tercih ettik. Dezavantajları; 1-Sessiz ve manzaralı bir oda talep etmemize rağmen 1101 nolu oda verildi...",
      Sentiment: "Negative",
      ReasonDepartment: "Oda, Hizmet, Genel",
      UserScore: 4,
      GeneralScore: 8.4,
      CommentDate: "2025-07-11",
    },
    {
      id: 32,
      Platform: "Google",
      Company: "Otel5",
      User: "Ares Ceferov",
      ReviewText:
        "Bu otelde geçirdiğimiz tatil beklentimizin çok üzerindeydi. Girişten itibaren personeller güleryüzlüydü. Havuz temiz ve güzeldi.",
      Sentiment: "Positive",
      ReasonDepartment: "Personel, Temizlik",
      UserScore: 10,
      GeneralScore: 8.4,
      CommentDate: "2025-07-11",
    },
    {
      id: 30,
      Platform: "Google",
      Company: "Otel5",
      User: "Fatmir Koci",
      ReviewText: "Eşimle ilk kez bu tesise geldim. Gelir gelmez çok sıcak bir karşılamayla karşılaştık...",
      Sentiment: "Positive",
      ReasonDepartment: "Resepsiyon, Personel, Hizmet, Genel",
      UserScore: 10,
      GeneralScore: 8.4,
      CommentDate: "2025-07-10",
    },
  ]

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

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg)
    setFormData({ ...formData, packageId: pkg.id })
    setShowPurchaseForm(true)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    alert(`${formData.name}, ${selectedPackage.name} paketiniz için ödeme sayfasına yönlendiriliyorsunuz!`)
  }
  const openDemo = () => {
    setActiveTab("overview")
    setShowDemo(true)
  }
  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-800">{label}</p>
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

  const PurchaseModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <div
            className={`w-16 h-16 bg-gradient-to-r ${selectedPackage?.color} rounded-full flex items-center justify-center mx-auto mb-4`}
          >
            <Award className="text-white w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{selectedPackage?.name} Paketi</h3>
          <p className="text-gray-600">Bilgilerinizi doldurun, hemen başlayın!</p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
            <div className="flex items-center justify-center space-x-2">
              <Gift className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">
                🎉 İlk 100 müşteriye özel %{selectedPackage?.discount} indirim!
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Adınız ve soyadınız"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">E-posta *</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@ornek.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Şirket/Otel Adı *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Otel/şirket adınız"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Telefon *</label>
            <input
              type="tel"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="0555 123 45 67"
            />
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">Paket Özeti</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{selectedPackage?.name} Paketi</span>
                <span className="text-lg font-bold text-blue-600">{selectedPackage?.price}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Normal Fiyat</span>
                <span className="text-gray-500 line-through">{selectedPackage?.originalPrice}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-green-600 font-medium">Tasarrufunuz</span>
                <span className="text-green-600 font-bold">{selectedPackage?.savings}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => setShowPurchaseForm(false)} className="flex-1">
              İptal
            </Button>
            <Button
              type="button"
              onClick={handleFormSubmit}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Hemen Başla
            </Button>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              <span>30 gün para iade garantisi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const DemoModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">🚀 Canlı Demo - Otel Yorum Analizi</h3>
                <p className="text-gray-600">Gerçek verilerle analiz örnekleri - Ücretsiz keşfedin!</p>
              </div>
              <Button variant="outline" onClick={() => setShowDemo(false)}>
                Kapat
              </Button>
            </div>
          </div>

          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">📊 Genel Bakış</TabsTrigger>
                <TabsTrigger value="sentiment">💭 Duygu Analizi</TabsTrigger>
                <TabsTrigger value="departments">🏢 Departmanlar</TabsTrigger>
                <TabsTrigger value="roi">💰 ROI Analizi</TabsTrigger>
                <TabsTrigger value="reviews">📝 Yorumlar</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Toplam Yorum</CardTitle>
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2,780</div>
                      <p className="text-xs text-green-600">+12% geçen aya göre</p>
                    </CardContent>
                  </Card>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Ortalama Puan</CardTitle>
                      <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">8.4</div>
                      <p className="text-xs text-green-600">+0.3 geçen aya göre</p>
                    </CardContent>
                  </Card>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Pozitif Oran</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">75%</div>
                      <p className="text-xs text-green-600">+5% geçen aya göre</p>
                    </CardContent>
                  </Card>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Gelir Artışı</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+35%</div>
                      <p className="text-xs text-green-600">Son 6 ayda</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Platform Performansı</CardTitle>
                      <CardDescription>Hangi platformda daha iyi performans gösteriyorsunuz?</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { platform: "Google", score: 8.7, reviews: 1250, trend: "+5%" },
                          { platform: "Booking.com", score: 8.2, reviews: 890, trend: "+3%" },
                          { platform: "TripAdvisor", score: 8.9, reviews: 420, trend: "+8%" },
                          { platform: "Zoover", score: 8.1, reviews: 220, trend: "+2%" },
                        ].map((platform, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                              <div>
                                <span className="font-medium">{platform.platform}</span>
                                <div className="text-sm text-gray-500">{platform.reviews} yorum</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-lg">{platform.score}</div>
                              <Badge variant="secondary" className="text-green-600">
                                {platform.trend}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Aylık Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Line type="monotone" dataKey="positive" stroke="#22c55e" strokeWidth={2} />
                            <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="sentiment" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Duygu Dağılımı</CardTitle>
                      <CardDescription>Yorumların genel duygu analizi</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie data={sentimentData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
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

                  <Card>
                    <CardHeader>
                      <CardTitle>Duygu Detayları</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {sentimentData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">{item.value}%</div>
                            <Progress value={item.value} className="w-24 mt-2" />
                          </div>
                        </div>
                      ))}
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">🎯 AI Önerisi</h4>
                        <p className="text-blue-700 text-sm">
                          Pozitif yorumlarınız çok iyi! Ancak negatif yorumların %60'ı "oda temizliği" konusunda.
                          Bu alana odaklanarak genel memnuniyeti %85'e çıkarabilirsiniz.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="departments" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Departman Performansı</CardTitle>
                      <CardDescription>Hangi departmanlar daha iyi performans gösteriyor?</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={departmentData} layout="horizontal">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="department" type="category" width={80} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="positive" fill="#22c55e" />
                            <Bar dataKey="negative" fill="#ef4444" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Departman Detayları</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {departmentData.map((dept, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">{dept.department}</h4>
                            <Badge
                              variant={dept.positive > 80 ? "default" : dept.positive > 70 ? "secondary" : "destructive"}
                            >
                              {dept.positive}% Pozitif
                            </Badge>
                          </div>
                          <Progress value={dept.positive} className="mb-2" />
                          <div className="text-sm text-gray-600">
                            {dept.positive > 80 ? "🏆 Mükemmel performans!" :
                              dept.positive > 70 ? "👍 İyi performans" : "⚠️ İyileştirme gerekli"}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="roi" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Gelir Artışı</CardTitle>
                      <CardDescription>Analiz öncesi vs sonrası aylık gelir karşılaştırması</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="before" stackId="1" stroke="#94a3b8" fill="#94a3b8" />
                            <Area type="monotone" dataKey="after" stackId="2" stroke="#22c55e" fill="#22c55e" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>ROI Hesaplaması</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">₺115K</div>
                          <div className="text-sm text-red-700">Önceki Ortalama</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">₺170K</div>
                          <div className="text-sm text-green-700">Mevcut Ortalama</div>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span>Aylık Artış:</span>
                          <span className="font-bold text-green-600">+₺55K</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span>Yıllık Artış:</span>
                          <span className="font-bold text-green-600">+₺660K</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <span>Platform Maliyeti:</span>
                          <span className="text-red-600">-₺96K/yıl</span>
                        </div>
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-bold">Net ROI:</span>
                            <span className="text-2xl font-bold text-green-600">+₺564K</span>
                          </div>
                          <div className="text-center mt-2">
                            <Badge className="bg-green-600">%590 Yatırım Getirisi</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Son Yorumlar</CardTitle>
                    <CardDescription>AI analizi ile kategorize edilmiş gerçek yorumlar</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {demoData.map((review, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-10 h-10">
                                <AvatarFallback>{review.User.slice(0, 2)}</AvatarFallback>
                                {/* Eğer ileride review.User görseli eklenirse: */}
                                {/* <AvatarImage src={getAssetPath('/placeholder-user.jpg')} /> */}
                              </Avatar>
                              <div>
                                <div className="font-medium">{review.User}</div>
                                <div className="text-sm text-gray-500">{review.Platform} • {review.CommentDate}</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant={review.Sentiment === "Positive" ? "default" : "destructive"}
                                className={review.Sentiment === "Positive" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                              >
                                {review.Sentiment === "Positive" ? "😊 Pozitif" : "😞 Negatif"}
                              </Badge>
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="ml-1 font-medium">{review.UserScore}</span>
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-3 leading-relaxed">{review.ReviewText}</p>

                          <div className="flex flex-wrap gap-2">
                            {review.ReasonDepartment.split(", ").map((dept, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-white w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Hotalyze
              </h1>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                AI Powered
              </Badge>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Button variant="ghost" onClick={openDemo}>
                <PlayCircle className="w-4 h-4 mr-2" />
                Demo
              </Button>
              <a
                href="#analysis"
                className="text-gray-600 hover:text-blue-600 font-medium flex items-center"
                onClick={e => {
                  e.preventDefault();
                  const el = document.getElementById("analysis");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Analizler
              </a>
              <a
                href="#packages"
                className="text-gray-600 hover:text-blue-600 font-medium flex items-center"
                onClick={e => {
                  e.preventDefault();
                  const el = document.getElementById("packages");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Fiyatlar
              </a>
              <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600">
                <Phone className="w-4 h-4 mr-2" />
                Hemen Ara
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Limited Time Offer Banner */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4 text-sm font-medium">
            <Sparkles className="w-5 h-5" />
            <span>🔥 SINIRLI SÜRE! İlk 100 müşteriye özel %40 indirim</span>
            <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-1">
              <Clock className="w-4 h-4" />
              <span>
                {timeLeft.days}g {timeLeft.hours}s {timeLeft.minutes}d {timeLeft.seconds}sn
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-3xl"></div>
        <div className="relative max-w-5xl mx-auto">
          <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2">
            🚀 Türkiye'nin #1 Otel Yorum Analiz Platformu
          </Badge>
          <h2 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Otel Yorumlarını
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              AI ile Gelire Çevir!
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            <strong>Binlerce yorumu saniyeler içinde analiz et.</strong> Müşteri memnuniyetini %35 artır, gelirini %250
            yükselt. Rakiplerinizi geride bırak!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={openDemo}
              className="px-8 py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-xl text-lg"
            >
              <PlayCircle className="w-6 h-6 mr-2" />🎯 Ücretsiz Demo İzle
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-6 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full font-semibold transition-all text-lg"
            >
              <Rocket className="w-6 h-6 mr-2" />
              Hemen Başla
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mb-8">
            <p className="text-gray-600 mb-4">🏆 Türkiye'nin önde gelen otel zincirlerinin tercihi</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {clientLogos.map((client, index) => (
                <img
                  key={index}
                  src={client.logo || "/placeholder.svg"}
                  alt={client.name}
                  className="h-8 grayscale hover:grayscale-0 transition-all"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="bg-white py-16 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800">📈 Canlı İstatistikler</Badge>
            <h3 className="text-3xl font-bold text-gray-800">Şu Anda Platform'da</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`w-16 h-16 ${stat.color.replace("text-", "bg-").replace("-600", "-100")} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                >
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 mb-1">{stat.label}</div>
                <div className="text-sm text-green-600 font-medium">
                  {stat.change} {stat.period}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Success Stories */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800">💬 Müşteri Hikayeleri</Badge>
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Başarı Hikayeleri</h3>
            <p className="text-xl text-gray-600">Gerçek müşterilerimizin gerçek sonuçları</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 shadow-xl border-0 bg-gradient-to-br from-white to-blue-50">
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="flex-shrink-0">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={testimonials[currentTestimonial].image || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl">
                      {testimonials[currentTestimonial].name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-3">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-lg text-gray-700 mb-4 italic">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="font-semibold text-gray-800">{testimonials[currentTestimonial].name}</div>
                      <div className="text-gray-600">
                        {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}
                      </div>
                    </div>
                    <Badge className="mt-2 md:mt-0 bg-green-100 text-green-800 px-3 py-1">
                      {testimonials[currentTestimonial].results}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentTestimonial ? "bg-blue-500" : "bg-gray-300"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Preview Section */}
      <section id="analysis" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800">🤖 AI Destekli Analizler</Badge>
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Profesyonel Analiz Raporları</h3>
            <p className="text-xl text-gray-600">Verilerinizi anlamlı içgörülere ve kâra dönüştürüyoruz</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-green-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <PieChart className="w-5 h-5 text-green-600" />
                  </div>
                  <span>Duygu Analizi</span>
                </CardTitle>
                <CardDescription>Müşterileriniz gerçekte ne düşünüyor?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">😊 Pozitif</span>
                    <span className="text-sm font-medium text-green-600">75%</span>
                  </div>
                  <Progress value={75} className="h-3" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">😞 Negatif</span>
                    <span className="text-sm font-medium text-red-600">15%</span>
                  </div>
                  <Progress value={15} className="h-3" />
                  <div className="bg-green-50 p-3 rounded-lg mt-4">
                    <div className="text-sm text-green-800 font-medium">💡 AI Önerisi</div>
                    <div className="text-xs text-green-600">Pozitif yorumlarınızı pazarlamada kullanın!</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <span>Departman Analizi</span>
                </CardTitle>
                <CardDescription>Hangi departmanınız daha iyi performans gösteriyor?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { dept: "👥 Personel", score: 90, color: "bg-green-500" },
                    { dept: "🧹 Temizlik", score: 85, color: "bg-blue-500" },
                    { dept: "🍽️ Yemek", score: 70, color: "bg-yellow-500" },
                    { dept: "🛏️ Oda", score: 65, color: "bg-red-500" },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{item.dept}</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={item.score} className="h-2 w-16" />
                        <span className="text-sm font-medium">{item.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg mt-4">
                  <div className="text-sm text-yellow-800 font-medium">⚠️ Dikkat</div>
                  <div className="text-xs text-yellow-600">Oda departmanında iyileştirme gerekli!</div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Activity className="w-5 h-5 text-purple-600" />
                  </div>
                  <span>ROI Analizi</span>
                </CardTitle>
                <CardDescription>Yatırımınızın geri dönüşü ne kadar?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">💰 Gelir Artışı</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      +35%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">📈 Doluluk Oranı</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      +28%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">⭐ Ortalama Puan</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      +1.2
                    </Badge>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg mt-4">
                    <div className="text-sm text-purple-800 font-medium">🎯 Hedef</div>
                    <div className="text-xs text-purple-600">6 ayda %50 gelir artışı mümkün!</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={openDemo}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 text-lg"
            >
              <Eye className="w-5 h-5 mr-2" />🚀 Detaylı Demo İzle - Ücretsiz
            </Button>
            <p className="text-sm text-gray-500 mt-2">Kredi kartı gerektirmez • 2 dakikada kurulum</p>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800">💎 Özel Fiyatlar</Badge>
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Size Özel Paketler</h3>
            <p className="text-xl text-gray-600">İhtiyacınıza uygun paketi seçin, hemen başlayın!</p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6 max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-800 font-medium">
                  ⏰ Sınırlı süre! {timeLeft.days} gün {timeLeft.hours} saat kaldı
                </span>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${pkg.popular ? "scale-105 border-4 border-purple-200" : ""
                  }`}
              >
                {pkg.badge && (
                  <div
                    className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r ${pkg.color} text-white text-sm font-semibold rounded-full shadow-lg`}
                  >
                    {pkg.badge}
                  </div>
                )}
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h4 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h4>
                    <p className="text-gray-600 mb-4">{pkg.subtitle}</p>
                    <div className="mb-4">
                      <div className="text-4xl font-bold text-gray-800">
                        {pkg.price}
                        <span className="text-lg text-gray-500 line-through ml-2">{pkg.originalPrice}</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">veya {pkg.monthlyPrice} 12 ay taksit</div>
                      <Badge className="mt-2 bg-red-100 text-red-800">%{pkg.discount} İndirim</Badge>
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      📊 {pkg.reviews} • 🏨 {pkg.hotels}
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                      <div className="text-green-800 font-medium text-sm">💰 {pkg.savings}</div>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="text-green-500 w-5 h-5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handlePackageSelect(pkg)}
                    className={`w-full py-4 bg-gradient-to-r ${pkg.color} text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105 text-lg`}
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Hemen Başla
                  </Button>
                  <div className="text-center mt-4">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <Shield className="w-4 h-4" />
                      <span>30 gün para iade garantisi</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">🤔 Hangi paket size uygun emin değil misiniz?</p>
            <Button variant="outline" size="lg" className="border-2 border-blue-500 text-blue-500 bg-transparent">
              <Phone className="w-5 h-5 mr-2" />
              Ücretsiz Danışmanlık Al
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800">⚡ Özellikler</Badge>
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Neden Hotalyze?</h3>
            <p className="text-xl text-gray-600">Sektörde öncü teknolojiler ile fark yaratıyoruz</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl hover:bg-blue-50 transition-colors group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Shield className="text-blue-600 w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">🛡️ %100 Güvenilir Veri</h4>
              <p className="text-gray-600">
                Tüm verilerimiz gerçek otel yorumlarından elde edilir ve AI ile doğrulanır.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl hover:bg-purple-50 transition-colors group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Zap className="text-purple-600 w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">⚡ Hızlı Teslimat</h4>
              <p className="text-gray-600">Ödeme sonrası 24 saat içinde verileriniz hazır! Hemen başlayın.</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:bg-green-50 transition-colors group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="text-green-600 w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">📈 Kanıtlanmış Sonuçlar</h4>
              <p className="text-gray-600">Müşterilerimiz ortalama %35 gelir artışı yaşıyor. Siz de katılın!</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:bg-yellow-50 transition-colors group">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Crown className="text-yellow-600 w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">👑 Premium Destek</h4>
              <p className="text-gray-600">7/24 Türkçe destek ekibimiz her zaman yanınızda. Hiç yalnız kalmayın.</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:bg-red-50 transition-colors group">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Target className="text-red-600 w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">🎯 Aksiyon Odaklı</h4>
              <p className="text-gray-600">Sadece rapor değil, ne yapmanız gerektiğini de söylüyoruz.</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:bg-indigo-50 transition-colors group">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="text-indigo-600 w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">✨ AI Destekli</h4>
              <p className="text-gray-600">En gelişmiş yapay zeka teknolojileri ile daha akıllı analizler.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-6">🚀 Hemen Başlayın, Farkı Görün!</h3>
          <p className="text-xl mb-8 opacity-90">
            Binlerce otel sahibi zaten Hotalyze kullanıyor. Siz de geride kalmayın!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={openDemo}
              className="px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 rounded-full font-semibold text-lg"
            >
              <PlayCircle className="w-6 h-6 mr-2" />
              Ücretsiz Demo İzle
            </Button>
            <Button
              size="lg"
              onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 rounded-full font-semibold text-lg"
            >
              <Rocket className="w-6 h-6 mr-2" />
              Paketi Seç & Başla
            </Button>
          </div>
          <p className="text-sm opacity-75 mt-4">💳 Kredi kartı gerektirmez • ⚡ 2 dakikada kurulum</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BarChart3 className="text-blue-400 w-6 h-6" />
                <span className="text-xl font-bold">Hotalyze</span>
              </div>
              <p className="text-gray-400 mb-4">
                Otel yorumlarını analiz ederek işletmenizin büyümesine katkıda bulunuyoruz.
              </p>
              <div className="flex space-x-4">
                <Badge className="bg-green-100 text-green-800">⭐ 4.9/5</Badge>
                <Badge className="bg-blue-100 text-blue-800">🏆 #1 Platform</Badge>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">🚀 Hizmetler</h5>
              <ul className="space-y-2 text-gray-400">
                <li>📊 Yorum Analizi</li>
                <li>🏆 Rekabet Analizi</li>
                <li>📈 Trend Raporları</li>
                <li>🔗 API Entegrasyonu</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">💬 Destek</h5>
              <ul className="space-y-2 text-gray-400">
                <li>❓ Yardım Merkezi</li>
                <li>📞 İletişim</li>
                <li>🤔 SSS</li>
                <li>📝 Blog</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">📞 İletişim</h5>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  info@hotalyze.com
                </li>
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +90 555 123 45 67
                </li>
                <li className="flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  İstanbul, Türkiye
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Hotalyze. Tüm hakları saklıdır. 🇹🇷 Türkiye'de tasarlandı.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showPurchaseForm && <PurchaseModal />}
      {showDemo && <DemoModal />}
    </div>
  )
}

export default HotelCommentsApp
