const rooms = new Map();

export default async (request) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
  };

  if (request.method === "OPTIONS") {
    return new Response("", {
      status: 204,
      headers
    });
  }

  try {
    const url = new URL(request.url);
    const roomCode = (url.searchParams.get("room") || "").toUpperCase();

    if (!roomCode) {
      return new Response(
        JSON.stringify({
          error: "Room code is required"
        }),
        {
          status: 400,
          headers
        }
      );
    }

    if (request.method === "GET") {
      const room = rooms.get(roomCode);

      return new Response(
        JSON.stringify({
          ok: true,
          room: room || null
        }),
        {
          status: 200,
          headers
        }
      );
    }

    if (request.method === "POST") {
      const body = await request.json();

      rooms.set(roomCode, {
        ...body,
        roomCode,
        updatedAt: Date.now()
      });

      return new Response(
        JSON.stringify({
          ok: true,
          room: rooms.get(roomCode)
        }),
        {
          status: 200,
          headers
        }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Method not allowed"
      }),
      {
        status: 405,
        headers
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Server error"
      }),
      {
        status: 500,
        headers
      }
    );
  }
};
