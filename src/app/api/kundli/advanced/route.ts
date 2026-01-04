import { NextRequest, NextResponse } from 'next/server';

// Prokerala API credentials
const CLIENT_ID = 'a4581ed1-c211-43a5-b728-0f23cb3d7742';
const CLIENT_SECRET = 'EewrPGVYpB0t4rvOvptpE1mY7wTTSqBhSPUxDp5W';

// Cache for access token
let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
    if (cachedToken && cachedToken.expiresAt > Date.now()) {
        return cachedToken.token;
    }

    try {
        const response = await fetch('https://api.prokerala.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        });

        if (!response.ok) {
            throw new Error(`Token generation failed: ${response.status}`);
        }

        const data = await response.json();
        cachedToken = {
            token: data.access_token,
            expiresAt: Date.now() + 55 * 60 * 1000,
        };

        return data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { datetime, lat, lon, language = 'en', yearLength = 1 } = body;

        const accessToken = await getAccessToken();
        const coordinates = `${lat},${lon}`;

        const apiUrl = new URL('https://api.prokerala.com/v2/astrology/kundli/advanced');
        apiUrl.searchParams.append('ayanamsa', '1');
        apiUrl.searchParams.append('coordinates', coordinates);
        apiUrl.searchParams.append('datetime', datetime);
        apiUrl.searchParams.append('la', language);
        apiUrl.searchParams.append('year_length', yearLength.toString());

        const response = await fetch(apiUrl.toString(), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Advanced Kundli API Error:', errorText);
            return NextResponse.json(
                { error: `API Error: ${response.status}` },
                { status: response.status }
            );
        }

        const result = await response.json();
        return NextResponse.json(result.data || result);
    } catch (error) {
        console.error('Error in Advanced Kundli API route:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
