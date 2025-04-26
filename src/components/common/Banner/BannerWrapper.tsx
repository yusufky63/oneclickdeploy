"use client";

import React, { useEffect, useState } from 'react';
import SimpleBanner from './SimpleBanner';

export default function BannerWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <SimpleBanner />;
} 