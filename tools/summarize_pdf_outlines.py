from __future__ import annotations

import json
from pathlib import Path


def main() -> None:
    data_path = Path(__file__).resolve().parent / "pdf_texts.json"
    data = json.loads(data_path.read_text(encoding="utf-8"))

    patterns = [
        "O que",
        "Como",
        "Sinais",
        "Sintomas",
        "Por que",
        "Causas",
        "O cérebro",
        "O corpo",
        "O que fazer",
        "O que acontece",
        "O que está",
    ]

    for item in data:
        text = item.get("text", "")
        lines = [ln.strip() for ln in text.splitlines() if ln.strip()]

        heads: list[str] = []
        for ln in lines:
            if any(p in ln for p in patterns):
                if ln not in heads:
                    heads.append(ln)
            if len(heads) >= 10:
                break

        print("---")
        print(item.get("file"), f"(pages={item.get('pages')}, lines={len(lines)})")
        if heads:
            for h in heads[:10]:
                print(" -", h[:140])
        else:
            # fallback: show first few non-empty lines
            for h in lines[:6]:
                print(" -", h[:140])


if __name__ == "__main__":
    main()
