"use client"
import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { fadeUp, stagger, slideInRight, scaleIn } from "@/lib/animations";

export const Route = ({
  head: () => ({
    meta: [
      { title: "Subtl — AI subtitles that follow your video" },
      { name: "description", content: "Generate accurate, beautifully timed subtitles in 40+ languages." },
      { property: "og:title", content: "Subtl — AI subtitles" },
      { property: "og:description", content: "Generate accurate, beautifully timed subtitles in 40+ languages." },
    ],
  }),
  component: Index,
});

const stats = [
  { value: "40+", label: "Languages" },
  { value: "99.2%", label: "Accuracy" },
  { value: "<2min", label: "Per video hour" },
];

const langs = ["English", "Spanish", "French", "German", "Japanese", "Korean", "Portuguese", "Arabic", "Hindi"];

export function Index() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => navigate({ to: "/processing" }), 400);
  };

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="mx-auto grid min-h-[calc(var(--vh,1vh)*100-4rem)] max-w-7xl grid-cols-1 gap-12 px-8 py-16 lg:grid-cols-2 lg:gap-16"
    >
      {/* LEFT */}
      <motion.div variants={stagger} className="flex flex-col justify-center">
        <motion.span
          variants={fadeUp}
          className="mb-6 inline-block w-fit rounded-full border border-brand-border bg-surface px-3 py-1 text-xs uppercase tracking-widest text-brand-muted"
        >
          AI subtitle studio
        </motion.span>
        <motion.h1 variants={fadeUp} className="font-serif text-[42px] leading-[1.1] font-medium">
          Words that follow<br />your video.
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-6 max-w-md text-base leading-relaxed text-brand-muted">
          Upload any video and receive frame-accurate subtitles in minutes. Export to SRT, VTT, or burn directly into your footage.
        </motion.p>

        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
          className="mt-12 grid grid-cols-3 gap-4"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="rounded-[14px] border border-brand-border bg-surface p-6"
            >
              <div className="font-serif text-3xl">{s.value}</div>
              <div className="mt-1 text-xs text-brand-muted">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* RIGHT */}
      <motion.div
        variants={slideInRight}
        className="flex flex-col rounded-[14px] border border-brand-border bg-surface p-8"
      >
        <motion.div
          animate={{ borderColor: ["#D4B8AA", "#C8763A", "#D4B8AA"] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ borderStyle: "dashed", borderWidth: 1.5 }}
          className="flex flex-col items-center justify-center rounded-[14px] bg-background py-16"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent"
          >
            <Upload className="h-6 w-6" />
          </motion.div>
          <p className="mt-4 font-serif text-lg">Drop your video here</p>
          <p className="mt-1 text-sm text-brand-muted">MP4, MOV, WebM up to 2GB</p>
        </motion.div>

        <div className="mt-8">
          <p className="text-xs uppercase tracking-widest text-brand-muted">Output language</p>
          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            initial="hidden"
            animate="show"
            className="mt-3 flex flex-wrap gap-2"
          >
            {langs.map((l) => (
              <motion.button
                key={l}
                variants={scaleIn}
                onClick={() => setSelectedLang(l)}
                className={`rounded-[10px] border px-3 py-1.5 text-sm transition-colors ${selectedLang === l
                    ? "border-brand-accent bg-brand-accent text-white"
                    : "border-brand-border bg-background text-foreground/80 hover:bg-brand-hover"
                  }`}
              >
                {l}
              </motion.button>
            ))}
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleGenerate}
          disabled={loading}
          className="mt-8 flex h-12 items-center justify-center gap-2 rounded-[10px] bg-brand-accent font-medium text-white disabled:opacity-80"
        >
          {loading ? (
            <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}>
              <Loader2 className="h-5 w-5" />
            </motion.span>
          ) : (
            "Generate Subtitles"
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
