"use client"

import { useState } from "react"
import { Play, Star, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface VideoTestimonial {
  id: number
  name: string
  role: string
  company: string
  thumbnail: string
  videoUrl: string
  duration: string
  result: string
  rating: number
  quote: string
}

export function VideoTestimonials() {
  const [selectedVideo, setSelectedVideo] = useState<VideoTestimonial | null>(null)

  const testimonials: VideoTestimonial[] = [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      role: "Genel Müdür",
      company: "Grand Hotel Antalya",
      thumbnail: "/placeholder.svg?height=200&width=300&text=Video+1",
      videoUrl: "#",
      duration: "2:34",
      result: "+45% Gelir Artışı",
      rating: 5,
      quote:
        "HotelComments sayesinde 6 ayda gelirimi %45 artırdım. Müşteri yorumlarını analiz etmek hiç bu kadar kolay olmamıştı!",
    },
    {
      id: 2,
      name: "Elif Demir",
      role: "Pazarlama Direktörü",
      company: "Bodrum Bay Resort",
      thumbnail: "/placeholder.svg?height=200&width=300&text=Video+2",
      videoUrl: "#",
      duration: "3:12",
      result: "+60% Rezervasyon",
      rating: 5,
      quote:
        "Rakip analizi özelliği sayesinde pazardaki konumumuzu tam olarak görebildik. Rezervasyonlarımız %60 arttı!",
    },
    {
      id: 3,
      name: "Murat Özkan",
      role: "İşletme Sahibi",
      company: "Kapadokya Cave Suites",
      thumbnail: "/placeholder.svg?height=200&width=300&text=Video+3",
      videoUrl: "#",
      duration: "1:58",
      result: "+8.9 Puan Artışı",
      rating: 5,
      quote:
        "Müşteri memnuniyetimiz 7.2'den 8.9'a çıktı. Hangi alanlarda iyileştirme yapmamız gerektiğini net olarak gördük.",
    },
  ]

  const VideoModal = ({ video }: { video: VideoTestimonial }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{video.name}</h3>
              <p className="text-gray-600">
                {video.role}, {video.company}
              </p>
            </div>
            <Button variant="outline" onClick={() => setSelectedVideo(null)}>
              Kapat
            </Button>
          </div>

          <div className="aspect-video bg-gray-900 rounded-lg mb-6 flex items-center justify-center">
            <div className="text-white text-center">
              <Play className="w-16 h-16 mx-auto mb-4" />
              <p>Video Player Placeholder</p>
              <p className="text-sm opacity-75">Gerçek uygulamada video oynatıcı burada olacak</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">📊 Elde Edilen Sonuçlar</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Gelir Artışı</span>
                    <Badge className="bg-green-100 text-green-800">+45%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Müşteri Memnuniyeti</span>
                    <Badge className="bg-blue-100 text-blue-800">+1.7 puan</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Rezervasyon Artışı</span>
                    <Badge className="bg-purple-100 text-purple-800">+32%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">💬 Müşteri Yorumu</h4>
                <div className="flex mb-3">
                  {[...Array(video.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-gray-700 italic">"{video.quote}"</blockquote>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-red-100 text-red-800">🎥 Video Testimonials</Badge>
          <h3 className="text-4xl font-bold text-gray-800 mb-4">Müşterilerimiz Anlatıyor</h3>
          <p className="text-xl text-gray-600">Gerçek müşterilerimizin gerçek başarı hikayelerini izleyin</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={testimonial.thumbnail || "/placeholder.svg"}
                  alt={`${testimonial.name} testimonial`}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-t-lg">
                  <Button
                    onClick={() => setSelectedVideo(testimonial)}
                    className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 rounded-full w-16 h-16"
                  >
                    <Play className="w-8 h-8" />
                  </Button>
                </div>
                <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                  {testimonial.duration}
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-green-500 text-white">{testimonial.result}</Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar>
                    <AvatarImage
                      src={`/placeholder.svg?height=40&width=40&text=${testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}`}
                    />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <blockquote className="text-gray-700 text-sm italic line-clamp-3">"{testimonial.quote}"</blockquote>

                <Button
                  onClick={() => setSelectedVideo(testimonial)}
                  className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Videoyu İzle
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">🎯 Siz de başarı hikayenizin kahramanı olmak ister misiniz?</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Hemen Başlayın
          </Button>
        </div>
      </div>

      {selectedVideo && <VideoModal video={selectedVideo} />}
    </section>
  )
}
