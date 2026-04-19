const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY as string;

const SYMBOL_DESCRIPTIONS: Record<number, string> = {
  1: "large central diamond lozenge with nested geometric lines and cross motifs",
  2: "repeating triangular chevron pattern with stepped edges and small diamond accents",
  3: "hooked cross symbol surrounded by rectangular frames and zigzag border",
  4: "star of eight points with radiating geometric lines and concentric square borders",
  5: "interlocking T-shapes and comb-like motifs in a symmetrical grid",
  6: "serrated zigzag bands with alternating solid and open diamond shapes",
  7: "stylized tree of life with branching arms and small triangular leaf motifs",
};

const LAYOUT: Record<number, string> = {
  1: "a single dominant central medallion",
  2: "two Amazigh symbols: the primary one as a large central medallion and the secondary one repeated as a border motif",
  3: "three Amazigh symbols arranged vertically: the first large in the center, the second and third mirrored symmetrically in the upper and lower sections",
};

export type GenerateResult =
  | { ok: true;  dataUrl: string }
  | { ok: false; error: string };

export async function generateCarpetImage(
  symbolIndices: number[],
  accentColors: string[],
  colorNames: string[],
): Promise<GenerateResult> {
  const count   = Math.min(symbolIndices.length, 3);
  const symbols = symbolIndices.slice(0, count);
  const colors  = accentColors.slice(0, 4);
  const names   = colorNames.slice(0, 4);

  const symbolLines = symbols.map((idx, i) => {
    const desc = SYMBOL_DESCRIPTIONS[idx] ?? "geometric Amazigh Berber symbol";
    return i === 0
      ? `The central medallion features: ${desc}`
      : `Secondary motif repeated in borders: ${desc}`;
  });

  const colorDesc = colors.length === 1
    ? `${names[0]} (${colors[0]})`
    : colors.map((c, i) => `${names[i]} (${c})`).join(", ");

  const prompt = `
Ultra-photorealistic overhead top-down studio photograph of a handwoven traditional Moroccan Mediona rug placed flat on a light neutral surface.

Carpet composition — ${LAYOUT[count] ?? LAYOUT[1]}.
${symbolLines.join(" ")}
The symbols are woven in fine ivory and off-white wool threads standing out against a deep rich crimson red wool background.

Accent colors used for the border stripes, fringe, and decorative bands: ${colorDesc}.
${colors.length > 1 ? "The accent colors alternate in concentric border stripes creating a vibrant multi-color frame." : "A single rich border frames the carpet."}

Craft details:
- Hand-knotted Berber weaving with clearly visible individual wool knots and natural pile texture
- Multiple nested geometric border stripes framing the central medallion in authentic Mediona style
- Natural wool sheen with subtle light reflection across the pile surface
- Authentic handmade fringe tassels along both short edges, slightly irregular as in real handcraft
- Slight natural imperfections and variations in the weave, characteristic of artisan work

Photography: overhead flat-lay, soft studio lighting with no harsh shadows, full carpet visible with a faint natural shadow underneath. Photorealistic, 8K detail, luxury artisan product photography.
`.trim();

  console.log("[DALL-E] Sending request...");
  console.log("[DALL-E] Prompt:", prompt.slice(0, 200) + "...");

  try {
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt,
        size: "1024x1792",
        quality: "standard",
        n: 1,
        response_format: "b64_json",
      }),
    });

    const data = await res.json();
    console.log("[DALL-E] Response status:", res.status);

    if (!res.ok) {
      const msg = data?.error?.message ?? JSON.stringify(data);
      console.error("[DALL-E] Error:", msg);
      return { ok: false, error: msg };
    }

    const b64 = data?.data?.[0]?.b64_json;
    if (!b64) {
      console.error("[DALL-E] No image in response:", data);
      return { ok: false, error: "No image returned." };
    }

    console.log("[DALL-E] Image received, size:", Math.round(b64.length * 0.75 / 1024), "KB");
    return { ok: true, dataUrl: `data:image/png;base64,${b64}` };

  } catch (err) {
    console.error("[DALL-E] Fetch error:", err);
    return { ok: false, error: String(err) };
  }
}
