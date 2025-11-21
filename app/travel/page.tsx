export default function TravelPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Travel Map
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            An interactive map showing all the countries I&apos;ve visited.
            Coming soon with Mapbox integration and travel photos.
          </p>
        </div>
      </div>
    </main>
  );
}
