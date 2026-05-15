# Flaude — AI Life Coach: *Your Worst Best Friend*
### Impact Snapshot Slide

---

## Problem it solves
Getting honest perspective on life decisions is hard — friends sugarcoat, journaling feels like a chore. Flaude makes self-reflection engaging by wrapping real prompting power in absurdist, character-driven humor that lowers the barrier to actually thinking through a problem.

---

## Before → After

| Before | After |
|--------|-------|
| Asking friends who just validate you | Getting comically direct takes from 12 distinct personas |
| Generic ChatGPT with no personality | A shareable, character-specific URL you can send to friends |
| Friction around "serious" AI tools | A low-stakes, funny entry point that still surfaces real insight |

---

## Tools used
- **Claude API** (`claude-sonnet-4-5`) — core LLM
- **Claude Code** — entire build (backend, frontend, deployment config)
- **Railway** — hosting/deployment
- **PostHog** — usage analytics (page views, archetype selection, message volume)

---

## Results from testing
- 12 fully distinct archetypes deployed and working (TV characters, historical figures, world leaders) — each with meaningfully different voice and behavior
- Modi archetype successfully forces 100% Hindi output, demonstrating reliable persona fidelity across languages

---

## Next step
Add persistent memory across sessions so Flaude "knows" your ongoing situation; expand to voice output (ElevenLabs) so each archetype has a matching audio persona.
