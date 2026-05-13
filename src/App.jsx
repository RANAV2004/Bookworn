import { useState, useEffect, useRef } from 'react';
import { BookOpen, Sparkles, Send, X, MessageCircle, Quote, Coffee, Bookmark } from 'lucide-react';

// ─────────────────────────────────────────────────────────
//  BOOKWORM — A Cozy Book Recommendation Site
//  Designed to embed an IBM Watson Assistant chatbot
// ─────────────────────────────────────────────────────────

const FEATURED_BOOKS = [
  {
    title: 'Twisted Series',
    author: 'Ana Huang',
    year: 2021,
    isbn: '9781728274867',
    blurb: 'Four enemies-to-lovers romances, four unforgettable couples.',
    palette: { bg: '#f0e6d0', fg: '#2c1810', accent: '#c9a961' },
    style: 'epic',
    series: [
      {
        num: 'I',
        title: 'Twisted Love',
        year: 2021,
        isbn: '9781728274867',
        bg: '#2c1810', fg: '#f0e6d2', accent: '#c9a961',
        blurb: 'A cold guardian. A sunshine best friend. Forbidden and explosive.',
      },
      {
        num: 'II',
        title: 'Twisted Games',
        year: 2022,
        isbn: '9781728274874',
        bg: '#f0e6d0', fg: '#2c1810', accent: '#c9a961',
        blurb: 'A princess and her bodyguard, breaking every rule between them.',
      },
      {
        num: 'III',
        title: 'Twisted Hate',
        year: 2022,
        isbn: '9781728274881',
        bg: '#7a1a1a', fg: '#f0e6d2', accent: '#e8a87c',
        blurb: 'Two people who hate each other — until they really, really don\'t.',
      },
      {
        num: 'IV',
        title: 'Twisted Lies',
        year: 2022,
        isbn: '9781728274898',
        bg: '#1a1a2e', fg: '#f0e6d2', accent: '#c9a961',
        blurb: 'A PR arrangement. A billionaire with secrets. A love that defies both.',
      },
    ],
  },
  {
    title: 'Until I Met You',
    author: 'Goddy Francis',
    year: 2023,
    isbn: '9781634494694',
    blurb: 'A good girl, a dangerous man, and a love she never planned for.',
    palette: { bg: '#2a1a2e', fg: '#f0e6d2', accent: '#c83232' },
    style: 'gothic',
  },
  {
    title: 'Haunting Adeline',
    author: 'H.D. Carlton',
    year: 2021,
    isbn: '9781957635002',
    blurb: 'A dark, obsessive love story for readers who like the shadows.',
    palette: { bg: '#1a0a0a', fg: '#e8d4a0', accent: '#8b1a1a' },
    style: 'gothic',
  },
  {
    title: 'Ikigai',
    author: 'García & Miralles',
    year: 2016,
    isbn: '9780143130727',
    blurb: 'The Japanese art of finding purpose, one quiet day at a time.',
    palette: { bg: '#f5e6d3', fg: '#3d2817', accent: '#c83232' },
    style: 'soft',
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    year: 2018,
    isbn: '9780735211292',
    blurb: 'How tiny daily habits quietly remake who you become.',
    palette: { bg: '#e8a83c', fg: '#1a1a1a', accent: '#1a1a1a' },
    style: 'bold',
  },
  {
    title: 'It Ends with Us',
    author: 'Colleen Hoover',
    year: 2016,
    isbn: '9781501110368',
    blurb: 'A wrenching love story about the hardest kind of leaving.',
    palette: { bg: '#d4a8a8', fg: '#3d2817', accent: '#7a3a3a' },
    style: 'soft',
  },
  {
    title: 'It Starts with Us',
    author: 'Colleen Hoover',
    year: 2022,
    isbn: '9781668001226',
    blurb: 'A second chance for two people who never quite let go.',
    palette: { bg: '#5a8a8a', fg: '#f5ebd8', accent: '#e8a87c' },
    style: 'modern',
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    year: 1988,
    isbn: '9780062315007',
    blurb: 'A shepherd follows a dream across the desert toward his fate.',
    palette: { bg: '#d4a017', fg: '#2c1810', accent: '#722f37' },
    style: 'classical',
  },
  {
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    year: 1997,
    isbn: '9780747532699',
    blurb: 'Seven books, one boy wizard, and an entire world to disappear into.',
    palette: { bg: '#1a1538', fg: '#f0e6d2', accent: '#d4af37' },
    style: 'magic',
    series: [
      {
        num: 'I',
        title: "The Philosopher's Stone",
        year: 1997,
        isbn: '9780747532699',
        bg: '#5a1a1a', fg: '#f0e6d2', accent: '#d4af37',
        blurb: 'A boy in a cupboard learns he is a wizard.',
      },
      {
        num: 'II',
        title: 'The Chamber of Secrets',
        year: 1998,
        isbn: '9780747538493',
        bg: '#1d4a3a', fg: '#f0e6d2', accent: '#a8c8b8',
        blurb: 'Something is petrifying students at Hogwarts.',
      },
      {
        num: 'III',
        title: 'The Prisoner of Azkaban',
        year: 1999,
        isbn: '9780747542155',
        bg: '#3d2a5a', fg: '#f0e6d2', accent: '#c8b8d8',
        blurb: 'A wanted man escapes the wizarding prison.',
      },
      {
        num: 'IV',
        title: 'The Goblet of Fire',
        year: 2000,
        isbn: '9780747546245',
        bg: '#a84a18', fg: '#f0e6d2', accent: '#d4af37',
        blurb: 'A dangerous tournament. A name in the goblet.',
      },
      {
        num: 'V',
        title: 'The Order of the Phoenix',
        year: 2003,
        isbn: '9780747551003',
        bg: '#1a1a1a', fg: '#f0e6d2', accent: '#c83232',
        blurb: 'A secret society. A ministry that will not listen.',
      },
      {
        num: 'VI',
        title: 'The Half-Blood Prince',
        year: 2005,
        isbn: '9780747581086',
        bg: '#0d3d2a', fg: '#f0e6d2', accent: '#d4af37',
        blurb: 'An old textbook. A darkening world.',
      },
      {
        num: 'VII',
        title: 'The Deathly Hallows',
        year: 2007,
        isbn: '9780747591054',
        bg: '#0a0a0a', fg: '#f0e6d2', accent: '#e8d4a0',
        blurb: 'The hunt for horcruxes. The final stand.',
      },
    ],
  },
];

// Helper: Open Library cover URL by ISBN, with default=false so missing covers
// 404 cleanly and our onError fallback kicks in to show the CSS-rendered cover.
const coverUrlForISBN = (isbn) =>
  isbn ? `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false` : null;

const STARTER_PROMPTS = [
  'I loved The Secret History — what next?',
  'Something cozy for a rainy afternoon',
  'A literary thriller, please',
  'Surprise me with something weird',
];

// ─────────────────────────────────────────────────────────
//  BOOK COVER — real cover image with CSS-rendered fallback
// ─────────────────────────────────────────────────────────
function BookCover({ book }) {
  const { palette, title, author, style } = book;
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const coverUrl = coverUrlForISBN(book.isbn);
  const showImage = coverUrl && !imgFailed;

  return (
    <div
      className="book-cover"
      style={{
        background: palette.bg,
        color: palette.fg,
        boxShadow: `inset 4px 0 8px rgba(0,0,0,0.25), 8px 12px 24px rgba(44,24,16,0.25)`,
      }}
    >
      <div className="book-spine" style={{ background: `linear-gradient(90deg, rgba(0,0,0,0.35), transparent 40%)` }} />
      {style === 'gothic' && (
        <div className="cover-deco gothic-deco" style={{ borderColor: palette.accent }}>
          <div className="gothic-frame" style={{ borderColor: palette.accent }} />
        </div>
      )}
      {style === 'classical' && (
        <div className="cover-deco classical-deco" style={{ color: palette.accent }}>
          <div className="pillar" /><div className="pillar" />
        </div>
      )}
      {style === 'soft' && (
        <div className="cover-deco soft-deco">
          <div className="sun" style={{ background: palette.accent }} />
        </div>
      )}
      {style === 'epic' && (
        <div className="cover-deco epic-deco" style={{ borderColor: palette.accent }} />
      )}
      {style === 'modern' && (
        <div className="cover-deco modern-deco">
          <div className="pixel" style={{ background: palette.accent }} />
          <div className="pixel" style={{ background: palette.fg }} />
          <div className="pixel" style={{ background: palette.accent }} />
        </div>
      )}
      {style === 'bold' && (
        <div className="cover-deco bold-deco" style={{ background: palette.accent }} />
      )}
      {style === 'magic' && (
        <div className="cover-deco magic-deco" style={{ color: palette.accent }}>
          <span className="star s1" />
          <span className="star s2" />
          <span className="star s3" />
          <span className="star s4" />
          <span className="star s5" />
          <span className="moon" />
        </div>
      )}
      <div className="cover-content">
        <h3 className="cover-title">{title}</h3>
        <div className="cover-rule" style={{ background: palette.accent }} />
        <p className="cover-author">{author}</p>
      </div>
      {showImage && (
        <>
          <img
            src={coverUrl}
            alt={`${title} cover`}
            className="cover-image"
            style={{ opacity: imgLoaded ? 1 : 0 }}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgFailed(true)}
            loading="lazy"
          />
          {imgLoaded && <div className="cover-image-shadow" />}
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
//  CHAT WIDGET — Mock UI that mirrors Watson Assistant
//  Replace the demo logic with the real Watson embed (see notes)
// ─────────────────────────────────────────────────────────
function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! I\'m the Bookworm Librarian. Tell me a book you loved, a mood, or a genre — I\'ll find you something good.' },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  // Poll every second until Watson is ready, then send any queued message
  const pendingMsg = useRef(null);
  useEffect(() => {
    const poll = setInterval(() => {
      if (window.watsonInstance) {
        clearInterval(poll);
        if (pendingMsg.current) {
          window.watsonInstance.send({ input: { text: pendingMsg.current } });
          pendingMsg.current = null;
        }
      }
    }, 1000);
    return () => clearInterval(poll);
  }, []);

  // Register Watson response handler so index.html can pass replies into React state
  useEffect(() => {
    window.watsonResponseHandler = (text) => {
      setMessages((m) => [...m, { from: 'bot', text }]);
    };
    return () => { window.watsonResponseHandler = null; };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const send = (text) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setMessages((m) => [...m, { from: 'user', text: msg }]);
    setInput('');
    if (window.watsonInstance) {
      window.watsonInstance.send({ input: { text: msg } });
    } else {
      pendingMsg.current = msg;
      setMessages((m) => [...m, {
        from: 'bot',
        text: '📚 Connecting to the library... your message will be sent in a moment!',
      }]);
    }
  };

  return (
    <>
      <button
        className={`chat-fab ${open ? 'is-open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close librarian chat' : 'Open librarian chat'}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && <span className="chat-fab-label">Ask the Librarian</span>}
      </button>

      <div className={`chat-panel ${open ? 'is-open' : ''}`}>
        <div className="chat-header">
          <div className="chat-header-icon"><BookOpen size={18} /></div>
          <div>
            <div className="chat-title">The Librarian</div>
            <div className="chat-subtitle">always reading · always here</div>
          </div>
        </div>
        <div className="chat-messages" ref={scrollRef}>
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg chat-msg-${m.from}`}>{m.text}</div>
          ))}
          {messages.length === 1 && (
            <div className="chat-suggestions">
              {STARTER_PROMPTS.map((p) => (
                <button key={p} className="chat-suggestion" onClick={() => send(p)}>{p}</button>
              ))}
            </div>
          )}
        </div>
        <div className="chat-input-row">
          <input
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Tell me what you're in the mood for…"
          />
          <button className="chat-send" onClick={() => send()} aria-label="Send">
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────
//  SERIES MODAL — opens when a book with a series is clicked
// ─────────────────────────────────────────────────────────
function MiniSeriesCover({ part }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const coverUrl = coverUrlForISBN(part.isbn);
  const showImage = coverUrl && !imgFailed;

  return (
    <div
      className="series-card"
      style={{ background: part.bg, color: part.fg }}
    >
      <div className="series-stars">
        <span style={{ background: part.accent }} />
        <span style={{ background: part.accent, opacity: 0.7 }} />
        <span style={{ background: part.accent, opacity: 0.5 }} />
      </div>
      <div className="series-num" style={{ color: part.accent }}>{part.num}</div>
      <div className="series-rule" style={{ background: part.accent }} />
      <div className="series-card-body">
        <div className="series-card-year" style={{ color: part.accent }}>{part.year}</div>
        <h4>{part.title}</h4>
        <p>{part.blurb}</p>
      </div>
      {showImage && (
        <>
          <img
            src={coverUrl}
            alt={`${part.title} cover`}
            className="cover-image"
            style={{ opacity: imgLoaded ? 1 : 0 }}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgFailed(true)}
            loading="lazy"
          />
          {imgLoaded && <div className="cover-image-shadow" />}
        </>
      )}
    </div>
  );
}

function SeriesModal({ book, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="series-overlay" onClick={onClose}>
      <div className="series-modal" onClick={(e) => e.stopPropagation()}>
        <button className="series-close" onClick={onClose} aria-label="Close series view">
          <X size={20} />
        </button>
        <div className="series-header">
          <div className="section-eyebrow">№ ── The complete series</div>
          <h2>{book.title}</h2>
          <p className="series-sub">by {book.author} · {book.series.length} books · {book.series[0].year}–{book.series[book.series.length - 1].year}</p>
        </div>
        <div className="series-grid">
          {book.series.map((part) => (
            <MiniSeriesCover key={part.num} part={part} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
//  MAIN
// ─────────────────────────────────────────────────────────
export default function App() {
  const [openSeries, setOpenSeries] = useState(null);
  return (
    <div className="bookworm-app">
      <style>{styles}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="brand">
            <BookOpen size={20} />
            <span>Bookworm</span>
          </div>
          <ul className="nav-links">
            <li><a href="#shelf">Shelf</a></li>
            <li><a href="#how">How it works</a></li>
            <li><a href="#about">About</a></li>
          </ul>
          <a href="#chat" className="nav-cta" onClick={(e) => {
            e.preventDefault();
            document.querySelector('.chat-fab')?.click();
          }}>
            <Sparkles size={14} /> Ask the Librarian
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="hero-grain" />
        <div className="hero-inner">
          <div className="hero-eyebrow">
          </div>
          <h1 className="hero-title">
            Find your <em>next</em><br />
            favourite book.
          </h1>
          <p className="hero-lede">
            A small, careful corner of the internet where an AI librarian listens
            to what you love, and points you toward something new.
          </p>
          <div className="hero-cta-row">
            <button className="cta-primary" onClick={() => document.querySelector('.chat-fab')?.click()}>
              Start a conversation
              <span className="cta-arrow">→</span>
            </button>
            <a href="#shelf" className="cta-ghost">Browse the shelf</a>
          </div>
          <div className="hero-ornament" aria-hidden="true">❦</div>
        </div>
      </header>

      {/* QUOTE STRIP */}
      <section className="quote-strip">
        <Quote size={16} />
        <p>
          <em>"A reader lives a thousand lives before he dies. The man who never reads lives only one."</em>
          <span className="quote-attr"> — George R. R. Martin</span>
        </p>
      </section>

      {/* FEATURED SHELF */}
      <section id="shelf" className="shelf">
        <div className="section-head">
          <div className="section-eyebrow"> 01 · The Shelf</div>
          <h2 className="section-title">This week, the librarian is reading</h2>
          <p className="section-lede">
            A small, opinionated selection. Tell the librarian which one calls to you
            and we'll find more like it.
          </p>
        </div>
        <div className="shelf-grid">
          {FEATURED_BOOKS.map((book, i) => (
            <article
              key={book.title}
              className={`shelf-card ${book.series ? 'has-series' : ''}`}
              style={{ animationDelay: `${i * 80}ms` }}
              onClick={book.series ? () => setOpenSeries(book) : undefined}
              role={book.series ? 'button' : undefined}
              tabIndex={book.series ? 0 : undefined}
              onKeyDown={book.series ? (e) => (e.key === 'Enter' || e.key === ' ') && setOpenSeries(book) : undefined}
            >
              <BookCover book={book} />
              {book.series && (
                <div className="series-badge">
                  <Sparkles size={11} /> {book.series.length}-book series · click to open
                </div>
              )}
              <div className="shelf-meta">
                <div className="shelf-year">{book.year}</div>
                <h3 className="shelf-title">{book.title}</h3>
                <p className="shelf-author">by {book.author}</p>
                <p className="shelf-blurb">{book.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="how">
        <div className="section-head">
          <div className="section-eyebrow"> 02 · How it works</div>
          <h2 className="section-title">Three steps to your next book</h2>
        </div>
        <div className="how-grid">
          <div className="how-step">
            <div className="how-num">i</div>
            <Coffee size={28} className="how-icon" />
            <h3>Get comfortable</h3>
            <p>Pour yourself something warm. Open the librarian. There's no rush.</p>
          </div>
          <div className="how-step">
            <div className="how-num">ii</div>
            <MessageCircle size={28} className="how-icon" />
            <h3>Tell us your taste</h3>
            <p>A book you loved. A mood. A weather. A feeling you can't name. The librarian listens.</p>
          </div>
          <div className="how-step">
            <div className="how-num">iii</div>
            <Bookmark size={28} className="how-icon" />
            <h3>Discover</h3>
            <p>Get a recommendation, a why, and a quiet nudge to read it.</p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about">
        <div className="about-inner">
          <div className="about-text">
            <div className="section-eyebrow"> 03 · About</div>
            <h2 className="section-title">A librarian, but built from words.</h2>
            <p>
              Bookworm is a small experiment in matchmaking — between you and a book.
              The librarian is an AI assistant trained on the things readers love and
              the words they use to describe them.
            </p>
            <p>
              It isn't a search engine. It isn't a sales pitch. It's a quiet conversation
              with someone who reads more than you do and isn't shy about saying so.
            </p>
            <p className="about-sign">— the desk, always open</p>
          </div>
          <div className="about-card">
            <div className="about-card-frame">
              <Quote size={20} />
              <p>
                "The library is inhabited by spirits that come out of the pages at night."
              </p>
              <span className="about-card-attr">Isabel Allende</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <BookOpen size={18} />
            <span>Bookworm</span>
          </div>
          <p className="footer-line">A reading room on the internet.</p>
          <p className="footer-fine">© {new Date().getFullYear()} · Made By Vansh</p>
        </div>
      </footer>

      <ChatWidget />
      {openSeries && <SeriesModal book={openSeries} onClose={() => setOpenSeries(null)} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
//  STYLES
// ─────────────────────────────────────────────────────────
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..900,0..100&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=DM+Mono:wght@400;500&display=swap');

:root {
  --paper: #f5ebd8;
  --paper-warm: #efe1c8;
  --paper-dark: #e8d9bc;
  --ink: #2c1810;
  --ink-soft: #4a3520;
  --wine: #6b2737;
  --wine-deep: #4a1a26;
  --gold: #c9a961;
  --gold-deep: #a88a3f;
  --moss: #4a5d3a;
  --sepia: #8b6f47;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

.bookworm-app {
  font-family: 'EB Garamond', Georgia, serif;
  background: var(--paper);
  color: var(--ink);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.bookworm-app::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(139,111,71,0.04) 0, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(107,39,55,0.04) 0, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.bookworm-app > * { position: relative; z-index: 1; }

a { color: inherit; text-decoration: none; }

/* ─── NAV ─── */
.nav {
  position: sticky;
  top: 0;
  background: rgba(245,235,216,0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(44,24,16,0.08);
  z-index: 50;
}
.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 18px 32px;
  display: flex;
  align-items: center;
  gap: 32px;
}
.brand {
  display: flex; align-items: center; gap: 10px;
  font-family: 'Fraunces', serif;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
}
.nav-links {
  list-style: none;
  display: flex;
  gap: 28px;
  margin-left: auto;
  font-family: 'DM Mono', monospace;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}
.nav-links a:hover { color: var(--wine); }
.nav-cta {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 18px;
  border: 1px solid var(--ink);
  border-radius: 999px;
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  transition: all 0.2s;
}
.nav-cta:hover { background: var(--ink); color: var(--paper); }

/* ─── HERO ─── */
.hero {
  position: relative;
  padding: 120px 32px 100px;
  text-align: center;
  overflow: hidden;
}
.hero-grain {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(ellipse at top, rgba(201,169,97,0.15), transparent 60%),
    repeating-linear-gradient(90deg, transparent 0, transparent 1px, rgba(44,24,16,0.015) 1px, rgba(44,24,16,0.015) 2px);
  pointer-events: none;
}
.hero-inner {
  max-width: 880px;
  margin: 0 auto;
  position: relative;
}
.hero-eyebrow {
  display: flex; align-items: center; justify-content: center; gap: 16px;
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--sepia);
  margin-bottom: 36px;
}
.eyebrow-line {
  width: 48px; height: 1px;
  background: var(--sepia);
}
.hero-title {
  font-family: 'Fraunces', serif;
  font-weight: 300;
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 0.95;
  letter-spacing: -0.03em;
  margin-bottom: 28px;
  font-variation-settings: "SOFT" 100;
}
.hero-title em {
  font-style: italic;
  font-weight: 400;
  color: var(--wine);
  font-variation-settings: "SOFT" 0;
}
.hero-lede {
  font-size: 1.25rem;
  line-height: 1.55;
  max-width: 560px;
  margin: 0 auto 44px;
  color: var(--ink-soft);
  font-style: italic;
}
.hero-cta-row {
  display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;
  align-items: center;
}
.cta-primary {
  display: inline-flex; align-items: center; gap: 14px;
  padding: 18px 32px;
  background: var(--ink);
  color: var(--paper);
  border: none;
  border-radius: 999px;
  font-family: 'DM Mono', monospace;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  cursor: pointer;
  transition: all 0.25s;
}
.cta-primary:hover {
  background: var(--wine);
  transform: translateY(-1px);
}
.cta-arrow { transition: transform 0.25s; }
.cta-primary:hover .cta-arrow { transform: translateX(4px); }
.cta-ghost {
  font-family: 'EB Garamond', serif;
  font-style: italic;
  font-size: 1.05rem;
  border-bottom: 1px solid var(--ink);
  padding-bottom: 2px;
  transition: color 0.2s;
}
.cta-ghost:hover { color: var(--wine); border-color: var(--wine); }
.hero-ornament {
  margin-top: 64px;
  font-size: 1.6rem;
  color: var(--gold-deep);
}

/* ─── QUOTE STRIP ─── */
.quote-strip {
  background: var(--ink);
  color: var(--paper);
  padding: 22px 32px;
  display: flex; align-items: center; justify-content: center; gap: 16px;
  font-family: 'EB Garamond', serif;
  font-size: 1.05rem;
  text-align: center;
}
.quote-attr {
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--gold);
  font-style: normal;
  margin-left: 8px;
}

/* ─── SECTION HEAD ─── */
.section-head {
  max-width: 720px;
  margin: 0 auto 64px;
  text-align: center;
  padding: 0 32px;
}
.section-eyebrow {
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--wine);
  margin-bottom: 18px;
}
.section-title {
  font-family: 'Fraunces', serif;
  font-weight: 400;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
}
.section-lede {
  font-style: italic;
  font-size: 1.1rem;
  color: var(--ink-soft);
}

/* ─── SHELF ─── */
.shelf {
  padding: 100px 32px;
  background: linear-gradient(180deg, var(--paper) 0%, var(--paper-warm) 100%);
}
.shelf-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 56px 32px;
}
.shelf-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  opacity: 0;
  animation: fadeUp 0.7s ease forwards;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.shelf-card:nth-child(odd) { transform: translateY(20px); }
.shelf-card:nth-child(even) { transform: translateY(-20px); }
.shelf-card:hover .book-cover {
  transform: translateY(-8px) rotate(-1deg);
  box-shadow: inset 4px 0 8px rgba(0,0,0,0.25), 12px 20px 32px rgba(44,24,16,0.3);
}
.shelf-card.has-series { cursor: pointer; }
.shelf-card.has-series:hover .book-cover {
  transform: translateY(-10px) rotate(-1.5deg) scale(1.02);
}
.shelf-card.has-series:focus-visible { outline: none; }
.shelf-card.has-series:focus-visible .book-cover {
  box-shadow: inset 4px 0 8px rgba(0,0,0,0.25), 0 0 0 3px var(--gold), 12px 20px 32px rgba(44,24,16,0.3);
}
.series-badge {
  margin-top: 16px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  background: var(--ink);
  color: var(--gold);
  border-radius: 999px;
  font-family: 'DM Mono', monospace;
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  align-self: center;
}

/* ─── SERIES MODAL ─── */
.series-overlay {
  position: fixed;
  inset: 0;
  background: rgba(20,12,8,0.7);
  backdrop-filter: blur(8px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  animation: overlayIn 0.3s ease;
  overflow-y: auto;
}
@keyframes overlayIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.series-modal {
  position: relative;
  background: var(--paper);
  border-radius: 8px;
  max-width: 1100px;
  width: 100%;
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  padding: 56px 48px 48px;
  box-shadow: 0 32px 80px rgba(20,12,8,0.5);
  animation: modalIn 0.4s cubic-bezier(0.2,0.8,0.2,1);
}
@keyframes modalIn {
  from { opacity: 0; transform: translateY(24px) scale(0.97); }
  to { opacity: 1; transform: none; }
}
.series-close {
  position: absolute;
  top: 18px; right: 18px;
  width: 38px; height: 38px;
  border-radius: 50%;
  background: var(--paper-warm);
  border: 1px solid rgba(44,24,16,0.15);
  color: var(--ink);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
  z-index: 2;
}
.series-close:hover { background: var(--ink); color: var(--paper); }
.series-header {
  text-align: center;
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(44,24,16,0.12);
}
.series-header h2 {
  font-family: 'Fraunces', serif;
  font-weight: 400;
  font-size: clamp(2rem, 4vw, 3rem);
  letter-spacing: -0.02em;
  margin-bottom: 12px;
  font-variation-settings: "SOFT" 50;
}
.series-sub {
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--sepia);
}
.series-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
.series-card {
  position: relative;
  aspect-ratio: 2 / 3;
  border-radius: 2px 6px 6px 2px;
  padding: 24px 20px 20px 30px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: inset 4px 0 8px rgba(0,0,0,0.3), 4px 8px 16px rgba(20,12,8,0.25);
  transition: transform 0.3s cubic-bezier(0.2,0.8,0.2,1);
}
.series-card:hover {
  transform: translateY(-4px) rotate(-0.8deg);
}
.series-card::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 8px;
  background: linear-gradient(90deg, rgba(0,0,0,0.4), transparent);
}
.series-stars {
  position: absolute;
  top: 16px; right: 16px;
  display: flex; gap: 5px;
}
.series-stars span {
  width: 4px; height: 4px;
  border-radius: 50%;
  box-shadow: 0 0 4px currentColor;
}
.series-num {
  font-family: 'Fraunces', serif;
  font-weight: 300;
  font-style: italic;
  font-size: 2.4rem;
  line-height: 1;
  font-variation-settings: "SOFT" 100;
  margin-bottom: 8px;
  letter-spacing: 0.04em;
}
.series-rule {
  width: 28px; height: 2px;
  margin-bottom: 12px;
  opacity: 0.8;
}
.series-card-body {
  margin-top: auto;
}
.series-card-year {
  font-family: 'DM Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 6px;
  opacity: 0.85;
}
.series-card-body h4 {
  font-family: 'Fraunces', serif;
  font-weight: 600;
  font-size: 1.05rem;
  line-height: 1.15;
  margin-bottom: 8px;
  letter-spacing: -0.01em;
}
.series-card-body p {
  font-size: 0.82rem;
  line-height: 1.4;
  opacity: 0.8;
  font-style: italic;
}
@media (max-width: 600px) {
  .series-modal { padding: 48px 24px 32px; }
  .series-grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 14px; }
  .series-card { padding: 18px 14px 14px 22px; }
  .series-num { font-size: 1.8rem; }
  .series-card-body h4 { font-size: 0.92rem; }
  .series-card-body p { font-size: 0.74rem; }
}

/* ─── BOOK COVER (CSS-rendered) ─── */
.book-cover {
  width: 220px;
  height: 320px;
  position: relative;
  border-radius: 2px 6px 6px 2px;
  padding: 28px 22px 22px 36px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: all 0.4s cubic-bezier(0.2,0.8,0.2,1);
  cursor: pointer;
  overflow: hidden;
}
.book-spine {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 12px;
  z-index: 1;
}
.cover-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
  z-index: 3;
  transition: opacity 0.4s ease;
}
.cover-image-shadow {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 4%, transparent 8%);
  pointer-events: none;
  z-index: 4;
  border-radius: inherit;
}
.cover-content { position: relative; z-index: 2; }
.cover-title {
  font-family: 'Fraunces', serif;
  font-weight: 600;
  font-size: 1.35rem;
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin-bottom: 10px;
}
.cover-rule {
  width: 32px; height: 2px;
  margin-bottom: 10px;
}
.cover-author {
  font-family: 'DM Mono', monospace;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  opacity: 0.85;
}
.cover-deco { position: absolute; pointer-events: none; }
.gothic-deco { top: 18px; right: 18px; left: 30px; bottom: 100px; border: 1px solid; }
.gothic-frame { position: absolute; inset: 6px; border: 1px solid; opacity: 0.5; }
.classical-deco { top: 30px; left: 50%; transform: translateX(-50%); display: flex; gap: 12px; }
.classical-deco .pillar { width: 4px; height: 80px; background: currentColor; opacity: 0.4; }
.soft-deco { top: 30px; right: 30px; }
.soft-deco .sun { width: 60px; height: 60px; border-radius: 50%; opacity: 0.7; box-shadow: 0 0 30px currentColor; }
.epic-deco { top: 25px; right: 22px; left: 38px; height: 60px; border: 2px solid; border-bottom: none; border-radius: 60px 60px 0 0; opacity: 0.6; }
.modern-deco { top: 28px; right: 22px; display: flex; gap: 4px; }
.modern-deco .pixel { width: 12px; height: 12px; }
.bold-deco { top: 0; right: 0; width: 80px; height: 80px; border-radius: 0 0 0 100%; opacity: 0.7; }
.magic-deco { top: 22px; right: 18px; width: 96px; height: 80px; }
.magic-deco .star {
  position: absolute;
  background: currentColor;
  border-radius: 50%;
  box-shadow: 0 0 6px currentColor;
}
.magic-deco .s1 { top: 4px;  left: 0;   width: 4px; height: 4px; }
.magic-deco .s2 { top: 26px; left: 18px; width: 3px; height: 3px; opacity: 0.8; }
.magic-deco .s3 { top: 52px; left: 8px;  width: 5px; height: 5px; }
.magic-deco .s4 { top: 14px; left: 38px; width: 3px; height: 3px; opacity: 0.7; }
.magic-deco .s5 { top: 60px; left: 44px; width: 3px; height: 3px; opacity: 0.6; }
.magic-deco .moon {
  position: absolute;
  top: 4px; right: 0;
  width: 28px; height: 28px;
  border-radius: 50%;
  box-shadow: inset -8px 2px 0 currentColor;
  opacity: 0.9;
}

.shelf-meta { padding-top: 28px; max-width: 240px; }
.shelf-year {
  font-family: 'DM Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  color: var(--sepia);
  margin-bottom: 6px;
}
.shelf-title {
  font-family: 'Fraunces', serif;
  font-weight: 500;
  font-size: 1.3rem;
  margin-bottom: 4px;
}
.shelf-author {
  font-style: italic;
  color: var(--ink-soft);
  margin-bottom: 12px;
}
.shelf-blurb {
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--ink-soft);
}

/* ─── HOW ─── */
.how {
  padding: 100px 32px;
}
.how-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
}
.how-step {
  background: var(--paper-warm);
  border: 1px solid rgba(44,24,16,0.1);
  padding: 48px 32px;
  text-align: center;
  border-radius: 4px;
  position: relative;
  transition: all 0.3s;
}
.how-step:hover {
  background: var(--paper-dark);
  transform: translateY(-4px);
}
.how-num {
  position: absolute;
  top: 18px; left: 24px;
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 1.4rem;
  color: var(--gold-deep);
  font-variation-settings: "SOFT" 100;
}
.how-icon {
  color: var(--wine);
  margin-bottom: 20px;
}
.how-step h3 {
  font-family: 'Fraunces', serif;
  font-weight: 500;
  font-size: 1.5rem;
  margin-bottom: 12px;
  letter-spacing: -0.01em;
}
.how-step p {
  font-size: 1rem;
  line-height: 1.55;
  color: var(--ink-soft);
  font-style: italic;
}

/* ─── ABOUT ─── */
.about {
  padding: 100px 32px;
  background: var(--ink);
  color: var(--paper);
}
.about-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 80px;
  align-items: center;
}
.about .section-eyebrow { color: var(--gold); }
.about .section-title { color: var(--paper); }
.about-text p {
  font-size: 1.15rem;
  line-height: 1.65;
  margin-bottom: 18px;
  color: rgba(245,235,216,0.85);
}
.about-sign {
  font-style: italic;
  color: var(--gold) !important;
  margin-top: 28px !important;
}
.about-card-frame {
  border: 1px solid var(--gold);
  padding: 48px 32px;
  text-align: center;
  position: relative;
}
.about-card-frame::before, .about-card-frame::after {
  content: '';
  position: absolute;
  width: 16px; height: 16px;
  border: 1px solid var(--gold);
}
.about-card-frame::before { top: -4px; left: -4px; border-right: none; border-bottom: none; }
.about-card-frame::after { bottom: -4px; right: -4px; border-left: none; border-top: none; }
.about-card-frame svg { color: var(--gold); margin-bottom: 16px; }
.about-card-frame p {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 1.25rem;
  line-height: 1.45;
  margin-bottom: 18px;
}
.about-card-attr {
  font-family: 'DM Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
}
@media (max-width: 768px) {
  .about-inner { grid-template-columns: 1fr; gap: 48px; }
}

/* ─── FOOTER ─── */
.footer {
  padding: 56px 32px;
  text-align: center;
  border-top: 1px solid rgba(44,24,16,0.1);
  background: var(--paper-warm);
}
.footer-brand {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: 'Fraunces', serif;
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 12px;
}
.footer-line {
  font-style: italic;
  color: var(--ink-soft);
  margin-bottom: 16px;
}
.footer-fine {
  font-family: 'DM Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--sepia);
}

/* ─── CHAT WIDGET ─── */
.chat-fab {
  position: fixed;
  bottom: 28px; right: 28px;
  background: var(--ink);
  color: var(--paper);
  border: none;
  border-radius: 999px;
  padding: 16px 22px;
  display: flex; align-items: center; gap: 10px;
  font-family: 'DM Mono', monospace;
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  cursor: pointer;
  box-shadow: 0 12px 32px rgba(44,24,16,0.35);
  z-index: 100;
  transition: all 0.25s cubic-bezier(0.2,0.8,0.2,1);
}
.chat-fab:hover { background: var(--wine); transform: translateY(-2px); }
.chat-fab.is-open { padding: 14px; }
.chat-fab.is-open .chat-fab-label { display: none; }

.chat-panel {
  position: fixed;
  bottom: 100px; right: 28px;
  width: 380px;
  max-width: calc(100vw - 56px);
  height: 540px;
  max-height: calc(100vh - 140px);
  background: var(--paper);
  border: 1px solid rgba(44,24,16,0.15);
  border-radius: 12px;
  box-shadow: 0 24px 64px rgba(44,24,16,0.25);
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateY(20px) scale(0.96);
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.2,0.8,0.2,1);
  z-index: 99;
  overflow: hidden;
}
.chat-panel.is-open { opacity: 1; transform: none; pointer-events: auto; }

.chat-header {
  background: var(--ink);
  color: var(--paper);
  padding: 18px 20px;
  display: flex; align-items: center; gap: 14px;
}
.chat-header-icon {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--wine);
  display: flex; align-items: center; justify-content: center;
}
.chat-title {
  font-family: 'Fraunces', serif;
  font-weight: 500;
  font-size: 1.05rem;
}
.chat-subtitle {
  font-family: 'DM Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold);
  margin-top: 2px;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex; flex-direction: column; gap: 12px;
}
.chat-msg {
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 14px;
  font-size: 0.98rem;
  line-height: 1.4;
  animation: msgIn 0.3s ease;
}
@keyframes msgIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
}
.chat-msg-bot {
  background: var(--paper-warm);
  align-self: flex-start;
  border-bottom-left-radius: 4px;
}
.chat-msg-user {
  background: var(--ink);
  color: var(--paper);
  align-self: flex-end;
  border-bottom-right-radius: 4px;
}
.chat-suggestions {
  display: flex; flex-wrap: wrap; gap: 8px;
  margin-top: 8px;
}
.chat-suggestion {
  background: transparent;
  border: 1px solid rgba(44,24,16,0.2);
  border-radius: 999px;
  padding: 8px 14px;
  font-family: 'EB Garamond', serif;
  font-style: italic;
  font-size: 0.88rem;
  color: var(--ink-soft);
  cursor: pointer;
  transition: all 0.2s;
}
.chat-suggestion:hover {
  background: var(--ink);
  color: var(--paper);
  border-color: var(--ink);
}

.chat-input-row {
  display: flex; gap: 8px;
  padding: 14px;
  border-top: 1px solid rgba(44,24,16,0.1);
  background: var(--paper-warm);
}
.chat-input {
  flex: 1;
  background: var(--paper);
  border: 1px solid rgba(44,24,16,0.15);
  border-radius: 999px;
  padding: 10px 16px;
  font-family: 'EB Garamond', serif;
  font-size: 0.98rem;
  color: var(--ink);
  outline: none;
}
.chat-input:focus { border-color: var(--wine); }
.chat-send {
  width: 40px; height: 40px;
  border-radius: 50%;
  background: var(--ink);
  color: var(--paper);
  border: none;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s;
}
.chat-send:hover { background: var(--wine); }

@media (max-width: 640px) {
  .nav-links { display: none; }
  .nav-cta { margin-left: auto; }
  .hero { padding: 80px 24px 60px; }
  .chat-panel { right: 12px; bottom: 84px; width: calc(100vw - 24px); }
  .chat-fab { right: 16px; bottom: 16px; }
}
`;