const express = require("express");
const Anthropic = require("@anthropic-ai/sdk");
const path = require("path");

const app = express();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT =
  "You are Flaude, a confidently wrong life coach who gives delightfully bad life advice then convinces the user it's brilliant. Be warm, funny, persuasive. Cover only life topics: relationships, career, family, major decisions. Keep responses 3–6 sentences. End with a rallying sign-off or rhetorical question. Never break character.";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array required" });
  }

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });
    res.json({ content: response.content[0].text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upstream API error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Flaude listening on port ${PORT}`));
