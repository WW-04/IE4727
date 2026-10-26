const EVENTS = [
  {
    id: "cs1",
    title: "Fight Club (1999)",
    genre: "Dark Comedy, Psychological Drama",
    duration: "2h 19mins",
    director: "David Fincher",
    starring: "Brad Pitt, Edward Norton",
    poster:
      "https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    date: "1 December",
    blurb:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
  },
  {
    id: "cs2",
    title: "Back to the Future (1985)",
    genre: "Adventure, Comedy",
    duration: "1h 56mins",
    director: "Robert Zemeckis",
    starring: "Michael J. Fox, Christopher Lloyd",
    poster:
      "https://image.tmdb.org/t/p/original/z6CvKSlJciRPgagU49T2Dj6nLrS.jpg",
    date: "9 December",
    blurb:
      "Marty McFly, a 17-year-old high school student, is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.",
  },
  {
    id: "cs3",
    title: "The Shining (1980)",
    genre: "Psychological Horror",
    duration: "2h 26mins",
    director: "Stanley Kubrick",
    starring: "Jack Nicholson, Shelley Duvall, Danny Lloyd",
    poster:
      "https://image.tmdb.org/t/p/original/k1qmP045Mz0wu7BRY8v07rdEF65.jpg",
    date: "18 December",
    blurb:
      "A family heads to an isolated hotel for the winter, where a sinister presence influences the father into violence. At the same time, his psychic son sees horrifying forebodings from both the past and the future.",
  },
  {
    id: "cs4",
    title: "When Harry Met Sally... (1989)",
    genre: "Romance, Comedy",
    duration: "1h 35mins",
    director: "Rob Reiner",
    starring: "Billy Crystal, Meg Ryan",
    poster:
      "https://image.tmdb.org/t/p/original/dZDmMTvAtKn44s1l6hR0Q0jnPAQ.jpg",
    date: "31 December",
    blurb:
      "Harry and Sally have known each other for years and become close friends, but they wonder whether romance could ruin their friendship.",
  },
];

const ChristmasSpecials = [
  {
    id: "xmas1",
    title: "It's a Wonderful Life (1946)",
    genre: "Family, Drama",
    duration: "2h 10mins",
    director: "Frank Capra",
    starring: "James Stewart, Donna Reed",
    poster:
      "https://image.tmdb.org/t/p/original/j4ThWGY9WLbVpApjjRBy4bm4guZ.jpg",
    date: "25 December",
    blurb:
      "An angel is sent from Heaven to help a desperately frustrated businessman see the value of his own life.",
  },
  {
    id: "xmas2",
    title: "While You Were Sleeping (1995)",
    genre: "Romance, Comedy",
    duration: "1h 43mins",
    director: "Jon Turteltaub",
    starring: "Sandra Bullock, Bill Pullman",
    poster:
      "https://image.tmdb.org/t/p/original/tIckkIsb5aDvu4W9kQ19Yfxc7Ow.jpg",
    date: "25 December",
    blurb:
      "A transit worker rescues a commuter and is mistaken for his fiancée by his family. As the misunderstanding grows, she finds herself falling for his brother.",
  },
  {
    id: "xmas3",
    title: "The Holdovers (2023)",
    genre: "Drama, Comedy",
    duration: "2h 13mins",
    director: "Alexander Payne",
    starring: "Paul Giamatti, Dominic Sessa",
    poster:
      "https://image.tmdb.org/t/p/original/7hycaqHY0IJvZBYGzibYk7XCLma.jpg",
    date: "25 December",
    blurb:
      "A curmudgeonly instructor stays at a New England boarding school over Christmas break, forming an unlikely bond with a stranded student and the school's head cook.",
  },
];

export default function Events() {
  // Split the main screenings around Christmas Specials.
  const firstScreenings = EVENTS.filter((event) =>
    ["cs1", "cs2", "cs3"].includes(event.id)
  );

  const finalScreenings = EVENTS.filter((event) =>
    ["cs4"].includes(event.id)
  );

  const renderMovieCard = (event) => (
    <article
      key={event.id}
      className="flex flex-col overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--bg-card)] shadow-xl transition-colors hover:border-[var(--amber)]/40"
    >
      {/* Landscape Movie Still */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-90">
        <img
          src={event.poster}
          alt={`${event.title} movie still`}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-xs font-semibold text-[var(--cream)] backdrop-blur-md">
          Coming {event.date}
        </span>
      </div>

      {/* Movie Information */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-4">
        <div>
          <h2 className="marquee-font mt-1 text-3xl text-[var(--cream)]">
            {event.title}
          </h2>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-xs text-[var(--dim)]">
              {event.genre}
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-xs text-[var(--dim)]">
              {event.duration}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 border-t border-[var(--line)] pt-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Director
              </p>
              <p className="mt-1 text-sm font-medium text-[var(--cream)]">
                {event.director}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Starring
              </p>
              <p className="mt-1 text-sm text-[var(--dim)]">
                {event.starring}
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-[var(--dim)]">
            {event.blurb}
          </p>
        </div>

        {/* Action Footer */}
        <div className="mt-8 flex items-center justify-between border-t border-[var(--line)] pt-4">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--amber)] px-5 py-2.5 text-sm font-semibold text-[#16110a] shadow-lg"
          >
            <span>View Movie</span>
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );

  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      {/* Page Header */}
      <p className="mb-3 text-xs uppercase tracking-widest text-[var(--amber)]">
        Special screening
      </p>

      <h1 className="limelight-regular mb-2 text-5xl leading-none">
        December Retro Film Festival
      </h1>

      <p className="mb-8 text-sm text-[var(--dim)]">
        Catch the return of old movies on the big screen
      </p>

      {/* First Three Screenings */}
      <div className="grid grid-cols-1 gap-4">
        {firstScreenings.map(renderMovieCard)}
      </div>

      {/* Christmas Specials - Horizontal Scroll */}
      <section className="mt-16">
        <div className="mb-5">
          <h2 className="limelight-regular text-4xl text-[#1E792C]">
            Christmas Specials
          </h2>

          <p className="mt-2 text-sm text-[var(--dim)]">
            Warm your Christmas with these Christmas specials
          </p>
        </div>

        <div
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
          aria-label="Christmas special movie screenings"
        >
          {ChristmasSpecials.map((movie) => (
            <article
              key={movie.id}
              className="w-[260px] shrink-0 snap-start overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--bg-card)] shadow-lg transition-colors hover:border-[var(--amber)]/50 sm:w-[300px]"
            >
              {/* Landscape Movie Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={movie.poster}
                  alt={`${movie.title} movie still`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />

                <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-xs font-semibold text-[var(--cream)] backdrop-blur-md">
                  {movie.date}
                </span>
              </div>

              {/* Christmas Movie Details */}
              <div className="p-4">
                <h3 className="marquee-font line-clamp-2 text-xl text-[var(--cream)]">
                  {movie.title}
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-[var(--dim)]">
                    {movie.genre}
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-[var(--dim)]">
                    {movie.duration}
                  </span>
                </div>

                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--dim)]">
                  {movie.blurb}
                </p>

                <div className="mt-4 border-t border-[var(--line)] pt-4">
                  <p className="text-xs text-neutral-500">Director</p>
                  <p className="mt-1 text-sm text-[var(--cream)]">
                    {movie.director}
                  </p>

                  <p className="mt-3 text-xs text-neutral-500">Starring</p>
                  <p className="mt-1 text-sm text-[var(--dim)]">
                    {movie.starring}
                  </p>
                </div>

                <button
                  type="button"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--amber)] px-4 py-2 text-sm font-semibold text-[#16110a]"
                >
                  View Movie
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Final Screening: When Harry Met Sally */}
      <div className="mt-4 grid grid-cols-1 gap-4">
        {finalScreenings.map(renderMovieCard)}
      </div>
    </main>
  );
}
