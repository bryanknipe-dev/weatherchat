export default async function handler(req, res) {
  try {
    const { messages } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5.4-mini",
        input: messages.map(m => m.content).join("\n"),
        instructions: "You are a weather assistant. ONLY answer weather questions."
      })
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.output_text || "No weather response."
    });

  } catch (error) {
    res.status(500).json({ reply: "Error" });
  }
}