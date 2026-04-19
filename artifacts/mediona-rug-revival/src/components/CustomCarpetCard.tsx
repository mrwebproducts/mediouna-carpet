import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";
import { generateCarpetImage } from "@/lib/generateCarpet";
import { saveOrder } from "@/lib/orders";

const SYMBOLS = [1, 2, 3, 4, 5, 6, 7];
const MAX_SYMBOLS = 3;
const MAX_COLORS  = 4;

const PALETTE: { color: string; label: { en: string; fr: string; ar: string } }[] = [
  { color: "#8B1A1A", label: { en: "Crimson",    fr: "Cramoisi",      ar: "قرمزي"         } },
  { color: "#C75B2A", label: { en: "Terracotta", fr: "Terre cuite",   ar: "طيني"          } },
  { color: "#D4A017", label: { en: "Saffron",    fr: "Safran",        ar: "زعفراني"       } },
  { color: "#2D6A4F", label: { en: "Forest",     fr: "Forêt",         ar: "أخضر غابي"     } },
  { color: "#1B4F72", label: { en: "Cobalt",     fr: "Cobalt",        ar: "كوبالتي"       } },
  { color: "#4A235A", label: { en: "Violet",     fr: "Violet",        ar: "بنفسجي"        } },
  { color: "#1C2833", label: { en: "Midnight",   fr: "Minuit",        ar: "أزرق ليلي"     } },
  { color: "#5D4037", label: { en: "Umber",      fr: "Terre d'ombre", ar: "بني داكن"      } },
  { color: "#37474F", label: { en: "Slate",      fr: "Ardoise",       ar: "رمادي أردوازي" } },
  { color: "#BF8B2E", label: { en: "Gold",       fr: "Or",            ar: "ذهبي"          } },
  { color: "#A93226", label: { en: "Ruby",       fr: "Rubis",         ar: "روبي"          } },
  { color: "#0D6E6E", label: { en: "Teal",       fr: "Sarcelle",      ar: "أزرق مائي"     } },
];

function isLight(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

function toggle<T>(arr: T[], item: T, max: number): T[] {
  if (arr.includes(item)) return arr.filter(x => x !== item);
  if (arr.length >= max) return arr;
  return [...arr, item];
}

export function CustomCarpetCard() {
  const { t, dir, language } = useLanguage();

  const [open,            setOpen]            = useState(false);
  const [selectedSymbols, setSelectedSymbols] = useState<number[]>([]);
  const [selectedColors,  setSelectedColors]  = useState<string[]>(["#8B1A1A"]);
  const [customColor,     setCustomColor]     = useState("#8B1A1A");
  const [submitted,       setSubmitted]       = useState(false);
  const [name,            setName]            = useState("");
  const [phone,           setPhone]           = useState("");
  const [notes,           setNotes]           = useState("");

  // Generation state
  const [generating,   setGenerating]   = useState(false);
  const [genError,     setGenError]     = useState<string | null>(null);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null); // data URL from DALL-E
  const [imgReady,     setImgReady]     = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Clear generated image when selections change
  useEffect(() => {
    setGeneratedUrl(null);
    setImgReady(false);
    setGenError(null);
  }, [selectedSymbols, selectedColors]);

  function openModal() {
    setSubmitted(false);
    setGeneratedUrl(null);
    setImgReady(false);
    setGenError(null);
    setOpen(true);
  }

  function toggleSymbol(n: number) {
    setSelectedSymbols(prev => toggle(prev, n, MAX_SYMBOLS));
  }

  function toggleColor(hex: string) {
    setSelectedColors(prev => toggle(prev, hex, MAX_COLORS));
  }

  function addCustomColor(hex: string) {
    setCustomColor(hex);
    setSelectedColors(prev => {
      if (prev.includes(hex)) return prev;
      if (prev.length >= MAX_COLORS) return [...prev.slice(0, MAX_COLORS - 1), hex];
      return [...prev, hex];
    });
  }

  function removeColor(hex: string) {
    if (selectedColors.length <= 1) return;
    setSelectedColors(prev => prev.filter(c => c !== hex));
  }

  function removeSymbol(n: number) {
    setSelectedSymbols(prev => prev.filter(s => s !== n));
  }

  async function handleGenerate() {
    if (!selectedSymbols.length || !selectedColors.length) return;

    setGenerating(true);
    setGenError(null);
    setGeneratedUrl(null);
    setImgReady(false);

    const colorNames = selectedColors.map(
      c => PALETTE.find(p => p.color === c)?.label[language] ?? "crimson"
    );
    const result = await generateCarpetImage(selectedSymbols, selectedColors, colorNames);

    if (result.ok) {
      setGeneratedUrl(result.dataUrl);
      setImgReady(true);
    } else {
      setGenError(result.error);
    }
    setGenerating(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveOrder({
      name,
      phone,
      notes,
      symbols: selectedSymbols,
      colors: selectedColors,
      type: "custom",
    });
    setSubmitted(true);
  }

  const canGenerate = selectedSymbols.length > 0 && selectedColors.length > 0 && !generating;

  const borderStyle =
    selectedColors.length === 1
      ? { backgroundColor: selectedColors[0] }
      : { background: `linear-gradient(90deg, ${selectedColors.join(", ")})` };

  const boxShadow =
    selectedColors.length === 1
      ? `0 0 0 4px ${selectedColors[0]}, 0 0 0 7px ${selectedColors[0]}55, 0 24px 60px rgba(0,0,0,0.6)`
      : `0 0 0 4px ${selectedColors[0]}, 0 0 0 7px ${selectedColors[1] ?? selectedColors[0]}55, 0 24px 60px rgba(0,0,0,0.6)`;

  return (
    <>
      {/* ── SHOP CARD ── */}
      <article
        className="group story-card flex flex-col overflow-hidden rounded-3xl animate-in fade-in slide-in-from-bottom-8 cursor-pointer"
        style={{ animationDelay: "700ms", animationFillMode: "both" }}
        dir={dir}
        onClick={openModal}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-[#1C1008] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
          <div className="grid grid-cols-3 gap-1 p-6 z-0">
            {SYMBOLS.slice(0, 6).map((n, i) => (
              <div key={n} className="overflow-hidden rounded-lg transition-transform duration-700 group-hover:scale-105" style={{ transitionDelay: `${i * 60}ms` }}>
                <img src={`/symbols/${n}.png`} alt="" className="w-full h-full object-cover aspect-square" />
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 inset-x-0 z-20 p-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/60 bg-amber-400/10 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-300">
              ✦ {t("custom.badge")}
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6 bg-card">
          <h3 className="text-2xl font-bold text-foreground">{t("custom.title")}</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t("custom.desc")}</p>
          <div className="mt-6">
            <Button
              className="h-12 w-full rounded-2xl bg-primary text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              onClick={(e) => { e.stopPropagation(); openModal(); }}
            >
              {t("custom.cta")}
            </Button>
          </div>
        </div>
      </article>

      {/* ── MODAL ── */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-3 sm:p-6"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div
            className="relative flex flex-col w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-3xl bg-[#FAFAF8] shadow-[0_32px_80px_rgba(0,0,0,0.45)]"
            dir={dir}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-white/80 backdrop-blur-sm shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-sm">✦</span>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Mediona Revival</p>
                  <h2 className="text-base font-bold text-foreground leading-tight">{t("custom.modal.title")}</h2>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="flex items-center justify-center w-9 h-9 rounded-full text-muted-foreground hover:bg-neutral-100 transition-colors text-xl">×</button>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-5 py-16 px-8 text-center">
                <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center text-4xl">✓</div>
                <h3 className="text-2xl font-bold text-foreground">{t("custom.success")}</h3>
                <p className="text-muted-foreground max-w-sm leading-relaxed">{t("custom.successNote")}</p>
                <div className="flex gap-3 mt-2">
                  <Button variant="outline" className="rounded-xl" onClick={() => {
                    setSubmitted(false); setSelectedSymbols([]); setSelectedColors(["#8B1A1A"]);
                    setGeneratedUrl(null); setImgReady(false); setGenError(null); setName(""); setPhone(""); setNotes("");
                  }}>
                    {t("custom.newDesign")}
                  </Button>
                  <Button className="rounded-xl bg-primary" onClick={() => setOpen(false)}>{t("custom.close")}</Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row flex-1 min-h-0 min-w-0 overflow-hidden">

                {/* ── LEFT: Preview Panel ── */}
                <div className="w-full lg:w-72 xl:w-80 shrink-0 bg-neutral-900 flex flex-col items-center justify-center gap-4 p-6 relative overflow-hidden max-h-72 lg:max-h-none">
                  <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "12px 12px" }} />

                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 relative z-10">{t("custom.preview")}</p>

                  {/* Rug frame */}
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Top fringe */}
                    <div className="w-44 h-4 flex items-end justify-center gap-[3px] px-2 transition-all duration-500" style={borderStyle}>
                      {Array.from({ length: 14 }).map((_, i) => <div key={i} className="w-0.5 h-5 bg-white/25 rounded-full -mb-1" />)}
                    </div>

                    {/* Carpet body */}
                    <div className="w-44 overflow-hidden relative" style={{ aspectRatio: "1/1.4", boxShadow }}>

                      {/* Generated image — always rendered when URL exists, hidden until loaded */}
                      {generatedUrl && (
                        <img
                          key={generatedUrl}
                          src={generatedUrl}
                          alt="AI generated carpet"
                          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                          style={{ opacity: imgReady ? 1 : 0 }}
                          onLoad={() => setImgReady(true)}
                          onError={() => { setGenError("Image failed to display."); setGeneratedUrl(null); }}
                        />
                      )}

                      {/* Overlay layer — shown when no confirmed image yet */}
                      {!imgReady && (
                        generating ? (
                        /* ── LOADING ── */
                        <div className="absolute inset-0 bg-[#86141D] flex flex-col items-center justify-center gap-3">
                          {selectedSymbols[0] && (
                            <img src={`/symbols/${selectedSymbols[0]}.png`} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                          )}
                          <div className="relative w-14 h-14 z-10">
                            <div className="absolute inset-0 rounded-full border-[3px] border-amber-400/20 border-t-amber-400 animate-spin" />
                            <div className="absolute inset-[5px] rounded-full border-2 border-white/10 border-b-white/50 animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }} />
                            <div className="absolute inset-0 flex items-center justify-center text-amber-400/70 text-lg">✦</div>
                          </div>
                          <p className="text-white/40 text-[9px] uppercase tracking-[0.15em] z-10">{t("custom.generating")}</p>
                        </div>
                      ) : genError ? (
                        /* ── ERROR ── */
                        <div className="absolute inset-0 bg-[#86141D] flex flex-col items-center justify-center gap-2 p-3">
                          <span className="text-red-300 text-3xl">✕</span>
                          <p className="text-red-300/80 text-[10px] text-center leading-relaxed">{genError.slice(0, 120)}</p>
                          <button onClick={() => { setGenError(null); setGeneratedUrl(null); }} className="text-amber-400 text-[10px] underline underline-offset-2 mt-1">{t("custom.gen.retry")}</button>
                        </div>
                      ) : selectedSymbols.length > 0 ? (
                        /* ── SYMBOL PREVIEW (idle) ── */
                        <div className="w-full h-full relative bg-[#86141D]">
                          {selectedSymbols.length === 1 ? (
                            <img src={`/symbols/${selectedSymbols[0]}.png`} alt="" className="w-full h-full object-cover" />
                          ) : selectedSymbols.length === 2 ? (
                            <div className="w-full h-full flex flex-col">
                              {selectedSymbols.map(n => <img key={n} src={`/symbols/${n}.png`} alt="" className="w-full flex-1 object-cover" />)}
                            </div>
                          ) : (
                            <div className="w-full h-full flex flex-col">
                              {selectedSymbols.map(n => <img key={n} src={`/symbols/${n}.png`} alt="" className="w-full flex-1 object-cover" />)}
                            </div>
                          )}
                          {/* Color band */}
                          {selectedColors.length > 1 && (
                            <div className="absolute inset-x-0 bottom-0 h-5 flex">
                              {selectedColors.map(c => <div key={c} className="flex-1" style={{ backgroundColor: c }} />)}
                            </div>
                          )}
                          {/* Hint overlay */}
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <p className="text-white/70 text-[10px] bg-black/50 rounded-full px-3 py-1 backdrop-blur-sm">{t("custom.clickGenerate")}</p>
                          </div>
                        </div>
                      ) : (
                        /* ── EMPTY ── */
                        <div className="w-full h-full bg-[#86141D] flex flex-col items-center justify-center gap-2">
                          <div className="text-white/15 text-5xl">✦</div>
                          <p className="text-white/20 text-[10px] px-4 text-center leading-relaxed">{t("custom.preview.empty")}</p>
                        </div>
                      ))}
                    </div>

                    {/* Bottom fringe */}
                    <div className="w-44 h-4 flex items-start justify-center gap-[3px] px-2 transition-all duration-500" style={borderStyle}>
                      {Array.from({ length: 14 }).map((_, i) => <div key={i} className="w-0.5 h-5 bg-white/25 rounded-full mt-1" />)}
                    </div>
                  </div>

                  {/* Color dots */}
                  {selectedColors.length > 0 && (
                    <div className="relative z-10 flex items-center gap-1.5">
                      {selectedColors.map(c => (
                        <div key={c} className="w-4 h-4 rounded-full ring-1 ring-white/20" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  )}

                  {/* Generate / Regenerate / Download buttons */}
                  <div className="relative z-10 w-full space-y-2">
                    <button
                      type="button"
                      onClick={handleGenerate}
                      disabled={!canGenerate}
                      className="w-full h-11 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400 hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5 active:translate-y-0"
                    >
                      {generating ? (
                        <><span className="w-3 h-3 rounded-full border border-white/40 border-t-white animate-spin shrink-0" />{t("custom.generating")}</>
                      ) : imgReady ? (
                        <>{t("custom.gen.regenerate")} ↺</>
                      ) : (
                        <>{t("custom.gen.generate")} ✦</>
                      )}
                    </button>

                    {imgReady && generatedUrl && (
                      <a
                        href={generatedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-9 rounded-xl text-[11px] font-medium border border-white/10 text-neutral-400 hover:text-white hover:border-white/30 transition-colors flex items-center justify-center gap-1.5"
                      >
                        ↓ {t("custom.gen.download")}
                      </a>
                    )}
                  </div>
                </div>

                {/* ── RIGHT: Form ── */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                  <div className="p-6 lg:p-8 space-y-8">

                    {/* Section 1 — Symbols */}
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">1</span>
                          <div>
                            <p className="font-semibold text-foreground text-sm">{t("custom.pickSymbol")}</p>
                            <p className="text-xs text-muted-foreground">{t("custom.pickSymbol.hint")}</p>
                          </div>
                        </div>
                        <span className="shrink-0 text-[11px] font-semibold text-muted-foreground bg-neutral-100 rounded-full px-2.5 py-0.5 mt-0.5">
                          {selectedSymbols.length}/{MAX_SYMBOLS}
                        </span>
                      </div>

                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                        {SYMBOLS.map((n) => {
                          const idx = selectedSymbols.indexOf(n);
                          const selected = idx !== -1;
                          const maxed = !selected && selectedSymbols.length >= MAX_SYMBOLS;
                          return (
                            <button
                              key={n}
                              type="button"
                              onClick={() => toggleSymbol(n)}
                              disabled={maxed}
                              className={`relative overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                                selected ? "border-primary shadow-lg shadow-primary/20 scale-105"
                                : maxed ? "border-neutral-100 opacity-40 cursor-not-allowed"
                                : "border-neutral-200 hover:border-neutral-400 hover:scale-[1.02]"
                              }`}
                            >
                              <img src={`/symbols/${n}.png`} alt={`Symbol ${n}`} className="w-full object-cover aspect-square" />
                              {selected && (
                                <div className="absolute top-1 end-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow">
                                  <span className="text-primary-foreground text-[9px] font-bold">{idx + 1}</span>
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {selectedSymbols.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {selectedSymbols.map((n, i) => (
                            <span key={n} className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary rounded-full px-2.5 py-1 text-xs font-medium">
                              <span className="w-4 h-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[8px] font-bold shrink-0">{i + 1}</span>
                              {t("custom.symbol")} {n}
                              <button type="button" onClick={() => removeSymbol(n)} className="text-primary/50 hover:text-primary ml-0.5 leading-none">×</button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="border-t border-neutral-100" />

                    {/* Section 2 — Colors */}
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">2</span>
                          <div>
                            <p className="font-semibold text-foreground text-sm">{t("custom.pickColor")}</p>
                            <p className="text-xs text-muted-foreground">{t("custom.pickColor.hint")}</p>
                          </div>
                        </div>
                        <span className="shrink-0 text-[11px] font-semibold text-muted-foreground bg-neutral-100 rounded-full px-2.5 py-0.5 mt-0.5">
                          {selectedColors.length}/{MAX_COLORS}
                        </span>
                      </div>

                      <div className="grid grid-cols-6 gap-2">
                        {PALETTE.map(({ color, label }) => {
                          const selected = selectedColors.includes(color);
                          const maxed = !selected && selectedColors.length >= MAX_COLORS;
                          return (
                            <button
                              key={color}
                              type="button"
                              title={label[language]}
                              onClick={() => toggleColor(color)}
                              disabled={maxed}
                              className={`relative w-full aspect-square rounded-full border-2 transition-all duration-200 ${
                                selected ? "scale-110 border-neutral-800 shadow-lg"
                                : maxed ? "opacity-30 cursor-not-allowed border-transparent"
                                : "border-transparent hover:scale-105 hover:border-neutral-300"
                              }`}
                              style={{ backgroundColor: color }}
                            >
                              {selected && (
                                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color: isLight(color) ? "#000" : "#fff" }}>✓</span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                        <label className="text-xs text-muted-foreground font-medium shrink-0">{t("custom.anyColor")}</label>
                        <input
                          type="color"
                          value={customColor}
                          onChange={(e) => setCustomColor(e.target.value)}
                          className="w-8 h-8 rounded-full cursor-pointer border-0 bg-transparent p-0 appearance-none"
                        />
                        <span className="font-mono text-xs text-muted-foreground flex-1">{customColor.toUpperCase()}</span>
                        <button
                          type="button"
                          onClick={() => addCustomColor(customColor)}
                          disabled={selectedColors.includes(customColor) || selectedColors.length >= MAX_COLORS}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-neutral-200 hover:bg-neutral-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
                        >
                          + {t("custom.addColor")}
                        </button>
                      </div>

                      {selectedColors.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {selectedColors.map((c) => {
                            const name = PALETTE.find(p => p.color === c)?.label[language] ?? c;
                            return (
                              <span key={c} className="inline-flex items-center gap-2 bg-neutral-100 border border-neutral-200 rounded-full pl-1 pr-2.5 py-1 text-xs font-medium text-neutral-700">
                                <span className="w-4 h-4 rounded-full shrink-0 ring-1 ring-neutral-300" style={{ backgroundColor: c }} />
                                {name}
                                <button
                                  type="button"
                                  onClick={() => removeColor(c)}
                                  disabled={selectedColors.length <= 1}
                                  className="text-neutral-400 hover:text-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed ml-0.5 leading-none"
                                >×</button>
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div className="border-t border-neutral-100" />

                    {/* Section 3 — Contact */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">3</span>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{t("custom.contact")}</p>
                          <p className="text-xs text-muted-foreground">{t("custom.contact.hint")}</p>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-medium text-neutral-600">{t("product.order.name")} *</label>
                          <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="..."
                            className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-medium text-neutral-600">{t("product.order.phone")} *</label>
                          <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+212..."
                            className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-neutral-600">{t("custom.notes")}</label>
                        <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t("custom.notes.placeholder")}
                          className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 resize-none" />
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="flex flex-col gap-3 pt-2">
                      {selectedSymbols.length === 0 && (
                        <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
                          ⚠ {t("custom.symbolRequired")}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={selectedSymbols.length === 0}
                        style={{ height: "52px" }}
                        className="w-full rounded-xl font-semibold text-sm transition-all duration-300 bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center justify-center gap-2"
                      >
                        <span>{t("product.order.submit")}</span>
                        <span className="opacity-60">→</span>
                      </button>
                      <p className="text-center text-xs text-muted-foreground">{t("custom.submitNote")}</p>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
