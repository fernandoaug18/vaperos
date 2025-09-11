import { useState } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const VideoCarousel = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState<boolean[]>([false, false]);

  const videos = [
    {
      src: "/videos/video1.mp4",
      title: "Video 1"
    },
    {
      src: "/videos/video2.mp4",
      title: "Video 2"
    }
  ];

  const togglePlay = (index: number) => {
    const video = document.getElementById(`video-${index}`) as HTMLVideoElement;
    if (video) {
      if (isPlaying[index]) {
        video.pause();
      } else {
        video.play();
      }
      const newIsPlaying = [...isPlaying];
      newIsPlaying[index] = !isPlaying[index];
      setIsPlaying(newIsPlaying);
    }
  };

  const handleVideoEnded = (index: number) => {
    const newIsPlaying = [...isPlaying];
    newIsPlaying[index] = false;
    setIsPlaying(newIsPlaying);
  };

  const goToPrevious = () => {
    setCurrentVideo((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentVideo((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="relative">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
            <div className="relative aspect-video md:aspect-video aspect-[9/16] md:aspect-[16/9]">
              <video
                id={`video-${currentVideo}`}
                src={videos[currentVideo].src}
                className="w-full h-full object-cover"
                onEnded={() => handleVideoEnded(currentVideo)}
                controls={false}
                playsInline
                muted
                autoPlay
                loop
              />
              
              {/* Play/Pause Overlay */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  onClick={() => togglePlay(currentVideo)}
                >
                  {isPlaying[currentVideo] ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8" />
                  )}
                </Button>
              </div>

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