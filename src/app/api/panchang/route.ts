import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        // Extract parameters from the request body
        const { date, coordinates, timezone } = body;
        
        // Format date for the new API (DD/MM/YYYY format)
        const formattedDate = date ? new Date(date).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB');
        
        // Format time (use current time if not provided)
        const time = body.time || '10:00';
        
        // Extract coordinates
        const lat = coordinates?.latitude || 28.6139;
        const lon = coordinates?.longitude || 77.2090;
        
        // Format timezone
        const tz = timezone || 5.5;
        
        // Build query parameters
        const params = new URLSearchParams({
            date: formattedDate,
            time,
            latitude: lat.toString(),
            longitude: lon.toString(),
            tz: tz.toString(),
            lang: 'en',
        });
        

        
        // Call the new Jyotisham Astro API
        const response = await fetch(`https://api.jyotishamastroapi.com/api/panchang/panchang?${params.toString()}`, {
            method: 'GET',
            headers: {
                'key': process.env.JYOTISHAM_API_KEY || '2a10CCXN9Qp4ScRodYXz8Mg3uZRsJV', // Use environment variable or fallback
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `Panchang API Error: ${response.status}` },
                { status: response.status }
            );
        }

        const result = await response.json();
        
        // Check if the API returned an error
        if (result.status !== 200) {
            return NextResponse.json(
                { error: result.message || 'API returned an error' },
                { status: 500 }
            );
        }
        
        // Extract the response data
        const responseData = result.response;
        
        // Transform the response to match our existing interface
        return NextResponse.json({
            day: responseData.day?.name || 'N/A',
            tithi: responseData.tithi?.name || 'N/A',
            yog: responseData.yoga?.name || responseData.yog?.name || 'N/A',
            nakshatra: responseData.nakshatra?.name || 'N/A',
            karan: responseData.karana?.name || 'N/A',
            sunrise: responseData.advanced_details?.sun_rise || 'N/A',
            sunset: responseData.advanced_details?.sun_set || 'N/A',
        });
    } catch {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
