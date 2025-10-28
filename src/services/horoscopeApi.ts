// Horoscope API Service - Using internal Next.js API routes
const BASE_URL = '/api/horoscope';

export interface DailyHoroscopeResponse {
  data: {
    date: string;
    horoscope_data: string;
  };
  status: number;
  success: boolean;
}

export interface WeeklyHoroscopeResponse {
  data: {
    week: string;
    horoscope_data: string;
  };
  status: number;
  success: boolean;
}

export interface MonthlyHoroscopeResponse {
  data: {
    month: string;
    horoscope_data: string;
    standout_days: string;
    challenging_days: string;
  };
  status: number;
  success: boolean;
}

export type ZodiacSign = 
  | 'Aries' 
  | 'Taurus' 
  | 'Gemini' 
  | 'Cancer' 
  | 'Leo' 
  | 'Virgo' 
  | 'Libra' 
  | 'Scorpio' 
  | 'Sagittarius' 
  | 'Capricorn' 
  | 'Aquarius' 
  | 'Pisces';

export type DayOption = 'TODAY' | 'TOMORROW' | 'YESTERDAY' | string;

/**
 * Fetch daily horoscope for a zodiac sign
 * @param sign - Zodiac sign (e.g., 'Aries', 'Taurus', etc.)
 * @param day - Date in format (YYYY-MM-DD) OR "TODAY" OR "TOMORROW" OR "YESTERDAY"
 */
export async function getDailyHoroscope(
  sign: ZodiacSign,
  day: DayOption = 'TODAY'
): Promise<DailyHoroscopeResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/daily?sign=${encodeURIComponent(sign)}&day=${encodeURIComponent(day)}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching daily horoscope:', error);
    throw error;
  }
}

/**
 * Fetch weekly horoscope for a zodiac sign
 * @param sign - Zodiac sign (e.g., 'Aries', 'Taurus', etc.)
 */
export async function getWeeklyHoroscope(
  sign: ZodiacSign
): Promise<WeeklyHoroscopeResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/weekly?sign=${encodeURIComponent(sign)}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weekly horoscope:', error);
    throw error;
  }
}

/**
 * Fetch monthly horoscope for a zodiac sign
 * @param sign - Zodiac sign (e.g., 'Aries', 'Taurus', etc.)
 */
export async function getMonthlyHoroscope(
  sign: ZodiacSign
): Promise<MonthlyHoroscopeResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/monthly?sign=${encodeURIComponent(sign)}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching monthly horoscope:', error);
    throw error;
  }
}

/**
 * Capitalize zodiac sign name for API
 */
export function formatZodiacSignForApi(zodiacId: string): ZodiacSign {
  const formatted = zodiacId.charAt(0).toUpperCase() + zodiacId.slice(1).toLowerCase();
  return formatted as ZodiacSign;
}
