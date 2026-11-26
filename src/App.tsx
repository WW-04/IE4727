import { useState, useEffect } from 'react'
import { NAV_LINKS } from './NavBar.tsx'
import ComingSoon from './ComingSoon.tsx'
import Menu from './Menu.tsx'
import Events from './Event.tsx'

/* ---------------- types ---------------- */
type Showtime = { time: string; hall: string; seatsLeft: number }
type Movie = {
  id: string
  title: string
  genre: string
  rating: string
  duration: string
  price: number
  poster: string
  blurb: string
  times: Showtime[]
}
type DbMovie = {
  _id: string
  movieID: string
  title: string
  price: number
  poster?: string
  genre?: string
  rating?: string
  duration?: string
  sypnosis?: string
  times?: Showtime[]
}
type SeatEntry = { id: string; premium: boolean }
type CartItem = { movie: Movie; time: Showtime; seats: SeatEntry[]; total: number }
type AppScreen = 'browse' | 'detail' | 'cart' | 'checkout' | 'success' | 'comingSoon' | 'menu' | 'events'
type NavigationScreen = (typeof NAV_LINKS)[number]['screen']

const ROWS = ['A', 'B', 'C', 'D', 'E']
const COLS = 8
const PREMIUM_ROWS = new Set(['D', 'E'])

/* ---------------- different functions which serves for functionalities needed in the webpage---------------- */

function PosterImg({ movie }: { movie: Movie }) {
  return (
    <img
      className="poster-img"
      src={movie.poster}
      alt={movie.title + ' poster'}
      onError={(e) => {
        ;(e.target as HTMLImageElement).src =
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
            <span className="lumos-logo font-display text-sm font-bold text-amber-400 tracking-wider">
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
          onClick={()=>{
            if(cartCount===0){
              alert("Your booking cart is empty. Please secure your seat for a movie before proceeding to check out.")
            }else{
              onCart();
            }
          }}
          className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--line)] hover:border-[var(--amber)]/40 hover:bg-white/5 transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
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

function HeroBanner({ onBrowse }: { onBrowse: () => void }) {
  const featured = {
    title: "The Odyssey",
    poster: "https://image.tmdb.org/t/p/original/5rhTDKUhPYvpdQIijFIs5VoWsON.jpg",
    genre: "Adventure",
    rating: "NC 16",
    duration: "2h 40m",
    blurb: "Christopher Nolan’s, The Odyssey, in 35mm."
  }
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

function BrowseScreen({
  loading,
  error,
  movies,
  onOpen,
}: {
  loading: boolean,
  error: string | null,
  movies: Movie[],
  onOpen: (movie: Movie) => void
}) {
  if (loading) return <p className="p-8 text-center text-[var(--dim)]">Loading movies...</p>
  if (error) return <p className="p-8 text-center text-[var(--rose)]">{error}</p>
  if (movies.length === 0) return <p className="p-8 text-center text-[var(--dim)]">No movies found in the database</p>
  return (
    <>
      <HeroBanner onBrowse={() =>
        document.getElementById('browse-grid')
          ?.scrollIntoView({ behavior: 'smooth' })
      } />
      <div id="browse-grid">
        <Browse movies={movies} onOpen={onOpen} />
      </div>
    </>
  )
}

function Browse({ movies, onOpen }: { movies: Movie[]; onOpen: (m: Movie) => void }) {
  return (
    <div className="max-w-6xl mx-auto px-5" style={{ paddingTop: '94px', paddingBottom: '40px' }}>
      <div className="mb-8">
        <h1 className="marquee-font text-5xl leading-none mb-2">Now Showing</h1>
        <p className="text-[var(--dim)] text-sm">Pick a film, choose a time, grab your seats.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {movies.map((m) => (
          <button
            key={m.id}
            onClick={() => onOpen(m)}
            className="text-left rounded-xl overflow-hidden bg-[var(--bg-card)] border border-[var(--line)] hover:border-[var(--amber)]/40 hover:bg-[var(--bg-card-hover)] transition-colors group"
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
  const [taken, setTaken] = useState<Set<string>>(new Set<string>())
  const [loadingSeats, setLoadingSeats] = useState<boolean>(false)
  const [seatError, setSeatError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBookedSeats() {
      if (!time) {
        setTaken(new Set())
        setSeatError(null)
        return
      }
      try {
        setLoadingSeats(true)
        setSeatError(null)
        const response = await fetch('http://localhost:5001/api/booked_seats')
        if (!response.ok) {
          throw new Error('Failed to fetch bookings')
        }
        const takenSet = new Set<string>()
        const allBookings = await response.json()
        allBookings.forEach((booking: any) => {
          booking.items.forEach((item: any) => {
            if (item.movieID === movie.id && item.timeSlot === time.time) {
              item.seats.forEach((seat: any) => {
                takenSet.add(seat.id)
              })
            }
          })
        })
        setTaken(takenSet)
      } catch (error) {
        console.error("Failure to load taken seats: ", error)
        setSeatError("Unable to load seat availability. Please check your connection and try again.")
      } finally {
        setLoadingSeats(false)
      }
    }
    fetchBookedSeats()
  }, [time, movie.id])

  function toggle(id: string, premium: boolean) {
    if (taken.has(id)) return
    setSeats(prev =>
      prev.some(s => s.id === id)
        ? prev.filter(s => s.id !== id)
        : [...prev, { id, premium }]
    )
  }

  const total = seats.reduce(
    (sum, s) => sum + movie.price + (s.premium ? 3 : 0),
    0
  )

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
          <h1 className="text-4xl mb-3">{movie.title}</h1>
          <p className="text-[var(--dim)] text-sm leading-relaxed max-w-lg">{movie.blurb}</p>
        </div>
      </div>

      <h2 className="text-sm uppercase tracking-wide text-[var(--dim)] mb-3">1. Choose a showtime</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
        {movie.times.map((t) => {
          const active = time?.time === t.time
          return (
            <button
              key={t.time}
              onClick={() => { setTime(active ? null : t); setSeats([]) }}
              className={`p-3 rounded-lg border text-left transition-colors ${active ? 'border-[var(--amber)] bg-[var(--amber)]/10' : 'border-[var(--line)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)]'}`}
            >
              <div className="font-medium">{t.time}</div>
              <div className="text-xs text-[var(--dim)]">{t.hall}</div>
            </button>
          )
        })}
      </div>

      {time && (
        <div className="mb-8">
          <h2 className="text-sm uppercase tracking-wide text-[var(--dim)] mb-3">2. Pick your seats</h2>
          <div className="bg-[var(--bg-card)] border border-[var(--line)] rounded-xl p-5">
            
            {loadingSeats && (
              <div className="text-center py-6 text-sm text-[var(--dim)]">
                Checking seat availability...
              </div>
            )}

            {seatError && (
              <div className="mb-4 p-3 rounded-lg bg-[var(--rose)]/10 border border-[var(--rose)]/30 text-[var(--rose)] text-xs">
                {seatError}
              </div>
            )}

            {!loadingSeats && !seatError && (
              <>
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
                        const seatClass = `seat ${
                          isTaken ? 'taken' :
                          isSelected ? 'selected' :
                          premium ? 'premium' :
                          'standard'
                        }`

                        return (
                          <button key={id} className={seatClass} onClick={() => toggle(id, premium)}>
                            {col}
                          </button>
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
              </>
            )}
          </div>

          {seats.length > 0 && !seatError && !loadingSeats && (
            <div className="mt-4 flex items-center justify-between bg-[var(--bg-card)] border border-[var(--amber)]/30 rounded-xl p-4">
              <div>
                <div className="text-xs text-[var(--dim)] mb-1">{seats.length} seat{seats.length > 1 ? 's' : ''} selected</div>
                <div className="text-sm">{seats.map((s) => s.id).sort().join(', ')}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl text-[var(--amber)]">${total}</span>
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
        <h2 className="text-3xl mb-2">No tickets yet</h2>
        <p className="text-[var(--dim)] text-sm mb-6">Find a film you like and pick some seats.</p>
        <button onClick={onBack} className="px-5 py-2.5 rounded-full bg-[var(--amber)] text-[#16110a] font-semibold text-sm">Browse films</button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <button onClick={onBack} className="text-sm text-[var(--dim)] hover:text-[var(--amber)] mb-6">← Continue browsing</button>
      <h1 className="text-4xl mb-6">Your Tickets</h1>
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
        <span className="text-3xl text-[var(--amber)]">${total}</span>
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const total = cart.reduce((s, i) => s + i.total, 0)

  async function handleCheckout() {
    const newErrors = {
      name: name.trim() ? '' : "Please enter your name",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? '' : "Please enter a valid email"
    }
    setErrors(newErrors)
    if (newErrors.name || newErrors.email) return
    try {
      setIsSubmitting(true)
      const response = await fetch('http://localhost:5001/api/booked_seats', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          name: name,
          email: email,
          total: total,
          cart: cart
        })
      })
      if (!response.ok) {
        throw new Error('Server failed to save booking')
      }
      const data = await response.json()
      console.log("Customer's booking details:", data.message)
      onConfirm(name, email)
    } catch (error) {
      console.error("Booking failed:", error)
      alert("Booking could not be completed. Please check server is running before trying again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-5 py-10">
      <button onClick={onBack} className="text-sm text-[var(--dim)] hover:text-[var(--amber)] mb-6">← Back to tickets</button>
      <h1 className="text-4xl mb-6">Checkout</h1>
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
      
      <button 
        onClick={handleCheckout} 
        disabled={isSubmitting}
        className="w-full mt-5 py-3.5 rounded-full bg-[var(--amber)] text-[#16110a] font-semibold hover:brightness-110 transition disabled:opacity-50">
        {isSubmitting ? 'Processing...' : `Confirm & pay $${total}`}
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
      <h1 className="text-4xl mb-2">You're all set, {name.split(' ')[0]}</h1>
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
  const [cart, setCart] = useState<CartItem[]>(()=>
  {
    try {
      const saved = localStorage.getItem('lumos_cart')
      return saved ? JSON.parse(saved) : []
    } catch (e) {
      console.error('Failed to load cart from localStorage', e)
      return []
    }
  })
  const [buyer, setBuyer] = useState({ name: '', email: '' })
  useEffect(() => {
    const savedCart = localStorage.getItem('lumos_cart')
    try {
      localStorage.setItem('lumos_cart', JSON.stringify(cart))
    } catch (e) {
      console.error('Failed to save cart to localStorage', e)
    }
  }, [cart])
  useEffect(() => {
    localStorage.setItem('lumos_cart', JSON.stringify(cart))
  }, [cart])
  
  const [dbMovies, setDbMovies] = useState<DbMovie[]>([])
  const [loadingMovies, setLoadingMovies] = useState<boolean>(true)
  const [movieError, setMovieError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch('http://localhost:5001/api/movies')
        if (!response.ok) {
          throw new Error('Failed to fetch movies')
        }
        const data: DbMovie[] = await response.json()
        setDbMovies(data)
      } catch (error) {
        console.error('Error fetching movies:', error)
        setMovieError('Unable to load movies. Please try again.')
      } finally {
        setLoadingMovies(false)
      }
    }

    fetchMovies()
  }, [])

  const fetchedMovies: Movie[] = dbMovies.map((m) => ({
    id: m.movieID,
    title: m.title,
    genre: m.genre ?? 'General',
    rating: m.rating ?? 'Not rated',
    duration: m.duration ?? 'N/A',
    price: m.price,
    poster: m.poster ?? '',
    blurb: m.sypnosis ?? '',
    times: m.times ?? [],
  }))

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
        <BrowseScreen
          loading={loadingMovies}
          error={movieError}
          movies={fetchedMovies}
          onOpen={(m) => {
            setMovie(m)
            setScreen('detail')
          }}
        />
      )}
      
      {screen === 'detail' && movie && (
        <Detail 
          movie={movie} 
          onBack={() => setScreen('browse')}
          onAdd={(item) => { 
            setCart((c) => [...c, item]); 
            setScreen('cart') 
          }} 
        />
      )}

      {screen === 'cart' && (
        <Cart 
          cart={cart} 
          onBack={() => setScreen(movie ? 'detail' : 'browse')}
          onRemove={(i) => setCart((c) => c.filter((_, idx) => idx !== i))}
          onCheckout={() => setScreen('checkout')} 
        />
      )}
      
      {screen === 'checkout' && (
        <Checkout 
          cart={cart} 
          onBack={() => setScreen('cart')}
          onConfirm={(name, email) => { 
            setBuyer({ name, email }); 
            setScreen('success') 
          }} 
        />
      )}

      {screen === 'success' && (
        <Success 
          name={buyer.name} 
          cart={cart} 
          onDone={() => { 
            setCart([]); 
            setMovie(null); 
            setScreen('browse') 
          }} 
        />
      )}
      
      {screen === 'comingSoon' && <ComingSoon />}
      {screen === 'menu' && <Menu />}
      {screen === 'events' && <Events />}
    </div>
  )
}