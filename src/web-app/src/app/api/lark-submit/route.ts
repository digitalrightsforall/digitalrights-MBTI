import { NextRequest, NextResponse } from 'next/server';

const LARK_WEBHOOK_URL = process.env.NEXT_PUBLIC_LARK_WEBHOOK_URL || '';

export async function POST(req: NextRequest) {
  if (!LARK_WEBHOOK_URL) {
    return NextResponse.json({ error: 'LARK_WEBHOOK_URL not configured' }, { status: 500 });
  }

  try {
    const data = await req.json();
    const res = await fetch(LARK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return NextResponse.json(result);
  } catch (err) {
    console.error('lark webhook error:', err);
    return NextResponse.json({ error: 'webhook request failed' }, { status: 502 });
  }
}
