"use client";

import { useState, useEffect } from 'react';
import { X, ExternalLink, Bell, AlertTriangle, Gift, Calendar } from 'lucide-react';
import { BannerConfig, getActiveBanner } from '@/config/bannerConfig';

interface AnnouncementBannerProps {
  message?: string;
  link?: string;
  linkText?: string;
  icon?: JSX.Element;
  type?: 'info' | 'warning' | 'promo' | 'event';
  configOverride?: BannerConfig;
}

const AnnouncementBanner = (props: AnnouncementBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bannerConfig, setBannerConfig] = useState<BannerConfig | null>(null);

  // Banner'ın görünür olup olmadığını localStorage'dan kontrol et
  // ve aktif banner yapılandırmasını al
  useEffect(() => {
    console.log("AnnouncementBanner: useEffect çalıştı");
    
    const bannerState = localStorage.getItem('announcementBannerState');
    if (bannerState) {
      try {
        const { hidden, timestamp } = JSON.parse(bannerState);
        // 24 saat sonra banner'ı tekrar göster
        const dayInMs = 24 * 60 * 60 * 1000;
        const shouldShowAgain = Date.now() - timestamp > dayInMs;
        console.log("AnnouncementBanner: LocalStorage durumu -", { hidden, timestamp, shouldShowAgain });
        setIsVisible(!hidden || shouldShowAgain);
      } catch (e) {
        console.error("AnnouncementBanner: LocalStorage parse hatası", e);
        setIsVisible(true);
      }
    } else {
      console.log("AnnouncementBanner: LocalStorage'da kayıt yok, banner görünür olmalı");
    }

    // Eğer elle verilen bir config varsa onu kullan, yoksa yapılandırma dosyasından al
    const config = props.configOverride || getActiveBanner();
    console.log("AnnouncementBanner: Banner yapılandırması", config);
    setBannerConfig(config);
    
    setIsLoaded(true);
  }, [props.configOverride]);

  const closeBanner = () => {
    setIsVisible(false);
    localStorage.setItem('announcementBannerState', JSON.stringify({
      hidden: true,
      timestamp: Date.now()
    }));
  };

  // Banner görünür değilse veya aktif bir yapılandırma yoksa null döndür
  if (!isLoaded || !isVisible || !bannerConfig) {
    console.log("AnnouncementBanner: Banner gösterilmiyor", { isLoaded, isVisible, hasConfig: !!bannerConfig });
    return null;
  }

  // Banner özellikleri için prop'ları veya yapılandırmadan gelen değerleri kullan
  const { 
    message = bannerConfig.message,
    link = bannerConfig.link,
    linkText = bannerConfig.linkText,
    type = bannerConfig.type
  } = props;

  // Banner arka plan rengini tipine göre belirle
  const getBgClass = () => {
    switch (type) {
      case 'warning':
        return 'from-amber-900/50 to-amber-800/30 border-amber-500/50';
      case 'promo':
        return 'from-purple-900/50 to-purple-800/30 border-purple-500/50';
      case 'event':
        return 'from-emerald-900/50 to-emerald-800/30 border-emerald-500/50';
      case 'info':
      default:
        return 'from-indigo-900/50 to-indigo-800/30 border-indigo-500/50';
    }
  };

  // Türe göre ikon seç
  const getIcon = () => {
    if (props.icon) return props.icon;
    
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-300" />;
      case 'promo':
        return <Gift className="w-4 h-4 text-purple-300" />;
      case 'event':
        return <Calendar className="w-4 h-4 text-emerald-300" />;
      case 'info':
      default:
        return <Bell className="w-4 h-4 text-indigo-300" />;
    }
  };

  return (
    <div className={`w-full bg-gradient-to-r ${getBgClass()} backdrop-blur-md border-b py-2 px-4 transition-all z-50 sticky top-0`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm">
          {getIcon()}
          <span className="text-gray-200 font-medium">{message}</span>
          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-indigo-300 hover:text-white transition-colors underline text-xs font-medium"
            >
              <span>{linkText}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
        <button 
          onClick={closeBanner}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Close banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBanner; 