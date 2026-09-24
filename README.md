# 📚 Bookworm — Find Your Next Favourite Book

A cozy book recommendation website with an AI librarian, powered by **IBM watsonx Assistant**, plus a live weather card from my other project, **[Cloudy](https://github.com/RANAV2004/CLOUDY)**.

**Live demo:** _add your Render link here_

---

## ✨ Features

- **AI Librarian chatbot:** an IBM watsonx Assistant that recommends books from your taste, mood or a book you loved.
- **Login page:** users sign in with their name, email, password, country and city. The city is checked against OpenWeatherMap, so spelling mistakes are caught.
- **Live weather card (Cloudy integration):** a see-through card in the top-right corner of the page shows:
  - the live time in the user's city
  - the current temperature and sky condition
  - the city name
- **One click to the full forecast:** clicking the weather card opens the [Cloudy](https://github.com/RANAV2004/CLOUDY) dashboard directly on the user's city (hourly chart, 5-day forecast, humidity, wind and more).
- **The Shelf:** a curated set of featured books with real covers from Open Library. Series such as *Harry Potter* and *Twisted* open into a full series view.
- **Responsive design:** works on desktop, tablet and mobile, with a warm paper-and-ink theme.

---

## 🛠️ Tech Stack

| Part | Technology |
|---|---|
| Frontend | React + Vite |
| Chatbot | IBM watsonx Assistant (web chat) |
| Weather data | OpenWeatherMap API |
| Weather dashboard | Cloudy (React + Vite) |
| Book covers | Open Library Covers API |
| Hosting | Render (static site) |

---

## 🔗 How the Cloudy integration works

```
Login (city + country)
        │
        ▼
Bookworm home page ── weather card: time + temperature for that city
        │
        │  click
        ▼
Cloudy dashboard  →  https://<cloudy-site>/?city=Ujjain,IN
                     (Cloudy reads ?city= and loads that city straight away)
```

---

## 🚀 Getting Started

### 1. Clone and install

```bash
git clone https://github.com/RANAV2004/Bookworn.git
cd Bookworn
npm install
```

### 2. Add your environment variables

Copy `.env.example` to a new file called `.env.local` and fill in your values:

```
VITE_OWM_API_KEY=your_openweathermap_key_here
VITE_CLOUDY_URL=https://your-cloudy-site.onrender.com
```

- Get a free API key at [openweathermap.org/api](https://openweathermap.org/api).
- `VITE_CLOUDY_URL` is the live link of your Cloudy site.

> `.env.local` is in `.gitignore`, so your API key never gets uploaded to GitHub.

### 3. Run it

```bash
npm run dev
```

Open http://localhost:5173.

### 4. Build for production

```bash
npm run build
```

The output goes to `dist/`.

---

## ☁️ Deploying on Render

1. Create a new **Static Site** on Render and connect this repo.
2. Build command: `npm install && npm run build`
3. Publish directory: `dist`
4. Under **Environment**, add `VITE_OWM_API_KEY` and `VITE_CLOUDY_URL`.

---

## 📁 Project Structure

```
Bookworn/
├── index.html          ← page shell + IBM watsonx Assistant embed
├── src/
│   ├── main.jsx        ← React entry point
│   ├── Root.jsx        ← shows Login first, then the site
│   ├── Login.jsx       ← login page (name, email, password, country, city)
│   ├── App.jsx         ← main site: nav, hero, shelf, how it works, about
│   ├── WeatherCard.jsx ← Cloudy weather card (time + temperature)
│   ├── index.css       ← global styles
│   └── App.css
├── .env.example        ← template for environment variables
├── package.json
└── vite.config.js
```

---

## 📝 Notes

- The login is **front-end only**: the user is saved in the browser's localStorage and the password is not really checked. It's meant for demo purposes. A real backend with authentication can be added later.
- The chatbot's greeting and replies are managed in the IBM watsonx Assistant console (**Actions → Greet customer**).

---

## 👤 Author

**Vansh Rana**, B.Tech IT, Shri Vaishnav Vidyapeeth Vishwavidyalaya

- GitHub: [@RANAV2004](https://github.com/RANAV2004)
- LinkedIn: [vanshrana-ai](https://linkedin.com/in/vanshrana-ai)
- Portfolio: [vansh-portfolio-ivg6.onrender.com](https://vansh-portfolio-ivg6.onrender.com)
