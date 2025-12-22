from __future__ import annotations

import json
import re
from pathlib import Path


def slugify(name: str) -> str:
    s = name.strip().lower()
    s = re.sub(r"[\s/]+", "-", s)
    s = re.sub(r"[^a-z0-9\-áàâãéèêíïóôõöúç]+", "", s)
    # keep accents (TS keys will be plain ASCII anyway; we map manually)
    return s


def split_sections(text: str) -> list[tuple[str, str]]:
    # Normalize bullets and whitespace but keep original tone.
    lines = [ln.rstrip() for ln in text.splitlines()]
    lines = [ln.replace("", "-") for ln in lines]

    # Headings in the PDFs use Title Case. Avoid matching mid-paragraph lowercase
    # words like "sintomas" when a line breaks in the middle of a sentence.
    heading_re = re.compile(
        r"^(O que( é| são)?|Como o cérebro|O que acontece|Sintomas|Sinais|Por que|Como os|Como a hipnoterapia)\b"
    )

    sections: list[tuple[str, list[str]]] = []
    current_title: str | None = None
    current_body: list[str] = []

    def flush() -> None:
        nonlocal current_title, current_body
        if current_title is None:
            return
        body = "\n".join([ln for ln in current_body]).strip()
        if body:
            sections.append((current_title.strip(), body))
        current_title = None
        current_body = []

    i = 0
    while i < len(lines):
        ln = lines[i]
        stripped = ln.strip()
        if not stripped:
            # preserve paragraph breaks lightly
            if current_body and current_body[-1] != "":
                current_body.append("")
            i += 1
            continue

        if heading_re.match(stripped):
            # Join broken headings like:
            # "Como a hipnoterapia ajuda no tratamento da" + "ansiedade?"
            joined_title = stripped
            if re.search(r"\b(da|de|dos|das|no|na)\s*$", joined_title):
                j = i + 1
                while j < len(lines) and not lines[j].strip():
                    j += 1
                if j < len(lines):
                    nxt = lines[j].strip()
                    if len(nxt) <= 40 and (nxt.endswith("?") or nxt.endswith("!")):
                        joined_title = f"{joined_title} {nxt}".strip()
                        i = j  # consume the next line too

            flush()
            current_title = joined_title
            current_body = []
        else:
            if current_title is None:
                # If the PDF starts with intro before first heading, treat as "Introdução"
                current_title = "Introdução"
                current_body = []
            current_body.append(stripped)

        i += 1

    flush()

    # Merge super short sections into previous
    merged: list[tuple[str, str]] = []
    for title, body in sections:
        if merged and len(body) < 80:
            pt, pb = merged[-1]
            merged[-1] = (pt, (pb + "\n\n" + title + "\n" + body).strip())
        else:
            merged.append((title, body))

    return merged


def escape_ts_template_literal(text: str) -> str:
    # Use template literals to keep newlines. Escape backticks and ${.
    return text.replace("`", "\\`").replace("${", "\\${")


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    data_path = root / "tools" / "pdf_texts.json"
    out_path = root / "src" / "content" / "treatmentContent.ts"

    data = json.loads(data_path.read_text(encoding="utf-8"))

    # Map PDF filename -> service key used in app
    file_to_key = {
        "Angústia.pdf": "angustia",
        "Ansiedade.pdf": "ansiedade",
        "Compulsões.pdf": "compulsoes",
        "Depressão.pdf": "depressao",
        "Estresse e Burnout.pdf": "estresse",
        "Insônia.pdf": "insonia",
        "Medos e Fobias.pdf": "fobias",
        "Trauma.pdf": "trauma",
        "Vícios.pdf": "vicios",
    }

    items: list[dict] = []
    for item in data:
        filename = item.get("file")
        if filename not in file_to_key:
            continue
        key = file_to_key[filename]
        text = item.get("text", "")
        sections = split_sections(text)
        items.append(
            {
                "key": key,
                "source": filename,
                "pages": item.get("pages"),
                "sections": sections,
            }
        )

    out_path.parent.mkdir(parents=True, exist_ok=True)

    # Emit TS module
    lines: list[str] = []
    lines.append("// AUTO-GENERATED from PDFs in /PDFs. Do not edit manually.\n")
    lines.append("export type TreatmentKey =\n  | 'ansiedade'\n  | 'depressao'\n  | 'fobias'\n  | 'trauma'\n  | 'compulsoes'\n  | 'vicios'\n  | 'insonia'\n  | 'estresse'\n  | 'angustia';\n")
    lines.append("export interface TreatmentSection {\n  title: string;\n  content: string;\n}\n")
    lines.append("export interface TreatmentContent {\n  key: TreatmentKey;\n  sourcePdf: string;\n  sections: TreatmentSection[];\n}\n")
    lines.append("export const TREATMENT_CONTENT: Record<TreatmentKey, TreatmentContent> = {\n")

    for it in items:
        key = it["key"]
        source = it["source"]
        sections = it["sections"]
        lines.append(f"  '{key}': {{\n")
        lines.append(f"    key: '{key}',\n")
        lines.append(f"    sourcePdf: '{source}',\n")
        lines.append("    sections: [\n")
        for title, content in sections:
            lines.append("      {\n")
            lines.append(f"        title: `{escape_ts_template_literal(title)}`,\n")
            lines.append(f"        content: `{escape_ts_template_literal(content)}`,\n")
            lines.append("      },\n")
        lines.append("    ],\n")
        lines.append("  },\n")

    lines.append("};\n")

    out_path.write_text("".join(lines), encoding="utf-8")
    print("Wrote:", out_path)
    print("Keys:", ", ".join(sorted([it["key"] for it in items])))


if __name__ == "__main__":
    main()
