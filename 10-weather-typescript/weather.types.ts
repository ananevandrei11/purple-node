export interface WeatherCondition {
  text: string;
  code: number;
}

export interface WeatherLocation {
  name: string;
  country: string;
}

export interface WeatherCurrent {
  temp_c: number;
  feelslike_c: number;
  humidity: number;
  wind_kph: number;
  wind_dir: string;
  pressure_mb: number;
  is_day: number; // 1 — day, 0 — night
  condition: WeatherCondition;
}

export interface Weather {
  location: WeatherLocation;
  current: WeatherCurrent;
}

export interface WeatherApiError {
  error: { code: number; message: string };
}

export type WeatherApiResponse = Weather | WeatherApiError;
