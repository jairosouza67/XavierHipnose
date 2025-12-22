from __future__ import annotations

import json
from pathlib import Path

from pypdf import PdfReader


def extract_pdf_text(path: Path) -> dict:
    reader = PdfReader(str(path))
    pages_text: list[str] = []

    for page in reader.pages:
        text = page.extract_text() or ""
        text = "\n".join(line.rstrip() for line in text.splitlines())
        text = text.strip()
        if text:
            pages_text.append(text)

    full_text = "\n\n".join(pages_text)
    return {
        "file": path.name,
        "pages": len(reader.pages),
        "text": full_text,
    }


def main() -> None:
    pdf_dir = Path(__file__).resolve().parents[1] / "PDFs"
    out_path = Path(__file__).resolve().parents[1] / "tools" / "pdf_texts.json"

    pdf_paths = sorted(pdf_dir.glob("*.pdf"))
    if not pdf_paths:
        raise SystemExit(f"No PDFs found in {pdf_dir}")

    data = [extract_pdf_text(p) for p in pdf_paths]

    # Keep output deterministic and UTF-8.
    out_path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

    # Print short stats only
    print(f"Extracted {len(data)} PDFs -> {out_path}")
    for item in data:
        text_norm = " ".join(item["text"].split())
        snippet = text_norm[:220]
        print("---")
        print(item["file"])
        print("pages:", item["pages"], "chars:", len(text_norm))
        print("snippet:", snippet)


if __name__ == "__main__":
    main()
