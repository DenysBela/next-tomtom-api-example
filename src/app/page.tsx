//src/app/page.tsx

import Map from "../components/Map";

export default function Home() {
  const tomtomApiKey = process.env.TOMTOM_API_KEY;

  return (
    <div>
      <header>Header</header>
      <main>
        <div style={{ width: "100vw", height: "100vh" }}>
          <Map
            apiKey={tomtomApiKey}
            lat={54.330308}
            lng={10.113895}
            zoom={10}
          />
        </div>
      </main>
      <footer>Footer</footer>
    </div>
  );
}

