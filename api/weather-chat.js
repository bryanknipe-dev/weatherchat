module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed." });
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ reply: "Missing OpenAI API key in Vercel." });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const messages = body && body.messages ? body.messages : [];

    const userText = messages
      .map(m => `${m.role}: ${m.content}`)
      .join("\n");

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5.4-mini",
        instructions:
          "You are a weather assistant. Only answer weather questions.",
        input: userText
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        reply: data?.error?.message || "OpenAI failed."
      });
    }

    const reply = data.output_text || "No response.";
    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({
      reply: "Server error."
    });
  }
};
