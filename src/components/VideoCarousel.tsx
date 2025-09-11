import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const VideoCarousel = () => {
  const [currentVideo, setCurrentVideo] = useState(0);

  const videos = [
    {
      src: "/videos/video2.mp4",
      title: "Video 1"
    },
    {
      src: "/videos/video1.mp4", 
      title: "Video 2"
    }
  ];

  useEffect(() => {
    const video = document.getElementById(`video-${currentVideo}`) as HTMLVideoElement;
    if (video) {
      const playVideo = async () => {
        try {
          video.load();
          await new Promise(resolve => {
            video.addEventListener('loadeddata', resolve, { once: true });
          });
          await video.play();
        } catch (error) {
          console.log('Video play failed:', error);
        }
      };
      
      // Small delay to ensure element is rendered
      setTimeout(playVideo, 100);
    }
  }, [currentVideo]);

  const goToPrevious = () => {
    setCurrentVideo((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentVideo((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="relative max-w-xs md:max-w-4xl mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
            <div className="relative aspect-video w-full">
              <video
                key={`video-${currentVideo}-${videos[currentVideo].src}`}
                id={`video-${currentVideo}`}
                className="w-full h-full object-cover"
                controls={false}
                playsInline
                muted
                autoPlay
                loop
                preload="metadata"
                onLoadedData={(e) => {
                  const video = e.target as HTMLVideoElement;
                  video.play().catch(console.log);
                }}
                onError={(e) => console.log('Video error:', e)}
              >
                <source src={videos[currentVideo].src} type="video/mp4" />
                Tu navegador no soporta el elemento video.
              </video>
              
              {/* Navigation Arrows */}
              {videos.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                    onClick={goToPrevious}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                    onClick={goToNext}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}

              {/* Video Indicators */}
              {videos.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {videos.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentVideo ? "bg-white" : "bg-white/50"
                      }`}
                      onClick={() => setCurrentVideo(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default VideoCarousel;