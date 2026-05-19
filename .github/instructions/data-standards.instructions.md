---
applyTo: "src/data/**"
---
# Data Standards

## Structure — One File Per Section
```
src/data/
  types.ts           → all TypeScript interfaces and types
  index.ts           → all data access functions
  javascript.json    → JavaScript section data
  python.json        → Python section data (when added)
  [language].json    → one file per section, same shape always
```

## JSON Shape — Every Section File Must Follow This Exactly
```json
{
  "id": "javascript",
  "title": "JavaScript",
  "color": "#F7DF1E",
  "concepts": [
    {
      "id": "inheritance",
      "title": "Inheritance",
      "description": "One or two sentences max — shown on the card.",
      "content": "Full explanation shown on the detail screen. Can be multi-paragraph.",
      "codeExample": "// Full code example\nclass Animal {\n  speak() {}\n}\n\nclass Dog extends Animal {\n  speak() {\n    return 'Woof';\n  }\n}",
      "tryItCode": "// Optional: editable starter code for the playground"
    }
  ]
}
```

## Types — All Defined in `src/data/types.ts`
```typescript
export interface Concept {
  id: string;
  title: string;
  description: string;
  content: string;
  codeExample: string;
  tryItCode?: string;        // optional — for future playground feature
}

export interface Section {
  id: string;
  title: string;
  color: string;             // hex color for section accent
  concepts: Concept[];
}
```

## Data Access — All Functions in `src/data/index.ts`
```typescript
// ✅ correct — all data access goes through these functions
export function getSections(): Section[]
export function getSectionById(id: string): Section | undefined
export function getConceptById(sectionId: string, conceptId: string): Concept | undefined

// ❌ wrong — never import JSON directly in components
import javascriptData from './javascript.json';
```

## Rules for Adding a New Section
1. Create `src/data/[section-id].json` following the exact shape above
2. Add the import and entry in `src/data/index.ts` — no other files need to change
3. Add a color for the new section in `src/theme/colors.ts` under `section`
4. Add at least 3 concepts before merging — no empty or single-concept sections
5. Each concept must have all required fields filled — no empty strings

## Content Quality Rules
- `description` must be 1–2 sentences max — it appears on the card, keep it scannable
- `content` should explain the concept clearly for a junior developer — no assumed knowledge
- `codeExample` must be valid, runnable code — always include comments explaining key lines
- `id` must be lowercase, hyphenated, unique within the section: `"prototype-chain"`, `"arrow-functions"`

## What NOT to Do
- ❌ Never hardcode concept data inside components
- ❌ Never mutate JSON data at runtime — treat it as read-only
- ❌ Never add fields not defined in the `Concept` or `Section` interface without updating `types.ts` first
- ❌ Never create a section file without adding it to `src/data/index.ts`
- ❌ Never use numeric IDs — always descriptive lowercase strings