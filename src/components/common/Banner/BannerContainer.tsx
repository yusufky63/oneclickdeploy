"use client";

import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Banner'ı dinamik olarak yükle - önbelleğe alınmasını ve erken yüklenmesini sağla
const AnnouncementBanner = dynamic(
  () => import('@/components/common/Banner/AnnouncementBanner'),
  { 
    ssr: false,
    loading: () => <div className="w-full h-8 bg-indigo-900/50 animate-pulse" />
  }
);

// Banner'ı şimdi ön yükle
if (typeof window !== 'undefined') {
  import('@/components/common/Banner/AnnouncementBanner');
}

export default function BannerContainer() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    console.log("BannerContainer: Client-side render başladı");
    
    // Banner durumunu sıfırla - geliştirme sırasında banner'ın tekrar görünmesi için
    try {
      localStorage.removeItem('announcementBannerState');
      console.log("BannerContainer: Banner durumu localStorage'dan temizlendi");
    } catch (e) {
      console.error("BannerContainer: localStorage temizleme hatası", e);
    }
    
    setIsClient(true);
  }, []);

  // Render bilgisini konsola yaz
  useEffect(() => {
    if (isClient) {
      console.log("BannerContainer: Banner yükleniyor, isClient =", isClient);
    }
  }, [isClient]);

  if (!isClient) {
    console.log("BannerContainer: Henüz client-side render olmadı, banner gösterilmiyor");
    return null;
  }

  return (
    <Suspense fallback={null}>
      <AnnouncementBanner />
    </Suspense>
  );
} 