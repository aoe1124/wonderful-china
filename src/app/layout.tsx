'use client';

import './globals.css';
import { useEffect, useState } from 'react';
import { Providers } from './providers';

interface SystemSettings {
  siteName: string;
  siteDescription: string;
  siteLogo: string;
  favicon: string;
  metaKeywords: string;
  metaDescription: string;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<SystemSettings>({
    siteName: '美丽中国',
    siteDescription: '发现中国之美，探索旅游胜地',
    siteLogo: '',
    favicon: '',
    metaKeywords: '中国旅游,景点导航,旅游攻略',
    metaDescription: '发现中国之美，探索旅游胜地。为您提供最全面的中国旅游景点导航。',
  });

  useEffect(() => {
    // 从localStorage加载设置
    const savedSettings = localStorage.getItem('wonderchina_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  return (
    <html lang="zh">
      <head>
        <title>{settings.siteName}</title>
        <meta name="description" content={settings.metaDescription} />
        <meta name="keywords" content={settings.metaKeywords} />
        {settings.favicon && <link rel="icon" href={settings.favicon} />}
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
