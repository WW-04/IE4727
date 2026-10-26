import { useState, useMemo } from 'react'
import {NAV_LINKS} from './NavBar.tsx'
import ComingSoon from './ComingSoon.tsx'
import Menu from './Menu.tsx'
import Events from './Event.tsx'

/* ---------------- data ---------------- */
const MOVIES = [
  {
    id: "m1", title: "The Odyssey", genre: "Adventure", rating: "NC 16",
    duration: "2h 40m", price: 14,
    poster: "https://image.tmdb.org/t/p/original/5rhTDKUhPYvpdQIijFIs5VoWsON.jpg",
    blurb: "Christopher Nolan’s, The Odyssey, in 35mm. After the Trojan War, Odysseus faces a dangerous voyage back to Ithaca, meeting creatures like the Cyclops Polyphemus, Sirens, and Circe along the way.",
    times: [
      { time: "2:00 PM", hall: "Hall 1", seatsLeft: 34 },
      { time: "5:30 PM", hall: "Hall 1", seatsLeft: 9 },
      { time: "8:45 PM", hall: "Hall 3", seatsLeft: 21 },
    ],
  },
  {
    id: "m2", title: "The Invite", genre: "Comedy, Drama, Romance", rating: "M18",
    duration: "1h 47m", price: 12,
    poster: "https://image.tmdb.org/t/p/original/hFLVVF6GSfFkvDlht6iCsCcFjrh.jpg",
    blurb: "Joe and Angela's marriage is on thin ice. When they invite their enigmatic upstairs neighbors for a dinner party, the night spirals into unexpected places.",
    times: [
      { time: "1:00 PM", hall: "Hall 2", seatsLeft: 40 },
      { time: "4:15 PM", hall: "Hall 2", seatsLeft: 12 },
      { time: "9:00 PM", hall: "Hall 1", seatsLeft: 6 },
    ],
  },
  {
    id: "m3", title: "Obsession", genre: "Horror", rating: "M18",
    duration: "1h 38m", price: 13,
    poster: "https://image.tmdb.org/t/p/original/7Var7KpENv7M2hcXsRV0ZoD8aYV.jpg",
    blurb: "After breaking the mysterious One Wish Willow to win his crush's heart, a hopeless romantic finds himself getting exactly what he asked for but soon discovers that some desires come at a dark, sinister price.",
    times: [
      { time: "3:00 PM", hall: "Hall 3", seatsLeft: 18 },
      { time: "7:00 PM", hall: "Hall 3", seatsLeft: 5 },
      { time: "10:15 PM", hall: "Hall 2", seatsLeft: 27 },
    ],
  },
  {
    id: "m4", title: "Spider Man: Brand New Day", genre: "Action, Drama", rating: "PG13",
    duration: "2h 12m", price: 15,
    poster: "https://image.tmdb.org/t/p/original/x19dchU8e38vQfW4epzOsQNLuZ2.jpg",
    blurb: "It's a BRAND NEW DAY for Peter Parker. Fighting crime full-time as Spider- Man in a world that doesn’t remember him -- and the pressure of seeing his old friends move on without him -- sparks a change in Peter he may not have the power to control. But that transformation might also be the only thing that can stop a shocking new threat to the city and those he loves - a powerful villain no one can even see.",
    times: [
      { time: "12:30 PM", hall: "Hall 1", seatsLeft: 44 },
      { time: "6:00 PM", hall: "Hall 1", seatsLeft: 14 },
    ],
  },
  {
    id: "m5", title: "Tony", genre: "Biography, Drama", rating: "M18",
    duration: "1h 46m", price: 15,

    poster: "https://image.tmdb.org/t/p/original/rAh6vLPURaFZg7sQZqJoIKeiPlQ.jpg",

    blurb: "A 19-year-old Anthony Bourdain travels to Provincetown and stumbles into the chaotic world of a restaurant kitchen, setting off a summer that will shape the course of his life.",

    times: [

      { time: "1:30 PM", hall: "Hall 1", seatsLeft: 44 },

      { time: "6:10 PM", hall: "Hall 1", seatsLeft: 14 },

    ],

  },  

  {

    id: "m6", title: "Digger", genre: "Family Drama", rating: "M18",
    duration: "2h 9m", price: 15,
    poster: "https://image.tmdb.org/t/p/original/fSd92gWM4NTuSKjSHAUWxlJQ49x.jpg",
    blurb: "The most powerful man in the world embarks on a frantic mission to prove he is humanity’s saviour before the disaster he’s unleashed destroys everything.",
    times: [
      { time: "6:30 PM", hall: "Hall 1", seatsLeft: 44 },
      { time: "8:00 PM", hall: "Hall 3", seatsLeft: 14 },
    ],
  }, 
];

const UNIQUE_MOVIES = MOVIES.filter((m, i, arr) => arr.findIndex((x) => x.id === m.id) === i)

const ROWS = ['A', 'B', 'C', 'D', 'E']
const COLS = 8
const PREMIUM_ROWS = new Set(['D', 'E'])

function seededTaken() {
  const taken = new Set<string>()
  const count = 12
  while (taken.size < count) {
    const r = ROWS[Math.floor(Math.random() * ROWS.length)]
    const c = Math.floor(Math.random() * COLS) + 1

    taken.add(r + c)
  }
  return taken
}

type Movie = typeof MOVIES[number]
type Showtime = Movie['times'][number]
type SeatEntry = { id: string; premium: boolean }
type CartItem = { movie: Movie; time: Showtime; seats: SeatEntry[]; total: number }
type AppScreen = 'browse' | 'detail' | 'cart' | 'checkout' | 'success' | 'comingSoon' | 'menu' | 'events'
type NavigationScreen = (typeof NAV_LINKS)[number]['screen']

/* ---------------- building blocks ---------------- */

function PosterImg({ movie }: { movie: Movie }) {
  return (
    <img
      className="poster-img"
      src={movie.poster}
      alt={movie.title + ' poster'}
      onError={(e) => {
        (e.target as HTMLImageElement).src =
          'https://placehold.co/300x420?text=' + encodeURIComponent(movie.title)
      }}
    />
  )
}



function Badge({ children, tone = 'dim' }: { children: React.ReactNode; tone?: 'dim' | 'amber' | 'rose' }) {
  const tones = {
    dim: 'bg-white/5 text-[var(--dim)] border-white/10',
    amber: 'bg-[var(--amber)]/15 text-[var(--amber)] border-[var(--amber)]/30',
    rose: 'bg-[var(--rose)]/15 text-[var(--rose)] border-[var(--rose)]/30',

  }

  return (
    <span className={`text-[11px] px-2 py-0.5 rounded-full border ${tones[tone]}`}>
      {children}
    </span>

  )

}

function Header({
  cartCount,
  currentScreen,
  onLogo,
  onNavigate,
  onCart,
}: {
  cartCount: number
  currentScreen: AppScreen
  onLogo: () => void
  onNavigate: (screen: NavigationScreen) => void
  onCart: () => void
}) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-[var(--bg)]/85 border-b border-[var(--line)]">
      <div className="max-w-6xl mx-auto px-5 min-h-16 py-3 flex flex-wrap items-center justify-between gap-3">
        <button onClick={onLogo} className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-sm bg-amber-500 flex items-center justify-center">
            <span className="text-black text-xs font-bold font-display">✦</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="lumos-logo font-display text-sm font-bold text-amber-400 tracking-wider group-hover:text-amber-300 transition-colors">
              LUMOS
            </span>
            <span className="font-mono-dm text-[8px] tracking-[0.3em] text-neutral-500 uppercase">
              Cinema
            </span>
          </div>
        </button>
        <nav aria-label="Primary navigation" className="order-3 flex w-full items-center justify-center gap-1 sm:order-none sm:w-auto">
          {NAV_LINKS.map((link) => {
            const active = currentScreen === link.screen
            return (
              <button
                key={link.screen}
                type="button"
                onClick={() => onNavigate(link.screen)}
                aria-pressed={active}
                className={`rounded-full px-3 py-2 text-sm transition-colors ${
                  active
                    ? 'bg-[var(--amber)] text-[#16110a]'
                    : 'text-[var(--dim)] hover:bg-white/5 hover:text-[var(--cream)]'
                }`}
              >
                {link.label}
              </button>
            )
          })}
        </nav>
        <button
          onClick={onCart}
          className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--line)] hover:border-[var(--amber)]/40 hover:bg-white/5 transition-colors text-sm"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          Bookings
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[var(--amber)] text-[#16110a] text-[10px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}



/* ---------------- screens ---------------- */



function HeroBanner({ onBrowse }: { onBrowse: () => void }) {
  const featured = UNIQUE_MOVIES[0]
  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: '480px' }}>
      <div

  className="absolute inset-0 bg-cover bg-center scale-105"
  style={{
    backgroundImage: `url(${featured.poster})`,
    backgroundPosition: 'center 30%',
    filter: 'brightness(0.95)',
  }}
/>



<div className="absolute inset-0 bg-gradient-to-t from-[#16110a] via-[#16110a]/60 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-5 flex flex-col justify-end h-full py-14" style={{ minHeight: '480px' }}>
        <p className="text-xs uppercase tracking-widest text-[var(--amber)] mb-3 font-mono">Featured this week</p>
        <h2 className="marquee-font text-6xl md:text-8xl leading-none mb-4 text-[var(--cream)]">{featured.title}</h2>
        <div className="flex gap-2 mb-4">
          <Badge tone="amber">{featured.genre}</Badge>
          <Badge>{featured.rating}</Badge>
          <Badge>{featured.duration}</Badge>
        </div>

        <p className="text-sm text-[var(--dim)] max-w-md leading-relaxed mb-6">{featured.blurb}</p>

        <button
          onClick={onBrowse}
          className="self-start px-6 py-3 rounded-full bg-[var(--amber)] text-[#16110a] font-semibold text-sm hover:brightness-110 transition"
        >
          Book tickets →
        </button>
      </div>
    </div>
  )
}



function Browse({ onOpen }: { onOpen: (m: Movie) => void }) {
  return (
    <div className="max-w-6xl mx-auto px-5" style={{ paddingTop: '94px', paddingBottom: '40px' }}>
      <div className="mb-8">
        <h1 className="marquee-font text-5xl leading-none mb-2">Now Showing</h1>
        <p className="text-[var(--dim)] text-sm">Pick a film, choose a time, grab your seats.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {UNIQUE_MOVIES.map((m) => (
          <button
            key={m.id}
            onClick={() => onOpen(m)}
            className="text-left rounded-xl overflow-hidden bg-[var(--bg-card)] border border-[var(--line)] hover:border-[var(--amber)]/40 hover:bg-[var(--bg-card-hover)] transition-colors card-shadow group"
          >

            <div className="aspect-[3/4] relative overflow-hidden">
              <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-500">
                <PosterImg movie={m} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <span className="marquee-font text-2xl text-[var(--cream)] drop-shadow">{m.title}</span>
              </div>
            </div>

            <div className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Badge>{m.rating}</Badge>
                <Badge>{m.duration}</Badge>
              </div>

              <p className="text-xs text-[var(--dim)] leading-relaxed line-clamp-2">{m.blurb}</p>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-[var(--amber)] font-medium">From ${m.price}</span>
                <span className="text-[var(--dim)] text-xs">{m.times.length} showtimes</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}



function Detail({ movie, onBack, onAdd }: { movie: Movie; onBack: () => void; onAdd: (item: CartItem) => void }) {
  const [time, setTime] = useState<Showtime | null>(null)
  const [seats, setSeats] = useState<SeatEntry[]>([])
  const taken = useMemo(() => (time ? seededTaken(movie.id + time.time) : new Set<string>()), [time, movie.id])

  function toggle(id: string, premium: boolean) {
    setSeats((prev) => {
      const exists = prev.find((s) => s.id === id)
      if (exists) return prev.filter((s) => s.id !== id)
      return [...prev, { id, premium }]
    })
  }



  function priceOf(s: SeatEntry) { return movie.price + (s.premium ? 3 : 0) }

  const total = seats.reduce((sum, s) => sum + priceOf(s), 0)



  return (
    <div className="max-w-4xl mx-auto px-5 py-8">
      <button onClick={onBack} className="text-sm text-[var(--dim)] hover:text-[var(--amber)] mb-6 flex items-center gap-1">
        ← Back to films
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-6 mb-10">

        <div className="rounded-xl overflow-hidden aspect-[3/4]"><PosterImg movie={movie} /></div>
        <div>
          <div className="flex gap-2 mb-3">
            <Badge tone="amber">{movie.genre}</Badge>
            <Badge>{movie.rating}</Badge>
            <Badge>{movie.duration}</Badge>

          </div>

          <h1 className="marquee-font text-4xl mb-3">{movie.title}</h1>
          <p className="text-[var(--dim)] text-sm leading-relaxed max-w-lg">{movie.blurb}</p>
        </div>
      </div>



      <h2 className="text-sm uppercase tracking-wide text-[var(--dim)] mb-3">1. Choose a showtime</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
        {movie.times.map((t) => {
          const active = time?.time === t.time
          const low = t.seatsLeft <= 10
          return (
            <button
              key={t.time}
              onClick={() => { setTime(active ? null : t); setSeats([]) }}
              className={`p-3 rounded-lg border text-left transition-colors ${active ? 'border-[var(--amber)] bg-[var(--amber)]/10' : 'border-[var(--line)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)]'}`}

            >

              <div className="font-medium">{t.time}</div>
              <div className="text-xs text-[var(--dim)]">{t.hall}</div>
              {low && <div className="text-[11px] text-[var(--rose)] mt-1">Only {t.seatsLeft} left</div>}
            </button>

          )

        })}

      </div>



      {time && (
        <div className="mb-8">
          <h2 className="text-sm uppercase tracking-wide text-[var(--dim)] mb-3">2. Pick your seats</h2>
          <div className="bg-[var(--bg-card)] border border-[var(--line)] rounded-xl p-5">
            <div className="text-center mb-6">
              <div className="h-1 w-2/3 mx-auto rounded-full bg-gradient-to-r from-transparent via-[var(--amber)]/50 to-transparent mb-1" />
              <span className="text-[10px] uppercase tracking-widest text-[var(--dim)]">Screen</span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              {ROWS.map((row) => (
                <div key={row} className="flex items-center gap-1.5">
                  <span className="w-4 text-xs text-[var(--dim)] text-right">{row}</span>
                  {Array.from({ length: COLS }, (_, i) => i + 1).map((col) => {
                    const id = row + col
                    const premium = PREMIUM_ROWS.has(row)
                    const isTaken = taken.has(id)
                    const isSelected = seats.some((s) => s.id === id)

                    let cls = 'seat '
                    cls += isTaken ? 'taken' : isSelected ? 'selected' : premium ? 'premium' : 'standard'

                    return (
                      <div key={id} className={cls} onClick={() => !isTaken && toggle(id, premium)}>
                        {col}
                      </div>

                    )

                  })}

                </div>

              ))}

            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-6 pt-4 border-t border-[var(--line)] text-xs text-[var(--dim)]">
              <span className="flex items-center gap-1.5"><span className="w-3.5 h-3 rounded-sm bg-[#2c3742] inline-block" />Standard</span>
              <span className="flex items-center gap-1.5"><span className="w-3.5 h-3 rounded-sm bg-[#4a3a22] inline-block" />Premium +$3</span>
              <span className="flex items-center gap-1.5"><span className="w-3.5 h-3 rounded-sm bg-[var(--amber)] inline-block" />Selected</span>
              <span className="flex items-center gap-1.5"><span className="w-3.5 h-3 rounded-sm bg-[#1c2127] inline-block" />Taken</span>
            </div>
          </div>



          {seats.length > 0 && (
            <div className="mt-4 flex items-center justify-between bg-[var(--bg-card)] border border-[var(--amber)]/30 rounded-xl p-4">
              <div>
                <div className="text-xs text-[var(--dim)] mb-1">{seats.length} seat{seats.length > 1 ? 's' : ''} selected</div>
                <div className="text-sm">{seats.map((s) => s.id).sort().join(', ')}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="marquee-font text-2xl text-[var(--amber)]">${total}</span>
                <button
                  onClick={() => { onAdd({ movie, time, seats, total }); setTime(null); setSeats([]) }}
                  className="px-5 py-2.5 rounded-full bg-[var(--amber)] text-[#16110a] font-semibold text-sm hover:brightness-110 transition"
                >
                  Add to tickets
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}



function Cart({ cart, onRemove, onBack, onCheckout }: { cart: CartItem[]; onRemove: (i: number) => void; onBack: () => void; onCheckout: () => void }) {
  const total = cart.reduce((s, i) => s + i.total, 0)
  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-5 py-24 text-center">
        <div className="text-4xl mb-4 opacity-40">🎟️</div>
        <h2 className="marquee-font text-3xl mb-2">No tickets yet</h2>
        <p className="text-[var(--dim)] text-sm mb-6">Find a film you like and pick some seats.</p>
        <button onClick={onBack} className="px-5 py-2.5 rounded-full bg-[var(--amber)] text-[#16110a] font-semibold text-sm">Browse films</button>
      </div>
    )
  }

  return (

    <div className="max-w-2xl mx-auto px-5 py-8">
      <button onClick={onBack} className="text-sm text-[var(--dim)] hover:text-[var(--amber)] mb-6">← Continue browsing</button>
      <h1 className="marquee-font text-4xl mb-6">Your Tickets</h1>
      <div className="space-y-3 mb-6">
        {cart.map((item, i) => (
          <div key={i} className="flex gap-3 bg-[var(--bg-card)] border border-[var(--line)] rounded-xl p-3">
            <div className="w-14 h-20 rounded-lg overflow-hidden flex-shrink-0"><PosterImg movie={item.movie} /></div>
            <div className="flex-1 min-w-0">
              <div className="font-medium">{item.movie.title}</div>
              <div className="text-xs text-[var(--dim)]">{item.time.time} · {item.time.hall}</div>
              <div className="text-xs text-[var(--dim)] mt-1">Seats: {item.seats.map((s) => s.id).sort().join(', ')}</div>
            </div>

            <div className="flex flex-col items-end justify-between">
              <span className="text-[var(--amber)] font-medium">${item.total}</span>
              <button onClick={() => onRemove(i)} className="text-xs text-[var(--dim)] hover:text-[var(--rose)]">Remove</button>
            </div>
          </div>
        ))}

      </div>
      <div className="flex justify-between items-center border-t border-[var(--line)] pt-4 mb-6">
        <span className="text-[var(--dim)] text-sm">Total</span>
        <span className="marquee-font text-3xl text-[var(--amber)]">${total}</span>
      </div>
      <button onClick={onCheckout} className="w-full py-3.5 rounded-full bg-[var(--amber)] text-[#16110a] font-semibold hover:brightness-110 transition">
        Continue to checkout
      </button>
    </div>
  )
}



function Checkout({ cart, onBack, onConfirm }: { cart: CartItem[]; onBack: () => void; onConfirm: (name: string, email: string) => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const total = cart.reduce((s, i) => s + i.total, 0)

  function submit() {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Enter your name'
    if (!email.includes('@')) e.email = 'Enter a valid email'
    setErrors(e)
    if (Object.keys(e).length === 0) onConfirm(name, email)
  }



  return (
    <div className="max-w-md mx-auto px-5 py-10">
      <button onClick={onBack} className="text-sm text-[var(--dim)] hover:text-[var(--amber)] mb-6">← Back to tickets</button>
      <h1 className="marquee-font text-4xl mb-6">Checkout</h1>
      <div className="bg-[var(--bg-card)] border border-[var(--line)] rounded-xl p-4 mb-6">
        {cart.map((item, i) => (
          <div key={i} className="flex justify-between text-sm py-1.5">
            <span className="text-[var(--dim)]">{item.movie.title} · {item.seats.length} seat{item.seats.length > 1 ? 's' : ''}</span>
            <span>${item.total}</span>
          </div>
        ))}

        <div className="flex justify-between border-t border-[var(--line)] mt-2 pt-2 font-medium">
          <span>Total</span>
          <span className="text-[var(--amber)]">${total}</span>
        </div>
      </div>



      <label className="block text-xs uppercase tracking-wide text-[var(--dim)] mb-1">Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
        className="w-full bg-black/30 border border-[var(--line)] rounded-lg px-3 py-2.5 mb-1 text-sm focus:outline-none focus:border-[var(--amber)]/60" />
      {errors.name && <p className="text-[var(--rose)] text-xs mb-3">{errors.name}</p>}
      <label className="block text-xs uppercase tracking-wide text-[var(--dim)] mb-1 mt-3">Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
        className="w-full bg-black/30 border border-[var(--line)] rounded-lg px-3 py-2.5 mb-1 text-sm focus:outline-none focus:border-[var(--amber)]/60" />
      {errors.email && <p className="text-[var(--rose)] text-xs mb-3">{errors.email}</p>}



      <button onClick={submit} className="w-full mt-5 py-3.5 rounded-full bg-[var(--amber)] text-[#16110a] font-semibold hover:brightness-110 transition">
        Confirm & pay ${total}
      </button>
    </div>
  )
}



function Success({ name, cart, onDone }: { name: string; cart: CartItem[]; onDone: () => void }) {
  const total = cart.reduce((s, i) => s + i.total, 0)
  const ref = 'MRQ-' + Math.random().toString(36).slice(2, 8).toUpperCase()

  return (
    <div className="max-w-md mx-auto px-5 py-16 text-center">
      <div className="text-5xl mb-4">🎬</div>
      <h1 className="marquee-font text-4xl mb-2">You're all set, {name.split(' ')[0]}</h1>
      <p className="text-[var(--dim)] text-sm mb-6">Booking reference <span className="text-[var(--amber)]">{ref}</span></p>
      <div className="bg-[var(--bg-card)] border border-[var(--line)] rounded-xl p-4 mb-6 text-left space-y-2">
      
        {cart.map((item, i) => (
          <div key={i} className="text-sm flex justify-between">
            <span>{item.movie.title} · {item.time.time}</span>
            <span className="text-[var(--amber)]">${item.total}</span>
          </div>
        ))}

        <div className="flex justify-between border-t border-[var(--line)] pt-2 font-medium">
          <span>Total paid</span><span>${total}</span>
        </div>
      </div>
      <button onClick={onDone} className="px-6 py-3 rounded-full bg-[var(--amber)] text-[#16110a] font-semibold">
        Book more tickets
      </button>
    </div>
  )

}



/* ---------------- app root ---------------- */
export default function App() {
  const [screen, setScreen] = useState<AppScreen>('browse')
  const [movie, setMovie] = useState<Movie | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [buyer, setBuyer] = useState({ name: '', email: '' })

  return (
    <div className="min-h-screen">
      <Header
        cartCount={cart.length}
        currentScreen={screen}
        onLogo={() => setScreen('browse')}
        onNavigate={setScreen}
        onCart={() => setScreen('cart')}
      />
      {screen === 'browse' && (
        <>
          <HeroBanner onBrowse={() => document.getElementById('browse-grid')?.scrollIntoView({ behavior: 'smooth' })} />
          <div id="browse-grid">
            <Browse onOpen={(m) => { setMovie(m); setScreen('detail') }} />
          </div>
        </>
      )}

      {screen === 'detail' && movie && (
        <Detail movie={movie} onBack={() => setScreen('browse')}
          onAdd={(item) => { setCart((c) => [...c, item]); setScreen('cart') }} />
      )}

      {screen === 'cart' && (
        <Cart cart={cart} onBack={() => setScreen(movie ? 'detail' : 'browse')}
          onRemove={(i) => setCart((c) => c.filter((_, idx) => idx !== i))}
          onCheckout={() => setScreen('checkout')} />
      )}
      {screen === 'checkout' && (
        <Checkout cart={cart} onBack={() => setScreen('cart')}
          onConfirm={(name, email) => { setBuyer({ name, email }); setScreen('success') }} />
      )}

      {screen === 'success' && (
        <Success name={buyer.name} cart={cart} onDone={() => { setCart([]); setMovie(null); setScreen('browse') }} />
      )}
      {screen === 'comingSoon' && <ComingSoon />}
      {screen === 'menu' && <Menu />}
      {screen === 'events' && <Events />}
    </div>

  )

}
