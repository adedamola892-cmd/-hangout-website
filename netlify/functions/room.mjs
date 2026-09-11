import { getStore } from "@netlify/blobs";

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });

export default async (req) => {
  const url = new URL(req.url);
  const key = (url.searchParams.get("key") || "").toUpperCase();

  if (!/^ROOM:[A-Z]{4}$/.test(key)) {
    return json({ error: "Invalid room key" }, 400);
  }

  const store = getStore({
    name: "hangout-rooms",
    consistency: "strong"
  });

  if (req.method === "GET") {
    const value = await store.get(key, {
      consistency: "strong"
    });

    if (value == null) {
      return json({ error: "Not found" }, 404);
    }

    return json({ value });
  }

  if (req.method === "POST") {
    let body;

    try {
      body = await req.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400);
    }

    if (
      typeof body?.value !== "string" ||
      body.value.length > 100000
    ) {
      return json({ error: "Invalid value" }, 400);
    }

    try {
      JSON.parse(body.value);
    } catch {
      return json(
        { error: "Room state must be JSON" },
        400
      );
    }

    await store.set(key, body.value);

    return json({ ok: true });
  }

  return json({ error: "Method not allowed" }, 405);
};
      
