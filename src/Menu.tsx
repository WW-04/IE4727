const MENU_ITEMS = [
  { name: 'Classic Popcorn', detail: 'Freshly made and choice of sweet, salty or mix', price: '$7' },
  { name: 'Loaded Nachos', detail: 'Tortilla chips with warm cheese poured over topped with bacon bits', price: '$9' },
  { name: 'Soft Drink', detail: 'Choose from coke, iced lemon tea, sprite or mountain dew', price: '$5' },
];
const PROMOTIONS = [
  {
    title: 'Weekday bundle',
    detail: 'Enjoy a movie with a snack choice(+$2 for nachos) and drink for just $14',
  },
  {
    title: 'Family Sunday',
    detail: 'Book four tickets to a family film and receive a complimentary popcorn.',
  },
  {
    title: 'Student Price',
    detail: 'Students can enjoy any movie for just $7 on weekdays before 6pm. A valid student ID is required.',
  },
  {
    title: 'NSF Promotion',
    detail: 'NSFs can get a movie ticket, one small popcorn and one drink for just $13. A valid NSF ID is required.',
  },
];
export default function Menu() {
  return (
    <main className="max-w-4xl mx-auto px-5 py-12">
      {/* Menu */}
      <section className="mb-16">
        <p className="text-xs uppercase tracking-widest text-[var(--amber)] mb-3">
          Concessions
        </p>

        <h1 className="marquee-font text-5xl leading-none mb-2">
          Menu
        </h1>

        <p className="text-[var(--dim)] text-sm mb-8">
          Complete your cinema visit with a classic snack.
        </p>

        <div className="grid gap-3">
          {MENU_ITEMS.map((item) => (
            <article
              key={item.name}
              className="flex items-center justify-between gap-6 rounded-xl border border-[var(--line)] bg-[var(--bg-card)] p-5"
            >
              <div>
                <h2 className="font-semibold text-[var(--cream)]">
                  {item.name}
                </h2>

                <p className="mt-1 text-sm text-[var(--dim)]">
                  {item.detail}
                </p>
              </div>

              <span className="marquee-font text-2xl text-[var(--amber)]">
                {item.price}
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* Promotions */}
      <section>
        <p className="text-xs uppercase tracking-widest text-[var(--amber)] mb-3">
          Special offers
        </p>

        <h2 className="marquee-font text-5xl leading-none mb-2">
          Promotions
        </h2>

        <p className="text-[var(--dim)] text-sm mb-8">
          More ways to enjoy the big screen for less.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {PROMOTIONS.map((promotion) => (
            <article
              key={promotion.title}
              className="rounded-xl border border-[var(--line)] bg-[var(--bg-card)] p-6"
            >
              <span className="mb-5 block h-1 w-12 rounded-full bg-[var(--amber)]" />

              <h3 className="marquee-font text-3xl text-[var(--cream)]">
                {promotion.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[var(--dim)]">
                {promotion.detail}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
