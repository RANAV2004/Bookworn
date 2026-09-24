import { useState, useEffect } from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';


const OWM_KEY = import.meta.env.VITE_OWM_API_KEY;
const CLOUDY_URL = import.meta.env.VITE_CLOUDY_URL || 'https://cloudy-1hhb.onrender.com/';
const REFRESH_MS = 10 * 60 * 1000; // refresh weather every 10 minutes

const ICONS = {
  Clear: '☀️', Clouds: '☁️', Rain: '🌧️', Drizzle: '🌦️', Thunderstorm: '⛈️',
  Snow: '❄️', Mist: '🌫️', Fog: '🌫️', Haze: '🌫️', Smoke: '🌫️', Dust: '🌫️',
};

export default function WeatherCard({ city, country }) {
  const [now, setNow] = useState(() => Date.now());
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

 
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!city || !OWM_KEY) return;
    const load = async () => {
      try {
        const q = encodeURIComponent(country ? `${city},${country}` : city);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${OWM_KEY}&units=metric`
        );
        if (!res.ok) throw new Error();
        setWeather(await res.json());
        setError('');
      } catch {
        setError('Weather unavailable');
      }
    };
    load();
    const t = setInterval(load, REFRESH_MS);
    return () => clearInterval(t);
  }, [city, country]);

 
  const date = weather
    ? new Date(now + weather.timezone * 1000)
    : new Date(now - new Date().getTimezoneOffset() * 60000);
  const time = date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' });
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const day = date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', timeZone: 'UTC' });

  const openCloudy = () => {
    const q = country ? `${city},${country}` : city;
    window.open(`${CLOUDY_URL}?city=${encodeURIComponent(q)}`, '_blank', 'noopener');
  };

  const main = weather?.weather?.[0]?.main;
  const problem = OWM_KEY ? error : 'Add your API key';

  return (
    <button className="wx-card" onClick={openCloudy} title={`Open ${city} in Cloudy`}>
      <div className="wx-top">
        <span className="wx-brand">Cloudy</span>
        <ArrowUpRight size={14} className="wx-arrow" />
      </div>

      <div className="wx-time">
        {time}<span className="wx-sec">:{seconds}</span>
      </div>
      <div className="wx-day">{day}</div>

      <div className="wx-divider" />

      <div className="wx-temp-row">
        <span className="wx-icon">{ICONS[main] || '🌤️'}</span>
        <span className="wx-temp">
          {weather ? `${Math.round(weather.main.temp)}°` : problem ? '--' : '…'}
        </span>
      </div>
      <div className="wx-desc">
        {weather ? weather.weather[0].description : problem || 'Loading weather'}
      </div>
      <div className="wx-city">
        <MapPin size={12} /> {weather?.name || city}
      </div>
    </button>
  );
}

export const weatherCardStyles = `
.wx-card {
  position: absolute;
  right: 28px;
  top: 28px;
  z-index: 2;
  width: 220px;
  aspect-ratio: 1 / 1;
  padding: 20px;
  display: flex; flex-direction: column; justify-content: space-between;
  text-align: left;
  font: inherit; color: var(--ink);
  background: rgba(255, 250, 240, 0.35);
  backdrop-filter: blur(16px) saturate(140%);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 22px;
  box-shadow: 0 12px 40px rgba(44, 24, 16, 0.10), inset 0 1px 0 rgba(255,255,255,0.6);
  cursor: pointer;
  transition: transform 0.25s, box-shadow 0.25s, background 0.25s;
}
.wx-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 250, 240, 0.5);
  box-shadow: 0 18px 50px rgba(44, 24, 16, 0.16), inset 0 1px 0 rgba(255,255,255,0.6);
}
.wx-top { display: flex; justify-content: space-between; align-items: center; }
.wx-brand {
  font-family: 'DM Mono', monospace; font-size: 0.65rem;
  text-transform: uppercase; letter-spacing: 0.2em; color: var(--sepia);
}
.wx-arrow { color: var(--sepia); transition: transform 0.2s; }
.wx-card:hover .wx-arrow { transform: translate(2px, -2px); color: var(--wine); }
.wx-time {
  font-family: 'Fraunces', serif; font-size: 1.9rem; font-weight: 400;
  letter-spacing: -0.02em; line-height: 1;
}
.wx-sec { font-size: 0.9rem; color: var(--sepia); }
.wx-day { font-style: italic; font-size: 0.9rem; color: var(--ink-soft); margin-top: -6px; }
.wx-divider { height: 1px; background: rgba(44, 24, 16, 0.12); }
.wx-temp-row { display: flex; align-items: center; gap: 8px; }
.wx-icon { font-size: 1.6rem; line-height: 1; }
.wx-temp { font-family: 'Fraunces', serif; font-size: 2.2rem; line-height: 1; color: var(--wine); }
.wx-desc { text-transform: capitalize; font-size: 0.9rem; color: var(--ink-soft); margin-top: -6px; }
.wx-city {
  display: flex; align-items: center; gap: 4px;
  font-family: 'DM Mono', monospace; font-size: 0.68rem;
  text-transform: uppercase; letter-spacing: 0.14em;
}

/* On smaller screens the card sits under the buttons instead of on the right */
@media (max-width: 900px) {
  .wx-card {
    position: relative; right: auto; top: auto;
    margin: 40px auto 0;
  }
}
`;
