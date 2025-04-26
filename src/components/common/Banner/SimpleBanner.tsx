"use client";

import { useState, useEffect } from 'react';
import { X, ExternalLink, Bell } from 'lucide-react';

// Dönüşümlü banner mesajları - Daha kısa ve öz mobil mesajlar
const bannerMessages = [
  {
    icon: <Bell className="w-4 h-4 text-indigo-300" />,
    message: "🎉 Moand token giveaway on Monad network! Don't miss your chance.",
    mobileMessage: "🎉 Moand giveaway on Monad!",
    link: "https://twitter.com/1ClickDeployer",
    linkText: "See Details"
  },
  // {
  //   icon: <Gift className="w-4 h-4 text-indigo-300" />,
  //   message: "✨ Limited Time Offer: Deploy 3 contracts and get your 4th deployment free!",
  //   mobileMessage: "✨ Deploy 3, get 1 free!",
  //   link: "https://twitter.com/1ClickDeployer",
  //   linkText: "See Details"
  // },
  // {
  //   icon: <Zap className="w-4 h-4 text-indigo-300" />,
  //   message: "📱 Follow us on Twitter for the latest updates and special offers!",
  //   mobileMessage: "📱 Follow us for updates!",
  //   link: "https://twitter.com/1ClickDeployer",
  //   linkText: "Follow Now"
  // }
];

export default function SimpleBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Dönüşümlü mesaj değişimi için zamanlayıcı
  useEffect(() => {
    if (!isVisible) return;
    
    const intervalId = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerMessages.length);
        setIsTransitioning(false);
      }, 500); // Geçiş animasyonu süresi
    }, 5000); // Her 5 saniyede bir mesaj değiştir
    
    return () => clearInterval(intervalId);
  }, [isVisible]);
  
  // Her zaman görünür olması için localStorage desteğini kaldırdık
  if (!isVisible) return null;
  
  const currentMessage = bannerMessages[currentIndex];
  
  return (
    <div className="w-full backdrop-blur-md bg-black/5 border-b border-indigo-500/10 py-2 sm:py-3 px-3 z-[9999] fixed top-0 left-0 right-0 shadow-sm">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center relative">
        {/* Mobil için dikey yerleşim, masaüstü için yatay yerleşim */}
        <div className="flex flex-col sm:flex-row items-center sm:space-x-3 text-xs sm:text-sm relative w-full sm:w-auto text-center sm:text-left">
          {/* İkon - sadece masaüstünde göster */}
          <span className="bg-indigo-500/10 p-1.5 rounded-full hidden sm:block mb-1">
            {currentMessage.icon}
          </span>
          
          {/* Ana mesaj - kesilmeyi önlemek için max-w-full */}
          <span 
            className={`text-white font-medium transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'} max-w-full`}
          >
            <span className="hidden sm:inline">{currentMessage.message}</span>
            <span className="sm:hidden">{currentMessage.mobileMessage}</span>
          </span>
          
          {/* Link - mobilde en altta, masaüstünde sağda */}
          <a 
            href={currentMessage.link}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 hover:text-white transition-all px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium mt-1.5 sm:mt-0 sm:ml-2 w-24 sm:w-auto"
          >
            <span>{currentMessage.linkText}</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
        
        {/* Indicator dots */}
        <div className="flex space-x-1.5 mt-1.5 sm:mt-2">
          {bannerMessages.map((_, index) => (
            <div 
              key={index} 
              className={`h-0.5 sm:h-1 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-3 sm:w-4 bg-indigo-400' 
                  : 'w-1 sm:w-1.5 bg-indigo-400/30'
              }`}
            />
          ))}
        </div>
        
        {/* Kapatma butonu */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-0 top-1 text-gray-400 hover:text-white transition-colors p-1 hover:bg-black/10 rounded-full"
          aria-label="Close banner"
        >
          <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>
      </div>
    </div>
  );
} 