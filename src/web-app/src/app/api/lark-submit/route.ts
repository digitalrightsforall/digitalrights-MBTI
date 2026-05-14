import { NextRequest, NextResponse } from 'next/server';

const LARK_WEBHOOK_URL = process.env.NEXT_PUBLIC_LARK_WEBHOOK_URL || '';

async function getLocation(ip: string) {
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?lang=zh-CN`);
    const data = await res.json();
    if (data.status === 'success') {
      return `${data.country} ${data.regionName} ${data.city}`;
    }
    return '未知地点';
  } catch (err) {
    console.error('get location error:', err);
    return '未知地点';
  }
}

export async function POST(req: NextRequest) {
  if (!LARK_WEBHOOK_URL) {
    return NextResponse.json({ error: 'LARK_WEBHOOK_URL not configured' }, { status: 500 });
  }

  try {
    const data = await req.json();
    
    // 获取 IP 地址
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : (req as any).ip || '127.0.0.1';
    
    // 获取地理位置
    const location = await getLocation(ip);
    
    // 注入地理位置信息
    const payload = {
      ...data,
      '所在地': location,
      'IP': ip
    };

    const res = await fetch(LARK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    return NextResponse.json(result);
  } catch (err) {
    console.error('lark webhook error:', err);
    return NextResponse.json({ error: 'webhook request failed' }, { status: 502 });
  }
}
