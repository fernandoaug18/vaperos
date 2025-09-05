import { useEffect, useState } from "react";

const ArtisticShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const images = [
    {
      src: "/lovable-uploads/4e9a4486-0e1a-4ea3-922f-b5c467210d08.png",
      alt: "Joker Vaping Art"
    },
    {
      src: "/lovable-uploads/3fbf8323-2a09-4f4f-b515-25fb2c730c35.png", 
      alt: "Classical Statue Vaping Art"
    },
    {
      src: "/lovable-uploads/72d66a39-a41b-45e8-b44f-988b078b7523.png",
      alt: "Chaplin Vaping Art"
    },
    {
      src: "/lovable-uploads/f5b3c4a4-2f9d-49b4-bdb2-635d1eaeaab6.png",
      alt: "Einstein Vaping Art"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <style>
        {`
          .smoke-particle {
            position: absolute;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
            border-radius: 50%;
            animation: floatSmoke 15s infinite linear;
          }
          
          .smoke-1 {
            top: 10%;
            left: 10%;
            animation-delay: 0s;
            animation-duration: 20s;
          }
          
          .smoke-2 {
            top: 60%;
            left: 80%;
            animation-delay: 5s;
            animation-duration: 18s;
          }
          
          .smoke-3 {
            top: 30%;
            left: 50%;
            animation-delay: 10s;
            animation-duration: 22s;
          }
          
          .smoke-4 {
            top: 80%;
            left: 20%;
            animation-delay: 15s;
            animation-duration: 16s;
          }
          
          .smoke-5 {
            top: 20%;
            left: 70%;
            animation-delay: 7s;
            animation-duration: 25s;
          }
          
          .smoke-float {
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            animation: floatUp 3s infinite ease-out;
          }
          
          @keyframes floatSmoke {
            0% {
              transform: translateX(-50px) translateY(0px) scale(0.8);
              opacity: 0;
            }
            25% {
              opacity: 0.6;
            }
            50% {
              transform: translateX(50px) translateY(-100px) scale(1.2);
              opacity: 0.8;
            }
            75% {
              opacity: 0.4;
            }
            100% {
              transform: translateX(150px) translateY(-200px) scale(0.6);
              opacity: 0;
            }
          }
          
          @keyframes floatUp {
            0% {
              transform: translateY(0px) scale(1);
              opacity: 0.7;
            }
            100% {
              transform: translateY(-40px) scale(0.3);
              opacity: 0;
            }
          }
        `}
      </style>
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/30 overflow-hidden relative">
        <div className="container mx-auto">
          {/* Animated smoke background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="smoke-particle smoke-1"></div>
            <div className="smoke-particle smoke-2"></div>
            <div className="smoke-particle smoke-3"></div>
            <div className="smoke-particle smoke-4"></div>
            <div className="smoke-particle smoke-5"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              ARTE & VAPOR
            </h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`relative group cursor-pointer transition-all duration-700 transform hover:scale-105 ${
                    activeIndex === index 
                      ? 'scale-110 z-20' 
                      : 'hover:scale-105'
                  }`}
                  style={{
                    transform: activeIndex === index 
                      ? 'scale(1.1) translateY(-10px)' 
                      : undefined,
                  }}
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-2xl transition-all duration-700 ${
                    activeIndex === index
                      ? 'shadow-[0_0_50px_rgba(59,130,246,0.6)] animate-pulse'
                      : 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]'
                  }`} />
                  
                  {/* Floating smoke particles */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 opacity-60">
                    <div className="smoke-float animate-pulse"></div>
                  </div>
                  
                  {/* Image container */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        activeIndex === index
                          ? 'filter brightness-110 contrast-110'
                          : 'filter brightness-90 hover:brightness-100'
                      }`}
                      style={{
                        aspectRatio: '3/4'
                      }}
                    />
                    
                    {/* Overlay gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${
                      activeIndex === index ? 'opacity-30' : 'opacity-60 group-hover:opacity-40'
                    }`} />
                    
                    {/* Neon border effect */}
                    <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-700 ${
                      activeIndex === index
                        ? 'border-cyan-400 shadow-[inset_0_0_20px_rgba(34,211,238,0.3)]'
                        : 'border-transparent group-hover:border-purple-400/50'
                    }`} />
                  </div>

                  {/* Moving vapor effect */}
                  <div className={`absolute top-4 right-4 transition-all duration-700 ${
                    activeIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  }`}>
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ArtisticShowcase;