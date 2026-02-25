import { JourneyCard } from "./journey-card";

const JOURNEYS = [
  {
    title: "The Alps Traverse",
    region: "France → Switzerland → Italy",
    distance: "1,240 km",
    elevation: "28,500 m",
    days: "18 days",
    description:
      "Galibier, Stelvio, Gotthard — a chain of legendary cols connecting three countries through the heart of Europe's highest roads.",
    gradient:
      "linear-gradient(160deg, #1e3a5f 0%, #2d6a8f 30%, #7fb3d3 60%, #d4e6f1 80%, #f0f5f9 100%)",
  },
  {
    title: "Patagonia End-to-End",
    region: "Chile & Argentina",
    distance: "2,800 km",
    elevation: "18,200 m",
    days: "32 days",
    description:
      "From the Lake District's emerald valleys to the windswept steppe of Tierra del Fuego, battling headwinds and chasing glaciers.",
    gradient:
      "linear-gradient(160deg, #1a1a2e 0%, #16213e 25%, #4a6fa5 50%, #89b4c8 75%, #e8dcc8 100%)",
  },
  {
    title: "Silk Road Segments",
    region: "Georgia → Uzbekistan",
    distance: "3,100 km",
    elevation: "21,700 m",
    days: "40 days",
    description:
      "Ancient trade routes reimagined on carbon fiber — from the Caucasus passes to the turquoise domes of Samarkand.",
    gradient:
      "linear-gradient(160deg, #2c1810 0%, #8b4513 25%, #cd853f 50%, #daa520 75%, #f4e5c2 100%)",
  },
  {
    title: "Taiwan Loop",
    region: "Taiwan",
    distance: "920 km",
    elevation: "12,300 m",
    days: "12 days",
    description:
      "The island's coastal highway and Taroko Gorge climb — tropical heat, misty peaks, and the best 7-Eleven stops on earth.",
    gradient:
      "linear-gradient(160deg, #0d2818 0%, #1a4731 25%, #2d8659 50%, #52b788 75%, #b7e4c7 100%)",
  },
  {
    title: "Cape Town to Cairo",
    region: "South Africa → Egypt",
    distance: "12,500 km",
    elevation: "45,000 m",
    days: "180 days",
    description:
      "The ultimate north-south traverse of Africa. Savanna, desert, jungle, and everything between — the ride of a lifetime.",
    gradient:
      "linear-gradient(160deg, #1a0a00 0%, #8b3a00 25%, #e07020 50%, #f5a623 75%, #ffeaa7 100%)",
  },
  {
    title: "Japan's Shimanami Kaido & Beyond",
    region: "Japan",
    distance: "1,650 km",
    elevation: "14,800 m",
    days: "21 days",
    description:
      "Island-hopping bridges, mountain onsen detours, and the quiet perfection of rural Japanese roads at dawn.",
    gradient:
      "linear-gradient(160deg, #1a1423 0%, #3d2451 25%, #e8a0bf 50%, #f5c6d0 75%, #fef0f0 100%)",
  },
] as const;

export function JourneysSection() {
  return (
    <section
      id="journeys"
      className="bg-[var(--color-background)] py-20 md:py-28"
      aria-label="Featured journeys"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-warm)]">
            Featured Routes
          </p>
          <h2 className="font-heading text-3xl font-bold text-[var(--color-text)] md:text-4xl">
            Journeys That Shaped the Rider
          </h2>
          <p className="mt-4 text-[var(--color-text-muted)] md:text-lg">
            Each route is a story — of landscapes conquered, limits pushed, and
            the simple joy of moving under your own power.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {JOURNEYS.map((journey) => (
            <JourneyCard key={journey.title} {...journey} />
          ))}
        </div>
      </div>
    </section>
  );
}
