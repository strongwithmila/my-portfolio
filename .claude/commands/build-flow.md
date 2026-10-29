---
description: Derive the website user flow from the website design PDF and draw it in a FigJam board (left-to-right, Strong with Mila colours)
argument-hint: <figjam-board-url> [flow focus, e.g. "enquiry flow"]
---

# /build-flow

Render a Strong with Mila user flow as a diagram written directly onto a FigJam board's canvas.

Arguments: `$ARGUMENTS`

## 0. Inputs

- **FigJam URL (required):** the first argument, e.g. `https://www.figma.com/board/<fileKey>/<name>`. If it is missing, or it is a `/design/` or `/slides/` link, stop and ask Mila for a FigJam **board** link. Extract `fileKey` from the path segment after `/board/`.
- **Flow focus (optional):** any remaining text, e.g. `enquiry flow` or `mobile visitor flow`. Default: **Website visitor → enquiry flow**.

## 1. Read the source

The flow source is `00Context/Strong With Mila Website Design.pdf`. Read it with the Read tool. If PDF rendering isn't available, extract the text with pypdf installed into the scratchpad (never into the project):

```bash
python3 -m pip install -q --target "<scratchpad>/pylib" pypdf
PYTHONPATH="<scratchpad>/pylib" python3 -I -c "import pypdf,sys; r=pypdf.PdfReader(sys.argv[1]); print('\n'.join(p.extract_text() for p in r.pages))" "00Context/Strong With Mila Website Design.pdf"
```

Do not claim to have read the PDF if neither works. Stop and tell Mila.

## 2. Derive the flow

Build the flow only from what the PDF says. The relevant parts are section 6 (page sections, navigation, primary/secondary CTAs), section 10 (CTA behaviour, contact form, optional integrations), the FAQ, the "for you / not for you" list and the Instagram/email alternatives. Model what a visitor does and decides, not the page layout.

Node kinds:
- `entry`: exactly one, the starting point (e.g. "Visitor lands on hero"). Drawn on the far left.
- `step`: something the visitor does or sees (rectangle).
- `decision`: a question with 2+ outcomes, phrased as a question ending in "?" (diamond).
- `exit`: an end state (rounded rectangle), always in the far-right column. Set `tone: "success"` for a conversion (enquiry sent, DM sent, email sent) or `tone: "dropoff"` for leaving, not a fit or an error dead end.

Rules:
- Every outgoing edge of a `decision` gets a short label ("Yes", "No", "Not a fit", "Prefers Instagram"…). That gives one labelled connector per branch. Step → step edges may stay unlabelled.
- Every non-exit node has at least one outgoing edge; exits have none; everything is reachable from the entry.
- Keep labels short (≤ 8 words) and in brand voice (CLAUDE.md §4). No shame language.
- **Truth guardrails (CLAUDE.md §3, §8):** the offer name ("Strong Through Your Cycle" vs "Strong Foundations"), the ~€599 price, the founding-client discount and "limited spots" are **unconfirmed**. Use neutral labels such as "Apply / enquire CTA", not the unconfirmed names or prices. The PDF's long form (health considerations etc.) conflicts with CLAUDE.md's minimised v1 form. Draw the form step neutrally ("Fill in enquiry form") and list the conflict as a note.
- Collect every assumption or unconfirmed item into `notes` (shown on the board under the diagram).

Show Mila the derived flow in chat as a compact table (node, kind, outgoing branches) plus the notes, then continue straight to drawing. Don't wait for approval, because each run adds a new copy and never edits existing content.

## 3. Draw it in FigJam

1. Load the Figma tools in one ToolSearch call: `use_figma`, `create_session`, `get_figjam`, `get_screenshot`, `get_figma_skill`.
2. Read the Figma skills `skill://figma/figma-use/SKILL.md` and `skill://figma/figma-use-figjam/SKILL.md` (mandatory before `use_figma`).
3. `create_session` with the fileKey and a description like "Draw <flow title> user flow". Pass the returned `sessionId` on every later Figma call.
4. Run **one** `use_figma` call with the script below, replacing only the `FLOW` object. Pass `skillNames: "resource:figma-use,resource:figma-use-figjam"`.
   - The script never deletes or edits existing nodes. It adds a new section to the right of everything on the board, named `<title> — v<n>`, where n increments for each copy.
   - If it throws, follow `safeToRetryWithoutCanvasRead`. If false, call `get_figjam` on `0:1` first and remove only nodes this run created before retrying.
5. Look at the inline screenshot the script returns. Check for clipped text, overlapping shapes and unreadable labels. If something is wrong, fix only the affected nodes in a targeted follow-up call.

```js
// ===== FLOW: the only part to change per run =====
const FLOW = {
  title: 'Website visitor → enquiry flow',
  subtitle: 'Derived from 00Context/Strong With Mila Website Design.pdf · YYYY-MM-DD',
  nodes: [
    // { id: 'n1', kind: 'entry', label: 'Visitor lands on hero' },
    // { id: 'd1', kind: 'decision', label: 'Ready to enquire?' },
    // { id: 'x1', kind: 'exit', tone: 'success', label: 'Enquiry sent' },
  ],
  edges: [
    // { from: 'n1', to: 'd1' },
    // { from: 'd1', to: 'x1', label: 'Yes' },
  ],
  notes: [
    // 'Offer name and price unconfirmed; CTA labels kept neutral.',
  ],
};

// ===== RENDER: do not edit below unless fixing a bug =====
const hex = (s) => { const n = parseInt(s.slice(1), 16); return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 }; };
const C = {
  cream: hex('#F7F3EE'), offwhite: hex('#EDE7E1'), plum: hex('#4B1F3B'), brown: hex('#3A2A24'),
  forest: hex('#3F5F4A'), burgundy: hex('#8A3F4D'), clay: hex('#C47A5A'),
};
const STYLE = {
  entry:    { shape: 'SQUARE',            fill: C.plum,     stroke: C.plum,     text: C.cream },
  step:     { shape: 'SQUARE',            fill: C.offwhite, stroke: C.plum,     text: C.brown },
  decision: { shape: 'DIAMOND',           fill: C.clay,     stroke: C.brown,    text: C.brown },
  success:  { shape: 'ROUNDED_RECTANGLE', fill: C.forest,   stroke: C.forest,   text: C.cream },
  dropoff:  { shape: 'ROUNDED_RECTANGLE', fill: C.burgundy, stroke: C.burgundy, text: C.cream },
};
const styleOf = (n) => n.kind === 'exit' ? STYLE[n.tone === 'dropoff' ? 'dropoff' : 'success'] : STYLE[n.kind];

// --- validate ---
const ids = FLOW.nodes.map((n) => n.id);
const byId = Object.fromEntries(FLOW.nodes.map((n) => [n.id, n]));
const entries = FLOW.nodes.filter((n) => n.kind === 'entry');
if (entries.length !== 1) throw new Error('FLOW needs exactly one entry node');
for (const n of FLOW.nodes) if (!STYLE[n.kind] && n.kind !== 'exit') throw new Error('Unknown kind: ' + n.kind);
for (const e of FLOW.edges) if (!byId[e.from] || !byId[e.to]) throw new Error(`Unknown node in edge ${e.from} -> ${e.to}`);
const out = Object.fromEntries(ids.map((i) => [i, []]));
FLOW.edges.forEach((e, i) => out[e.from].push(i));
for (const n of FLOW.nodes) {
  if (n.kind === 'exit' && out[n.id].length) throw new Error('Exit has outgoing edges: ' + n.id);
  if (n.kind !== 'exit' && !out[n.id].length) throw new Error('Non-exit without outgoing edge: ' + n.id);
  if (n.kind === 'decision') for (const ei of out[n.id]) if (!FLOW.edges[ei].label) throw new Error(`Unlabelled branch from decision ${n.id}`);
}

// --- back edges (loops) via DFS from entry ---
const state = {}; const back = new Set();
const dfs = (u) => { state[u] = 1; for (const ei of out[u]) { const v = FLOW.edges[ei].to; if (state[v] === 1) back.add(ei); else if (!state[v]) dfs(v); } state[u] = 2; };
dfs(entries[0].id);
const unreachable = ids.filter((i) => !state[i]);
if (unreachable.length) throw new Error('Unreachable from entry: ' + unreachable.join(', '));

// --- columns: longest path from entry; all exits share the last column ---
const col = Object.fromEntries(ids.map((i) => [i, 0]));
for (let k = 0; k < ids.length; k++)
  FLOW.edges.forEach((e, ei) => { if (!back.has(ei) && col[e.to] < col[e.from] + 1) col[e.to] = col[e.from] + 1; });
const lastCol = Math.max(0, ...FLOW.nodes.filter((n) => n.kind !== 'exit').map((n) => col[n.id])) + 1;
FLOW.nodes.filter((n) => n.kind === 'exit').forEach((n) => { col[n.id] = lastCol; });

// --- rows: order each column by the average row of its predecessors ---
const columns = Array.from({ length: lastCol + 1 }, () => []);
FLOW.nodes.forEach((n) => columns[col[n.id]].push(n.id));
const rowOf = {};
columns.forEach((c) => {
  const bary = (id) => {
    const preds = FLOW.edges.filter((e, ei) => e.to === id && !back.has(ei) && rowOf[e.from] !== undefined).map((e) => rowOf[e.from]);
    return preds.length ? preds.reduce((a, b) => a + b, 0) / preds.length : 0;
  };
  c.sort((a, b) => bary(a) - bary(b) || ids.indexOf(a) - ids.indexOf(b));
  c.forEach((id, r) => { rowOf[id] = r - (c.length - 1) / 2; });
});

// --- fonts (brand fonts if available, Inter otherwise) ---
async function pickFont(cands) { for (const f of cands) { try { await figma.loadFontAsync(f); return f; } catch (e) {} } throw new Error('No usable font'); }
const BODY = await pickFont([{ family: 'Montserrat', style: 'Medium' }, { family: 'Inter', style: 'Medium' }]);
const HEAD = await pickFont([{ family: 'Playfair Display', style: 'Bold' }, { family: 'Inter', style: 'Bold' }]);
const NOTE = await pickFont([{ family: 'Montserrat', style: 'Regular' }, { family: 'Inter', style: 'Regular' }]);
const FONT_SIZE = 16;

// --- size every shape to fit its text ---
const NON_RECT = new Set(['DIAMOND']);
const measurer = figma.createText();
measurer.fontName = BODY; measurer.fontSize = FONT_SIZE; measurer.textAutoResize = 'HEIGHT';
function fit(label, shapeType) {
  const baseW = NON_RECT.has(shapeType) ? 300 : 220, baseH = NON_RECT.has(shapeType) ? 180 : 100, PAD = 28;
  let w = baseW, h = baseH;
  for (let s = 1; s < 3; s += 0.1) {
    w = Math.round(baseW * s); h = Math.round(baseH * s);
    const area = NON_RECT.has(shapeType) ? { w: w / 2 - PAD / 2, h: h / 2 - PAD / 2 } : { w: w - PAD * 2, h: h - PAD * 2 };
    measurer.resize(Math.max(area.w, 1), measurer.height);
    measurer.characters = label;
    if (measurer.height <= area.h) break;
  }
  return { w, h };
}
const size = Object.fromEntries(FLOW.nodes.map((n) => [n.id, fit(n.label, styleOf(n).shape)]));
measurer.remove();

// --- section: a new copy to the right of everything on the board ---
const page = figma.currentPage;
const existing = page.children;
const rightEdge = existing.length ? Math.max(...existing.map((n) => n.x + n.width)) : 0;
const topEdge = existing.length ? Math.min(...existing.map((n) => n.y)) : 0;
const version = existing.filter((n) => n.type === 'SECTION' && n.name.startsWith(FLOW.title)).length + 1;
const section = figma.createSection();
section.name = `${FLOW.title} — v${version}`;
section.fills = [{ type: 'SOLID', color: C.cream }];
section.x = existing.length ? rightEdge + 240 : 0;
section.y = topEdge;
const created = [section.id];

const PAD = 80, COL_GAP = 180, ROW_GAP = 90;
const title = figma.createText();
title.fontName = HEAD; title.fontSize = 40; title.characters = FLOW.title;
title.fills = [{ type: 'SOLID', color: C.plum }];
section.appendChild(title); title.x = PAD; title.y = PAD; created.push(title.id);
const sub = figma.createText();
sub.fontName = NOTE; sub.fontSize = 16; sub.characters = FLOW.subtitle || '';
sub.fills = [{ type: 'SOLID', color: C.brown }];
section.appendChild(sub); sub.x = PAD; sub.y = title.y + title.height + 8; created.push(sub.id);

// --- place shapes: left-to-right columns, rows centred ---
const colW = columns.map((c) => Math.max(...c.map((id) => size[id].w)));
const rowH = Math.max(...FLOW.nodes.map((n) => size[n.id].h)) + ROW_GAP;
const maxRows = Math.max(...columns.map((c) => c.length));
const diagramTop = sub.y + sub.height + 72;
const midY = diagramTop + ((maxRows - 1) * rowH) / 2 + rowH / 2;
const colX = []; let cx = PAD;
colW.forEach((w) => { colX.push(cx); cx += w + COL_GAP; });

const shapes = {};
for (const n of FLOW.nodes) {
  const st = styleOf(n), sz = size[n.id];
  const s = figma.createShapeWithText();
  s.shapeType = st.shape;
  await figma.loadFontAsync(s.text.fontName);
  s.text.fontName = BODY; s.text.fontSize = FONT_SIZE; s.text.characters = n.label;
  s.resize(sz.w, sz.h);
  s.fills = [{ type: 'SOLID', color: st.fill }];
  s.strokes = [{ type: 'SOLID', color: st.stroke }];
  s.text.fills = [{ type: 'SOLID', color: st.text }];
  s.name = `${n.kind}: ${n.label}`;
  section.appendChild(s);
  s.x = colX[col[n.id]] + (colW[col[n.id]] - sz.w) / 2;
  s.y = midY + rowOf[n.id] * rowH - sz.h / 2;
  shapes[n.id] = s; created.push(s.id);
}

// --- connectors: one per edge, labelled where the flow gives a label ---
const connectorIds = [];
FLOW.edges.forEach((e, ei) => {
  const a = shapes[e.from], b = shapes[e.to];
  const dy = (b.y + b.height / 2) - (a.y + a.height / 2);
  let startMag = 'RIGHT', endMag = 'LEFT';
  if (back.has(ei)) { startMag = 'BOTTOM'; endMag = 'BOTTOM'; }
  else if (col[e.to] === col[e.from]) { startMag = dy > 0 ? 'BOTTOM' : 'TOP'; endMag = dy > 0 ? 'TOP' : 'BOTTOM'; }
  else if (byId[e.from].kind === 'decision' && Math.abs(dy) > 10) { startMag = dy > 0 ? 'BOTTOM' : 'TOP'; }
  const c = figma.createConnector();
  section.appendChild(c);
  c.connectorStart = { endpointNodeId: a.id, magnet: startMag };
  c.connectorEnd = { endpointNodeId: b.id, magnet: endMag };
  c.connectorLineType = 'ELBOWED';
  c.connectorStartStrokeCap = 'NONE';
  c.connectorEndStrokeCap = 'ARROW_LINES';
  c.strokeWeight = 2;
  c.strokes = [{ type: 'SOLID', color: C.plum }];
  if (back.has(ei)) c.dashPattern = [8, 6];
  if (e.label) { c.text.fontName = BODY; c.text.fontSize = 14; c.text.characters = e.label; }
  connectorIds.push(c.id);
});
created.push(...connectorIds);

// --- legend and notes under the diagram ---
const diagramBottom = Math.max(...Object.values(shapes).map((s) => s.y + s.height));
const legend = figma.createText();
legend.fontName = NOTE; legend.fontSize = 14;
legend.characters = 'Legend: rectangle = step · diamond = decision · rounded = exit (green = conversion, burgundy = drop-off) · dashed arrow = loop back';
legend.fills = [{ type: 'SOLID', color: C.brown }];
section.appendChild(legend); legend.x = PAD; legend.y = diagramBottom + 140; created.push(legend.id);
let bottom = legend.y + legend.height;
if (FLOW.notes && FLOW.notes.length) {
  const notes = figma.createText();
  notes.fontName = NOTE; notes.fontSize = 14;
  notes.characters = 'To confirm:\n' + FLOW.notes.map((t) => '• ' + t).join('\n');
  notes.fills = [{ type: 'SOLID', color: C.burgundy }];
  section.appendChild(notes); notes.x = PAD; notes.y = bottom + 24; created.push(notes.id);
  bottom = notes.y + notes.height;
}

// --- fit section to content ---
let maxRight = 0;
for (const ch of section.children) if (ch.type !== 'CONNECTOR') maxRight = Math.max(maxRight, ch.x + ch.width);
section.resize(maxRight + PAD, bottom + PAD);

await section.screenshot({ contentsOnly: false });
return { sectionId: section.id, sectionName: section.name, shapeIds: Object.fromEntries(Object.entries(shapes).map(([k, s]) => [k, s.id])), connectorIds, createdNodeIds: created };
```

## 4. Report back

Tell Mila:
- the section name (`… — v<n>`) and a link to it: `https://www.figma.com/board/<fileKey>/?node-id=<sectionId with ":" → "-">`
- node / decision / exit / connector counts
- the "To confirm" notes (unconfirmed offer name, price, availability, form-field conflict, anything else assumed)
- anything that couldn't be checked (e.g. brand fonts unavailable, so it fell back to Inter)
