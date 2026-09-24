import { useState } from 'react';
import { BookOpen, MapPin } from 'lucide-react';

const OWM_KEY = import.meta.env.VITE_OWM_API_KEY;
const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct';

const COUNTRIES = [
  { code: 'IN', name: 'India' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'NO', name: 'Norway' },
  { code: 'JP', name: 'Japan' },
  { code: 'SG', name: 'Singapore' },
  { code: 'NP', name: 'Nepal' },
];

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', country: 'IN', city: '' });
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.email.trim() || !form.password || !form.city.trim()) {
      setError('Please fill in every field.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    let city = form.city.trim();

    
    if (OWM_KEY) {
      setChecking(true);
      try {
        const res = await fetch(
          `${GEO_URL}?q=${encodeURIComponent(`${city},${form.country}`)}&limit=1&appid=${OWM_KEY}`
        );
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) {
          setError(`We couldn't find "${city}" in that country. Check the spelling.`);
          setChecking(false);
          return;
        }
        city = data[0].name; // use the proper spelling
      } catch {
        
      }
      setChecking(false);
    }

    onLogin({
      name: form.name.trim(),
      email: form.email.trim(),
      country: form.country,
      city,
    });
  };

  return (
    <div className="login-page">
      <style>{loginStyles}</style>
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-brand">
          <BookOpen size={22} />
          <span>Bookworm</span>
        </div>
        <h1 className="login-title">
          Welcome, <em>reader.</em>
        </h1>
        <p className="login-lede">Sign in to find your next favourite book.</p>

        <label>
          Name
          <input value={form.name} onChange={update('name')} placeholder="Your name" />
        </label>
        <label>
          Email
          <input type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" />
        </label>
        <label>
          Password
          <input type="password" value={form.password} onChange={update('password')} placeholder="••••••" />
        </label>

        <div className="login-row">
          <label>
            Country
            <select value={form.country} onChange={update('country')}>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </select>
          </label>
          <label>
            City
            <div className="login-city">
              <MapPin size={14} />
              <input value={form.city} onChange={update('city')} placeholder="e.g. Ujjain" />
            </div>
          </label>
        </div>

        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="login-btn" disabled={checking}>
          {checking ? 'Checking city…' : 'Enter the library →'}
        </button>
      </form>
    </div>
  );
}

const loginStyles = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..900&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=DM+Mono:wght@400;500&display=swap');

.login-page {
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  padding: 32px 16px;
  background:
    radial-gradient(circle at 30% 20%, rgba(201,169,97,0.18), transparent 55%),
    radial-gradient(circle at 75% 80%, rgba(107,39,55,0.10), transparent 55%),
    #f5ebd8;
  font-family: 'EB Garamond', Georgia, serif;
  color: #2c1810;
}
.login-card {
  width: 100%; max-width: 440px;
  background: rgba(255,250,240,0.7);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(44,24,16,0.12);
  border-radius: 20px;
  padding: 40px 36px;
  box-shadow: 0 20px 60px rgba(44,24,16,0.12);
  display: flex; flex-direction: column; gap: 16px;
}
.login-brand {
  display: flex; align-items: center; gap: 8px;
  font-family: 'Fraunces', serif; font-weight: 600; font-size: 1.2rem;
}
.login-title {
  font-family: 'Fraunces', serif; font-weight: 400;
  font-size: 2.4rem; line-height: 1.1; letter-spacing: -0.02em;
}
.login-title em { color: #6b2737; font-style: italic; }
.login-lede { font-style: italic; color: #4a3520; margin-top: -8px; }
.login-card label {
  display: flex; flex-direction: column; gap: 6px;
  font-family: 'DM Mono', monospace; font-size: 0.7rem;
  text-transform: uppercase; letter-spacing: 0.12em; color: #4a3520;
}
.login-card input, .login-card select {
  font-family: 'EB Garamond', serif; font-size: 1.05rem;
  padding: 10px 14px;
  border: 1px solid rgba(44,24,16,0.2);
  border-radius: 10px;
  background: rgba(255,255,255,0.6);
  color: #2c1810;
  outline: none;
  text-transform: none; letter-spacing: normal;
  width: 100%;
}
.login-card input:focus, .login-card select:focus { border-color: #6b2737; }
.login-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.login-city { position: relative; }
.login-city svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #8b6f47; }
.login-city input { padding-left: 32px; }
.login-error { color: #8b1a1a; font-size: 0.95rem; }
.login-btn {
  margin-top: 8px;
  padding: 14px 20px;
  border: none; border-radius: 999px;
  background: #2c1810; color: #f5ebd8;
  font-family: 'DM Mono', monospace; font-size: 0.78rem;
  text-transform: uppercase; letter-spacing: 0.16em;
  cursor: pointer; transition: background 0.2s;
}
.login-btn:hover { background: #6b2737; }
.login-btn:disabled { opacity: 0.6; cursor: wait; }
@media (max-width: 480px) {
  .login-card { padding: 32px 22px; }
  .login-row { grid-template-columns: 1fr; }
}
`;
