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

const HotelCommentsApp = () => {
    const [selectedPackage, setSelectedPackage] = useState(null)
    const [showPurchaseForm, setShowPurchaseForm] = useState(false)
    const [showDemo, setShowDemo] = useState(false)
    const [currentTestimonial, setCurrentTestimonial] = useState(0)
    const [activeTab, setActiveTab] = useState("overview")
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

    const openDemo = () => {
        setActiveTab("overview") // Modal her açıldığında overview sekmesinde başlar
        setShowDemo(true)
    }

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
            image: "/placeholder.svg?height=60&width=60&text=MÖ",
            content:
                "Hotalyze sayesinde müşteri memnuniyetimizi %35 artırdık. Artık hangi alanlarda iyileştirme yapmamız gerektiğini tam olarak biliyoruz.",
            rating: 5,
            results: "+35% Müşteri Memnuniyeti",
        },
        {
            name: "Ayşe Demir",
            role: "Pazarlama Direktörü",
            company: "Bodrum Resort & Spa",
            image: "/placeholder.svg?height=60&width=60&text=AD",
            content:
                "Rakip analizi özelliği sayesinde pazardaki konumumuzu net olarak görebiliyoruz. ROI'mız 3 ay içinde %250 arttı.",
            rating: 5,
            results: "+250% ROI Artışı",
        },
        {
            name: "Can Yılmaz",
            role: "İşletme Sahibi",
            company: "Kapadokya Cave Hotel",
            image: "/placeholder.svg?height=60&width=60&text=CY",
            content:
                "Daha önce yorumları tek tek okumak zorundaydık. Şimdi tüm insights'ları dakikalar içinde alıyoruz. Zaman tasarrufu inanılmaz!",
            rating: 5,
            results: "90% Zaman Tasarrufu",
        },
    ]

    const clientLogos = [
        { name: "Hilton", logo: "/placeholder.svg?height=40&width=120&text=HILTON" },
        { name: "Marriott", logo: "/placeholder.svg?height=40&width=120&text=MARRIOTT" },
        { name: "Radisson", logo: "/placeholder.svg?height=40&width=120&text=RADISSON" },
        { name: "Sheraton", logo: "/placeholder.svg?height=40&width=120&text=SHERATON" },
        { name: "Hyatt", logo: "/placeholder.svg?height=40&width=120&text=HYATT" },
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

    // DemoModal bileşeni - activeTab state'i ana bileşende tanımlandı
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
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 rounded-full text-white text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4 mr-2" />
                            🎉 Özel Lansman Fiyatları - Sadece İlk 100 Müşteriye!
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Otel Yorumlarınızı
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent block">
                                AI ile Analiz Edin
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Tüm platformlardan gelen yorumları otomatik analiz ederek müşteri memnuniyetinizi artırın ve
                            gelirinizi %35'e kadar yükseltin
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button
                                onClick={openDemo}
                                size="lg"
                                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                            >
                                <PlayCircle className="w-6 h-6 mr-2" />
                                🚀 Ücretsiz Demo İzle
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl"
                            >
                                <Phone className="w-6 h-6 mr-2" />
                                Hemen Arayın: 0850 123 45 67
                            </Button>
                        </div>

                        {/* Live Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                                    <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                                    <div className="text-2xl md:text-3xl font-bold text-white">{stat.number}</div>
                                    <div className="text-blue-100 text-sm">{stat.label}</div>
                                    <div className="text-green-300 text-xs mt-1">{stat.change} {stat.period}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Client Logos */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            🏨 500+ Otel Zaten Hotalyze Kullanıyor
                        </h2>
                        <p className="text-gray-600">Türkiye'nin önde gelen otel zincirleri bize güveniyor</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
                        {clientLogos.map((client, index) => (
                            <div key={index} className="flex justify-center">
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    className="h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                            💎 Özel Lansman Fiyatları
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            İlk 100 müşterimize özel indirimli fiyatlarla başlayın. 30 gün para iade garantisi ile risk almayın!
                        </p>

                        {/* Countdown Timer */}
                        <div className="inline-flex items-center space-x-4 bg-red-50 border border-red-200 rounded-lg px-6 py-3 mt-6">
                            <Clock className="w-5 h-5 text-red-600" />
                            <span className="text-red-700 font-medium">Özel fiyat bitiyor:</span>
                            <div className="flex space-x-2">
                                {Object.entries(timeLeft).map(([unit, value]) => (
                                    <div key={unit} className="text-center">
                                        <div className="bg-red-600 text-white px-2 py-1 rounded text-sm font-bold min-w-[40px]">
                                            {value.toString().padStart(2, '0')}
                                        </div>
                                        <div className="text-xs text-red-700 mt-1">
                                            {unit === 'days' ? 'gün' : unit === 'hours' ? 'saat' : unit === 'minutes' ? 'dk' : 'sn'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {packages.map((pkg, index) => (
                            <Card
                                key={pkg.id}
                                className={`relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${pkg.popular ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
                                    }`}
                            >
                                {pkg.badge && (
                                    <div className={`absolute top-0 right-0 bg-gradient-to-r ${pkg.color} text-white px-4 py-2 text-sm font-bold`}>
                                        {pkg.badge}
                                    </div>
                                )}

                                <CardHeader className="pb-4">
                                    <div className={`w-16 h-16 bg-gradient-to-r ${pkg.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                                        <Crown className="text-white w-8 h-8" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold text-center">{pkg.name}</CardTitle>
                                    <CardDescription className="text-center text-gray-600">{pkg.subtitle}</CardDescription>

                                    <div className="text-center space-y-2">
                                        <div className="flex items-center justify-center space-x-2">
                                            <span className="text-4xl font-bold text-gray-800">{pkg.price}</span>
                                            <div className="text-left">
                                                <div className="text-sm text-gray-500 line-through">{pkg.originalPrice}</div>
                                                <Badge className="bg-red-500 text-white">%{pkg.discount} İNDİRİM</Badge>
                                            </div>
                                        </div>
                                        <div className="text-gray-600">veya {pkg.monthlyPrice}</div>
                                        <Badge variant="outline" className="text-green-600 border-green-300">
                                            💰 {pkg.savings}
                                        </Badge>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    <div className="flex justify-center space-x-6 text-center">
                                        <div>
                                            <div className="text-2xl font-bold text-blue-600">{pkg.reviews}</div>
                                            <div className="text-sm text-gray-500">Yorum Kapasitesi</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-purple-600">{pkg.hotels}</div>
                                            <div className="text-sm text-gray-500">Otel Sayısı</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {pkg.features.map((feature, i) => (
                                            <div key={i} className="flex items-center space-x-3">
                                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                <span className="text-gray-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Button
                                        onClick={() => handlePackageSelect(pkg)}
                                        className={`w-full py-4 text-lg font-semibold bg-gradient-to-r ${pkg.color} hover:opacity-90 transform hover:scale-105 transition-all duration-200`}
                                    >
                                        <Rocket className="w-5 h-5 mr-2" />
                                        Hemen Başla
                                    </Button>

                                    <div className="text-center">
                                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                                            <Shield className="w-4 h-4" />
                                            <span>30 gün para iade garantisi</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <div className="inline-flex items-center space-x-2 text-gray-600">
                            <Phone className="w-5 h-5" />
                            <span>Özel paket mi istiyorsunuz? </span>
                            <Button variant="link" className="text-blue-600 font-semibold p-0">
                                Hemen arayın: 0850 123 45 67
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                            🌟 Müşterilerimiz Ne Diyor?
                        </h2>
                        <p className="text-xl text-gray-600">Gerçek sonuçlar, gerçek müşterilerden</p>
                    </div>

                    <div className="relative">
                        <Card className="max-w-4xl mx-auto overflow-hidden shadow-2xl">
                            <CardContent className="p-0">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
                                    <div className="flex items-center space-x-4 mb-6">
                                        <Avatar className="w-16 h-16">
                                            <AvatarImage src={testimonials[currentTestimonial]?.image} />
                                            <AvatarFallback className="bg-white text-blue-600 text-lg font-bold">
                                                {testimonials[currentTestimonial]?.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="text-xl font-bold">{testimonials[currentTestimonial]?.name}</h3>
                                            <p className="text-blue-100">{testimonials[currentTestimonial]?.role}</p>
                                            <p className="text-blue-200 text-sm">{testimonials[currentTestimonial]?.company}</p>
                                        </div>
                                        <div className="ml-auto">
                                            <Badge className="bg-green-500 text-white text-lg px-3 py-1">
                                                {testimonials[currentTestimonial]?.results}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="flex mb-4">
                                        {[...Array(testimonials[currentTestimonial]?.rating || 5)].map((_, i) => (
                                            <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                                        ))}
                                    </div>

                                    <blockquote className="text-lg leading-relaxed">
                                        "{testimonials[currentTestimonial]?.content}"
                                    </blockquote>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Testimonial Indicators */}
                        <div className="flex justify-center space-x-2 mt-8">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTestimonial(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        🚀 Hemen Başlayın, Farkı Hissedin!
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        30 saniyede kayıt olun, 5 dakikada ilk analizinizi görün
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={openDemo}
                            size="lg"
                            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl"
                        >
                            <PlayCircle className="w-6 h-6 mr-2" />
                            Ücretsiz Demo
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl"
                        >
                            <Mail className="w-6 h-6 mr-2" />
                            info@hotalyze.com
                        </Button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showPurchaseForm && <PurchaseModal />}
            {showDemo && <DemoModal />}
        </div>
    )
}

export default HotelCommentsApp