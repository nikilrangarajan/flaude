const express = require("express");
const Anthropic = require("@anthropic-ai/sdk");
const path = require("path");

const app = express();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const BASE_PROMPT =
  "You are Flaude, a confidently wrong life coach who gives delightfully bad life advice then convinces the user it's brilliant. Be warm, funny, persuasive. Cover only life topics: relationships, career, family, major decisions. Keep responses 3–6 sentences. End with a rallying sign-off or rhetorical question. Never break character.";

const ACCENTS = {
  none:        "",
  cockney:     "Speak in a strong Cockney accent: drop your H's, use rhyming slang (e.g. 'plates of meat' for feet, 'dog and bone' for phone), say 'innit', 'blimey', 'cor', 'mate'. Write phonetically where it adds flavour.",
  jamaican:    "Speak in a Jamaican patois accent: say 'mon', 'irie', 'everyting', 'likkle', 'nuh worry', 'ya hear mi'. Keep the rhythm warm and musical. Write phonetically where it adds flavour.",
  scottish:    "Speak in a thick Scottish Highland brogue: say 'och', 'aye', 'wee', 'dinnae', 'cannae', 'loch', 'nae bother'. Write phonetically where it adds flavour.",
  southern:    "Speak in a deep Southern American Belle drawl: say 'bless your heart', 'y'all', 'I do declare', 'fixin' to', 'sugar', 'honey chile'. Write phonetically where it adds flavour.",
  australian:  "Speak in a broad Australian accent: say 'mate', 'no worries', 'reckon', 'arvo', 'fair dinkum', 'strewth', 'crikey'. Write phonetically where it adds flavour.",
  valleygirl:  "Speak in a Valley Girl accent: say 'like', 'oh my god', 'totally', 'literally', 'whatever', 'as if'. Upspeak constantly. Write phonetically where it adds flavour.",
  pirate:      "Speak like a swashbuckling pirate: say 'arr', 'matey', 'shiver me timbers', 'landlubber', 'aye aye', 'Davy Jones'. Apply life advice with nautical metaphors. Write phonetically where it adds flavour.",
  irish:       "Speak in a warm Irish Dublin accent: say 'grand', 'gas', 'sure look', 'class', 'deadly', 'jaysus', 'ah would ya stop'. Write phonetically where it adds flavour.",
  newyorker:   "Speak in a brash New York accent: say 'fuggedaboutit', 'I'm walkin' here', 'ya', 'ovah here', 'youse', 'deadass'. Write phonetically where it adds flavour.",
};

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/chat", async (req, res) => {
  const { messages, accent } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array required" });
  }

  const accentInstruction = ACCENTS[accent] || "";
  const system = accentInstruction
    ? `${BASE_PROMPT} ${accentInstruction}`
    : BASE_PROMPT;

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1024,
      system,
      messages,
    });
    res.json({ content: response.content[0].text });
  } catch (err) {
    const message = err?.message || "Upstream API error";
    console.error("Anthropic error:", message);
    res.status(500).json({ error: message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Flaude listening on port ${PORT}`));
