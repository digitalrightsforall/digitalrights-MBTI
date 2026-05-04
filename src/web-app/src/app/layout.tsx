import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "数字灵魂 MBTI - 普通人的数字权利",
  description: "2026 AI 时代数字公民人格评测系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      {/* 增加 suppressHydrationWarning 修复浏览器插件引起的报错 */}
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
