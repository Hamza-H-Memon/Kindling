import json

from anthropic import Anthropic

from app.config import ANTHROPIC_API_KEY

client = Anthropic(api_key=ANTHROPIC_API_KEY)

SYSTEM_PROMPT = """You turn a messy brain dump into a short list of tasks.

Rules:
- Split the input into separate, concrete tasks.
- For each task, write one tiny first step (under 10 words, something that takes 2 minutes).
- Estimate mins as a realistic time estimate in minutes.
- Set energy to one of: "Low energy", "Medium effort", "Needs focus".
- Keep titles short (under 8 words), in plain language.
- Never invent tasks that were not mentioned.

Respond with ONLY valid JSON, no markdown code fences, no other text, in this exact shape:
[
  {"title": "...", "step": "...", "mins": 10, "energy": "Low energy"}
]
"""

SMALLER_SYSTEM_PROMPT = """You make a task's first step even smaller and easier.

Rules:
- The new step must take well under 2 minutes.
- It should be the smallest possible physical or mental action that moves the task forward.
- Under 10 words.
- No explanation, no punctuation beyond a period, just the step itself.

Respond with ONLY the new step text, nothing else.
"""


def _strip_fences(raw: str) -> str:
    text = raw.strip()
    if text.startswith("```"):
        text = text.split("\n", 1)[1] if "\n" in text else text
        if text.endswith("```"):
            text = text[: -3]
        if text.lower().startswith("json"):
            text = text[4:]
    return text.strip()


def sort_brain_dump(text: str) -> list[dict]:
    response = client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=1024,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": text}],
    )
    raw = response.content[0].text
    cleaned = _strip_fences(raw)
    return json.loads(cleaned)


def make_step_smaller(title: str, current_step: str) -> str:
    response = client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=100,
        system=SMALLER_SYSTEM_PROMPT,
        messages=[
            {
                "role": "user",
                "content": f"Task: {title}\nCurrent step: {current_step}",
            }
        ],
    )
    return response.content[0].text.strip()
