"use client";
import React, { useState, useEffect } from "react";
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  Wind,
  Eye,
  Droplets,
  Thermometer,
} from "lucide-react";

type WeatherData = {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  feelsLike: number;
  description: string;
  icon: string; // e.g., 'sunny', 'cloudy', 'partly-cloudy', 'rainy', 'snowy'
};

export default function SumedangWeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock weather data for Sumedang (since we can't use real API in this environment)
  const mockWeatherData: WeatherData = React.useMemo(
    () => ({
      location: "Sumedang, West Java",
      temperature: 26,
      condition: "Partly Cloudy",
      humidity: 78,
      windSpeed: 12,
      visibility: 8,
      feelsLike: 28,
      description: "Partly cloudy with a chance of light rain",
      icon: "partly-cloudy",
    }),
    []
  );

  useEffect(() => {
    // Simulate API call
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setWeather(mockWeatherData);
      } catch (err) {
        setError("Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [mockWeatherData]);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="w-12 h-12 text-yellow-500" />;
      case "cloudy":
        return <Cloud className="w-12 h-12 text-gray-500" />;
      case "partly-cloudy":
        return <Cloud className="w-12 h-12 text-blue-400" />;
      case "rainy":
        return <CloudRain className="w-12 h-12 text-blue-600" />;
      case "snowy":
        return <CloudSnow className="w-12 h-12 text-blue-200" />;
      default:
        return <Sun className="w-12 h-12 text-yellow-500" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-blue-300 rounded w-32 mb-4"></div>
          <div className="h-8 bg-blue-300 rounded w-24 mb-2"></div>
          <div className="h-4 bg-blue-300 rounded w-40"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-3 rounded-xl">
        <p className="text-sm">No weather data available</p>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-wrap items-center justify-between gap-6">
        {/* Header */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">Cuaca Hari Ini</h3>
          <p className="text-blue-100 text-sm">{weather.location}</p>
          <p className="text-xs text-blue-100 mt-2">
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Main Weather Info */}
        <div className="flex items-center space-x-4">
          {getWeatherIcon(weather.icon)}
          <div>
            <div className="text-4xl font-bold">{weather.temperature}°C</div>
            <p className="text-blue-100 text-sm">{weather.condition}</p>
          </div>
        </div>

        {/* Weather Details */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Thermometer className="w-4 h-4 text-blue-200" />
            <div>
              <p className="text-xs text-blue-200">Terasa Seperti</p>
              <p className="text-sm font-medium">{weather.feelsLike}°C</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-blue-200" />
            <div>
              <p className="text-xs text-blue-200">Kelembaban</p>
              <p className="text-sm font-medium">{weather.humidity}%</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Wind className="w-4 h-4 text-blue-200" />
            <div>
              <p className="text-xs text-blue-200">Angin</p>
              <p className="text-sm font-medium">{weather.windSpeed} km/h</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-blue-200" />
            <div>
              <p className="text-xs text-blue-200">Jarak Pandang</p>
              <p className="text-sm font-medium">{weather.visibility} km</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="flex-1 border-t border-blue-400 pt-4 text-sm text-blue-100">
          {weather.description}
        </div>
      </div>

      {/* Update Time */}
      <div className="mt-3 text-xs text-blue-200 text-center">
        Diperbarui: {new Date().toLocaleTimeString("id-ID")}
      </div>
    </div>
  );
}
