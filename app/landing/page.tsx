"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  Mountain,
  Car,
  Coffee,
  Wifi,
  ShieldCheck,
  DoorOpen,
  BedDouble,
  Bath,
  Star,
  PhoneCall,
  ChevronLeft,
  ChevronRight,
  Home,
  Sparkles,
} from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";

// =====================
// CONFIG GLOBAL
// =====================
const CONFIG = {
  brand: "Apartamento Dúplex en Filandia",
  whatsappNumber: "+57 311 764 4679",
  addressShort: "Filandia, Quindío – Colombia",
  capacity: "6 huéspedes",
  rooms: "3 habitaciones",
  beds: "4 camas",
  baths: "2,5 baños",
  wifi: "100 Mbps",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.720785802847!2d-75.6585!3d4.6745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e388e5a2e9a4fef%3A0x16dcf5d8c6d8a3b6!2sFilandia%2C%20Quind%C3%ADo!5e0!3m2!1ses!2sco!4v1700000000000",
};

// =====================
// SUBCOMPONENTES
// =====================
function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl mx-auto ${center ? "text-center" : ""} mb-8`}>
      {eyebrow && (
        <p className="text-sm tracking-widest uppercase text-emerald-700/80 mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl md:text-3xl font-semibold text-stone-800">
        {title}
      </h2>
      {subtitle && (
        <p className="text-stone-600 mt-3 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

function Review({
  name,
  city,
  text,
  stars = 5,
}: {
  name: string;
  city?: string;
  text: string;
  stars?: number;
}) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white shadow-sm p-4">
      <div className="flex items-center gap-1 text-amber-500 mb-2">
        {Array.from({ length: stars }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-500" />
        ))}
      </div>
      <p className="text-stone-700 leading-relaxed">“{text}”</p>
      <p className="text-sm text-stone-500 mt-3">
        — {name}
        {city ? `, ${city}` : ""}
      </p>
    </div>
  );
}

// =====================
// ZOOMABLE IMAGE
// =====================
function ZoomableImage({
  src,
  alt,
  next,
  prev,
  close,
}: {
  src: string;
  alt: string;
  next?: () => void;
  prev?: () => void;
  close?: () => void;
}) {
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // === Gestos táctiles ===
  const getDist = (t: TouchList) => {
    const dx = t[0].clientX - t[1].clientX;
    const dy = t[0].clientY - t[1].clientY;
    return Math.hypot(dx, dy);
  };
  const last = useRef({ dist: 0 });

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.nativeEvent.touches;
    if (t.length === 2) {
      last.current.dist = getDist(t);
    } else if (t.length === 1) {
      touchStartX.current = t[0].clientX;
    }
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.nativeEvent.touches;
    if (t.length === 2) {
      e.preventDefault();
      const dist = getDist(t);
      const delta = (dist - last.current.dist) / 300;
      last.current.dist = dist;
      setScale((s) => Math.min(4, Math.max(1, s + delta)));
    } else if (t.length === 1 && scale === 1) {
      touchEndX.current = t[0].clientX;
    }
  };

  const onTouchEnd = () => {
    if (scale > 1) return;
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const delta = touchEndX.current - touchStartX.current;
      if (Math.abs(delta) > 50) {
        if (delta > 0 && typeof prev === "function") prev();
        if (delta < 0 && typeof next === "function") next();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // === Navegación con teclado ===
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next?.();
      if (e.key === "ArrowLeft") prev?.();
      if (e.key === "Escape") close?.();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev, close]);

  const reset = () => {
    setScale(1);
    setTx(0);
    setTy(0);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full h-[90vh] overflow-hidden touch-pan-y select-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onDoubleClick={reset}
    >
      {/* Fondo oscuro */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm z-0" />

      {/* Imagen visible y centrada */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <img
          src={src}
          alt={alt}
          className="max-h-[90vh] max-w-[95vw] object-contain rounded-2xl shadow-lg transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
            transformOrigin: "center center",
          }}
        />
      </div>

      {/* Botones de navegación */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition z-20"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition z-20"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Cerrar */}
      <button
        onClick={close}
        className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition z-20"
        aria-label="Cerrar"
      >
        ✕
      </button>

      {/* Texto de ayuda */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-white/90 bg-black/40 px-2 py-1 rounded-full z-20">
        Desliza o usa las flechas ← →
      </div>
    </div>
  );
}

// =====================
// PÁGINA PRINCIPAL
// =====================
export default function LandingFilandia() {
  const [copied, setCopied] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // ------------------------------
  // ESTRUCTURA DE GALERÍA (useMemo)
  // ------------------------------
  const galeria = useMemo(
    () => [
      {
        id: "interiores",
        grupoLabel: "Interiores",
        GrupoIcon: Home,
        secciones: [
          {
            titulo: "Sala",
            desc: "Sofá cómodo, Smart TV y decoración cálida.",
            Icono: DoorOpen,
            imagenes: [
              { src: "/sala1.jpg", alt: "Sala principal" },
              { src: "/sala2.jpg", alt: "Sala con TV" },
            ],
          },
          {
            titulo: "Comedor",
            desc: "Mesa de comedor, copas de vino y ambiente ideal para compartir.",
            Icono: Coffee,
            imagenes: [
              { src: "/comedor1.jpg", alt: "Comedor principal" },
              { src: "/comedor2.jpg", alt: "Mesa con copas de vino" },
            ],
          },
        ],
      },
      {
        id: "habitaciones",
        grupoLabel: "Habitaciones",
        GrupoIcon: BedDouble,
        secciones: [
          {
            titulo: "Habitación 1",
            desc: "Cama Queen, cortinas opacas y espacio para ropa.",
            Icono: BedDouble,
            imagenes: [
              { src: "/hab1_1.jpg", alt: "Habitación 1" },
              { src: "/hab1_2.jpg", alt: "Habitación 1 detalle" },
            ],
          },
          {
            titulo: "Habitación 2",
            desc: "Dos camas individuales y ganchos para la ropa.",
            Icono: BedDouble,
            imagenes: [{ src: "/hab2_1.jpg", alt: "Habitación 2" }],
          },
        ],
      },
      {
        id: "banos",
        grupoLabel: "Baños",
        GrupoIcon: Bath,
        secciones: [
          {
            titulo: "Baño completo",
            desc: "Agua caliente, gel de ducha y jabón corporal.",
            Icono: Bath,
            imagenes: [{ src: "/bano1.jpg", alt: "Baño completo" }],
          },
        ],
      },
      {
        id: "exterior",
        grupoLabel: "Exterior",
        GrupoIcon: Mountain,
        secciones: [
          {
            titulo: "Exterior y vista",
            desc: "Fachada, parqueadero y vista exterior.",
            Icono: Mountain,
            imagenes: [
              { src: "/exterior1.jpg", alt: "Exterior - fachada" },
              { src: "/exterior3.jpg", alt: "Vista exterior" },
            ],
          },
        ],
      },
      {
        id: "detalles",
        grupoLabel: "Detalles",
        GrupoIcon: Sparkles,
        secciones: [
          {
            titulo: "Detalles y decoración",
            desc: "Accesorios y toques que enamoran.",
            Icono: Sparkles,
            imagenes: [
              { src: "/detalle1.jpg", alt: "Detalle 1" },
              { src: "/detalle2.jpg", alt: "Detalle 2" },
            ],
          },
        ],
      },
    ],
    []
  );

  const { allFotos, indexMap } = useMemo(() => {
    const all: { src: string; alt: string }[] = [];
    const map = new Map<string, number>();
    galeria.forEach((g) =>
      g.secciones.forEach((sec) =>
        sec.imagenes.forEach((img) => {
          const key = `${img.src}|${img.alt}`;
          if (!map.has(key)) {
            map.set(key, all.length);
            all.push(img);
          }
        })
      )
    );
    return { allFotos: all, indexMap: map };
  }, [galeria]);

  // ------------------------------
  // FUNCIONES
  // ------------------------------
  const openAt = (i: number) => setSelectedIndex(i);
  const close = () => setSelectedIndex(null);
  const next = () =>
    setSelectedIndex((i) =>
      i === null ? 0 : (i + 1) % allFotos.length
    );
  const prev = () =>
    setSelectedIndex((i) =>
      i === null ? 0 : (i - 1 + allFotos.length) % allFotos.length
    );

  useEffect(() => {
    if (selectedIndex !== null) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [selectedIndex]);

  const copyWhatsapp = async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.whatsappNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  // ------------------------------
  // RENDER PRINCIPAL
  // ------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-emerald-50/40 to-white text-stone-800">
      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-emerald-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-600" />
            <span className="font-semibold">{CONFIG.brand}</span>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="relative h-[62vh] md:h-[78vh] w-full overflow-hidden">
          <Image
            src="/hero01.jpg"
            alt="Vista balcón Filandia"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 pb-24 md:pb-16 px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl text-white"
            >
              <p className="text-sm tracking-widest uppercase text-emerald-200/90">
                {CONFIG.addressShort}
              </p>
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight mt-2">
                Tu descanso en Filandia
              </h1>
              <p className="mt-3 text-white/90 max-w-xl">
                Dúplex con parqueadero privado, balcón con vista y todo lo necesario para desconectar.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BOTÓN WHATSAPP */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={copyWhatsapp}
          className="flex items-center gap-2 rounded-full bg-emerald-600 text-white px-4 py-3 shadow-lg hover:opacity-95 active:scale-[0.99]"
        >
          <PhoneCall className="w-5 h-5" />
          <span className="text-sm font-medium">Más información</span>
        </button>
        <div className="mt-2 text-[11px] text-stone-700 bg-white/90 rounded-full px-3 py-1 border border-emerald-100 shadow-sm">
          {CONFIG.whatsappNumber}
        </div>
        {copied && (
          <div className="mt-2 text-xs text-emerald-900 bg-emerald-100 rounded-full px-3 py-1 shadow-sm">
            Número copiado al portapapeles
          </div>
        )}
      </div>

      {/* NAV STICKY */}
      <div className="sticky top-14 z-40 bg-white/70 backdrop-blur border-b border-emerald-100">
        <nav className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-center gap-2">
          {[
            { id: "interiores", label: "Interiores", Icon: Home },
            { id: "habitaciones", label: "Habitaciones", Icon: BedDouble },
            { id: "banos", label: "Baños", Icon: Bath },
            { id: "exterior", label: "Exterior", Icon: Mountain },
            { id: "detalles", label: "Detalles", Icon: Sparkles },
          ].map(({ id, label, Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-label={label}
              title={label}
              className="relative group p-2 rounded-full hover:bg-emerald-50 focus-visible:bg-emerald-50 outline-none"
            >
              <Icon className="w-5 h-5 text-emerald-700" />
              <span
                className="hidden md:block pointer-events-none absolute left-1/2 -translate-x-1/2 translate-y-1 mt-2 rounded-md bg-black/90 text-white text-xs px-2 py-1 opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity"
                style={{ bottom: "-1.75rem" }}
              >
                {label}
              </span>
            </a>
          ))}
        </nav>
      </div>

      {/* GALERÍA */}
      <section className="bg-emerald-50/60 py-14" id="fotos">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle
            eyebrow="Explora"
            title="Galería de fotos"
            subtitle="Recorre los diferentes ambientes del apartamento."
          />

          {galeria.map((grupo) => (
            <section key={grupo.id} id={grupo.id} className="scroll-mt-40 mb-12">
              <div className="flex items-center gap-2 mb-6">
                <grupo.GrupoIcon className="w-5 h-5 text-emerald-700" />
                <h3 className="text-xl md:text-2xl font-semibold text-stone-800">
                  {grupo.grupoLabel}
                </h3>
              </div>

              {grupo.secciones.map((sec, secIdx) => (
                <div key={secIdx} className="mb-8">
                  <div className="flex items-center gap-2 mb-1">
                    <sec.Icono className="w-4 h-4 text-emerald-700" />
                    <h4 className="text-lg font-medium text-stone-800">
                      {sec.titulo}
                    </h4>
                  </div>
                  <p className="text-stone-600 mb-4">{sec.desc}</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {sec.imagenes.map((img) => {
                      const key = `${img.src}|${img.alt}`;
                      const globalIndex = indexMap.get(key) ?? 0;
                      return (
                        <div
  key={img.src}
  className="group relative aspect-[3/4] md:aspect-[4/3] overflow-hidden rounded-2xl shadow-sm border border-emerald-100 bg-white/60 cursor-pointer grid place-items-center"
  onClick={() => openAt(globalIndex)}
>
  <Image
    src={img.src}
    alt={img.alt}
    fill
    className="object-contain transition-transform duration-300 group-hover:scale-105"
  />
</div>

                      );
                    })}
                  </div>
                </div>
              ))}
            </section>
          ))}

          {/* LIGHTBOX */}
          {selectedIndex !== null && (
            <div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={close}
            >
              <div
                className="relative w-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-3 right-3 text-white hover:text-emerald-300 transition"
                  onClick={close}
                >
                  ✕
                </button>
                <button
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
                  onClick={prev}
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
                  onClick={next}
                >
                  <ChevronRight className="w-7 h-7" />
                </button>

                <ZoomableImage
                  src={allFotos[selectedIndex].src}
                  alt={allFotos[selectedIndex].alt}
                  next={next}
                  prev={prev}
                  close={close}
                />

                <div className="mt-3 text-center text-white/90 text-sm">
                  {selectedIndex + 1} / {allFotos.length} —{" "}
                  {allFotos[selectedIndex].alt}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* RESEÑAS */}
      <section className="max-w-6xl mx-auto px-4 py-14" id="resenas">
        <SectionTitle eyebrow="Opiniones" title="Nuestros huéspedes lo dicen" />
        <div className="grid md:grid-cols-3 gap-4">
          <Review
            name="Laura"
            city="Bogotá"
            text="El lugar es increíble, todo limpio y con una vista espectacular."
          />
          <Review
            name="Carlos"
            city="Medellín"
            text="Perfecto para descansar y trabajar remoto. Tiene todo lo necesario."
          />
          <Review
            name="Sophie"
            city="Francia"
            text="Decoración hermosa y atención excelente. Muy recomendado."
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-emerald-100 bg-white/60">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm">
            © {new Date().getFullYear()} {CONFIG.brand}. Todos los derechos reservados. jorgeboar@gmail.com
          </p>
          <div className="text-sm text-stone-600 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> {CONFIG.addressShort}
          </div>
        </div>
      </footer>
    </div>
  );
}
