// Banner yapılandırmaları
export interface BannerConfig {
  enabled: boolean;
  message: string;
  link?: string;
  linkText?: string;
  type: 'info' | 'warning' | 'promo' | 'event';
  expireDate?: string; // "YYYY-MM-DD" formatında
}

// Ana banner yapılandırması
export const mainBanner: BannerConfig = {
  enabled: true, // Banner'ın her zaman aktif olduğundan emin olun
  message: "🚀 Yeni Güncelleme: Artık BSC ve Polygon ağlarında düşük ücretlerle deploy yapabilirsiniz!",
  link: "https://twitter.com/1ClickDeployer",
  linkText: "Daha Fazla Bilgi",
  type: "promo",
  expireDate: "2025-01-01" // 2025 yılının başına kadar aktif
};

// Özel durum banner'ları
export const eventBanners: BannerConfig[] = [
  {
    enabled: true,
    message: "🔥 CryptoWeek Etkinliğimiz Başladı: Her deploy işleminiz için 5 token kazanın!",
    link: "https://twitter.com/1ClickDeployer",
    linkText: "Katılın",
    type: "event",
    expireDate: "2024-12-31" // 2024 yılı sonuna kadar
  },
  {
    enabled: false, // Şu an devre dışı
    message: "⚠️ Bakım Duyurusu: Yarın 14:00-16:00 arası kısa bir bakım yapılacaktır",
    type: "warning",
    expireDate: "2024-08-15"
  }
];

// Aktif banner'ı belirle
export const getActiveBanner = (): BannerConfig | null => {
  console.log("getActiveBanner: Banner yapılandırması kontrol ediliyor");
  
  // Önce etkinlik banner'larını kontrol et
  const today = new Date();
  
  for (const banner of eventBanners) {
    if (!banner.enabled) {
      console.log("getActiveBanner: Devre dışı etkinlik banner'ı atlanıyor", banner.message);
      continue;
    }
    
    // Sona erme tarihini kontrol et
    if (banner.expireDate) {
      const expireDate = new Date(banner.expireDate);
      if (today > expireDate) {
        console.log("getActiveBanner: Süresi dolmuş etkinlik banner'ı atlanıyor", banner.message);
        continue; // Süresi dolmuşsa, geç
      }
    }
    
    console.log("getActiveBanner: Aktif etkinlik banner'ı bulundu", banner.message);
    return banner; // İlk aktif etkinlik banner'ını döndür
  }
  
  // Aktif etkinlik yoksa, ana banner'ı kontrol et
  if (mainBanner.enabled) {
    if (mainBanner.expireDate) {
      const expireDate = new Date(mainBanner.expireDate);
      if (today > expireDate) {
        console.log("getActiveBanner: Ana banner'ın süresi dolmuş");
        return null; // Süresi dolmuşsa null döndür
      }
    }
    console.log("getActiveBanner: Ana banner aktif", mainBanner.message);
    return mainBanner;
  }
  
  console.log("getActiveBanner: Aktif banner bulunamadı");
  return null; // Aktif banner yoksa null döndür
}; 