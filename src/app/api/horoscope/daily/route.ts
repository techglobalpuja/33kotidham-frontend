import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://horoscope-app-api.vercel.app/api/v1';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sign = searchParams.get('sign');
    const day = searchParams.get('day') || 'TODAY';

    if (!sign) {
      return NextResponse.json(
        { error: 'Zodiac sign is required' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${BASE_URL}/get-horoscope/daily?sign=${encodeURIComponent(sign)}&day=${encodeURIComponent(day)}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching daily horoscope:', error);
    return NextResponse.json(
      { error: 'Failed to fetch horoscope data' },
      { status: 500 }
    );
  }
}
