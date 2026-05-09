const cache = {};

export async function geocodeLocation(location, retries = 2) {
  if (cache[location]) return cache[location];

  const API_KEY = import.meta.env.VITE_LOCATIONIQ_KEY;

  try {
    const res = await fetch(
      `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${encodeURIComponent(
        location + ', Belgium'
      )}&format=json`
    );

    if (res.status === 429 && retries > 0) {
      await new Promise((r) => setTimeout(r, 1000));
      return geocodeLocation(location, retries - 1);
    }

    if (!res.ok) return null;

    const data = await res.json();
    if (!data.length) return null;

    const result = {
      lat: Number(data[0].lat),
      lng: Number(data[0].lon),
    };

    cache[location] = result;
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
}