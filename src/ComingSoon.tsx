const COMING_SOON_MOVIES = [
  {
    id: "cs1",
    title: "Dune Part III",
    genre: "Adventure, Sci-Fi",
    duration: "2h 20mins",
    director: "Denis Villeneuve",
    starring: "Timothée Chalamet, Zendaya, Jason Momoa, Florence Pugh, Rebecca Ferguson",
    poster: "https://image.tmdb.org/t/p/original/vyaHWAhXRC7TVZdPYRJYL6QsZSn.jpg",
    date: "17 December",
    blurb: "Dune: Part Three is based on the novel Dune Messiah by Frank Herbert and delivers the epic conclusion to Villeneuve’s trilogy.",
  },
  {
    id: "cs2",
    title: "Sense and Sensibility",
    genre: "Drama, Romance",
    duration: "2h 12mins",
    director: "Georgia Oakley",
    starring: "Daisy Edgar-Jones, Esmé Creed-Miles, Caitríona Balfe, Frank Dillane, George MacKay",
    poster: "https://image.tmdb.org/t/p/original/p1vgrJqcZMppdRZ2eoHIlpdTltA.jpg",
    date: "19 October",
    blurb: "Adapted from Jane Austen’s 1811 debut novel, Sense and Sensibility follows the Dashwood sisters Elinor, Marianne, and Margaret as they are forced to move from Sussex to Devon following the death of their father.",
  },
  {
    id: "cs3",
    title: "The Weight",
    genre: "Action, Adventure",
    duration: "1h 53mins",
    director: "Padraic McKinley",
    starring: "Ethan Hawke, Russell Crowe, Julia Jones",
    poster: "https://image.tmdb.org/t/p/original/eeH1DeRjCCBsOW6D869mx6jRuA0.jpg",
    date: "29 October",
    blurb: "Desperate to save what is left of his family, during the height of the Great Depression a battle-scarred veteran is hired to help smuggle a fortune in gold across 100 miles of impenetrable wilderness.",
  },
];

type ComingSoonMovie = (typeof COMING_SOON_MOVIES)[number];

export default function ComingSoon() {
  return (
    <section className="w-full bg-[var(--bg)] px-4 py-16 text-[var(--cream)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2">
            </div>
            <h1 className="mt-2 marquee-font text-5xl leading-none">
              Coming Soon
            </h1>
            <p className="mt-2 text-sm text-[var(--dim)]">
              Discover exciting movies arriving in cinemas soon.
            </p>
          </div>
        </div>

        {/* Movie List */}
        <div className="grid grid-cols-1 gap-8">
          {COMING_SOON_MOVIES.map((movie: ComingSoonMovie) => (
            <article
              key={movie.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--bg-card)] shadow-xl transition-all duration-300 hover:border-[var(--amber)]/40 hover:bg-[var(--bg-card-hover)] md:flex-row"
            >
              {/* Poster with Cinematic Gradient Overlay */}
              <div className="relative w-full shrink-0 overflow-hidden md:w-72">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="h-full min-h-[380px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
                
                {/* Floating Date Badge on Mobile */}
                <span className="absolute top-4 left-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold backdrop-blur-md md:hidden border border-white/10 text-[var(--cream)]">
                  Coming {movie.date}
                </span>
              </div>

              {/* Movie Information */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  {/* Release Date (Desktop) */}
                  <div className="hidden md:flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--amber)]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--amber)] border border-[var(--amber)]/30">
                      Coming {movie.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="mt-3 marquee-font text-3xl text-[var(--cream)] group-hover:text-[var(--amber)] transition-colors">
                    {movie.title}
                  </h2>

                  {/* Genre & Duration Badges */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white/5 px-3 py-0.5 text-xs border border-white/10 text-[var(--dim)]">
                      {movie.genre}
                    </span>
                    <span className="rounded-full bg-white/5 px-3 py-0.5 text-xs border border-white/10 text-[var(--dim)]">
                      {movie.duration}
                    </span>
                  </div>

                  {/* Cast & Crew Grid */}
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 border-t border-[var(--line)] pt-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        Director
                      </p>
                      <p className="mt-1 text-sm font-medium text-[var(--cream)]">
                        {movie.director}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        Starring
                      </p>
                      <p className="mt-1 text-sm text-[var(--dim)] line-clamp-1">
                        {movie.starring}
                      </p>
                    </div>
                  </div>

                  {/* Blurb */}
                  <p className="mt-4 text-sm leading-relaxed text-[var(--dim)]">
                    {movie.blurb}
                  </p>
                </div>

                {/* Action Footer */}
                <div className="mt-8 flex items-center justify-between border-t border-[var(--line)] pt-6">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--amber)] px-5 py-2.5 text-sm font-semibold text-[#16110a] shadow-lg transition-all hover:brightness-110 active:scale-95"
                  >
                    <span>View Movie</span>
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                  
                  <span className="text-xs text-[var(--dim)] hidden sm:inline">
                    Cinematic Release
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
