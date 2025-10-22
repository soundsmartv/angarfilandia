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
  Images,
  Star,
  PhoneCall,
} from "lucide-react";
import { useState } from "react";

// =====================
// CONFIG GLOBAL (sin enlaces externos)
// =====================
const CONFIG = {
  brand: "Apartamento Dúplex en Filandia",
  whatsappNumber: "+57 311 764 4679", // mostrado, SIN enlace
  addressShort: "Filandia, Quindío – Colombia",
  capacity: "6 huéspedes",
  beds: "2 camas",
  baths: "2 baños",
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
      <h2 className="text-2xl md:text-3xl font-semibold text-stone-800">{title}</h2>
      {subtitle && <p className="text-stone-600 mt-3 leading-relaxed">{subtitle}</p>}
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white/80 backdrop-blur-sm shadow-sm p-4 flex gap-4 items-start">
      <div className="p-2 rounded-xl bg-emerald-600/10 text-emerald-900">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="font-medium text-stone-800">{title}</p>
        <p className="text-sm text-stone-600">{desc}</p>
      </div>
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
      <p className="text-sm text-stone-500 mt-3">— {name}{city ? `, ${city}` : ""}</p>
    </div>
  );
}

// =====================
// PÁGINA (sin enlaces de reserva. WhatsApp solo como dato visual + copiar)
// =====================
export default function LandingFilandia() {
  const [copied, setCopied] = useState(false);

  const copyWhatsapp = async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.whatsappNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      // no-op
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-emerald-50/40 to-white text-stone-800">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-emerald-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-600" />
            <span className="font-semibold">{CONFIG.brand}</span>
          </div>
          <nav className="hidden md:flex items-center gap-4 text-sm text-stone-600">
            <span className="opacity-70">Fotos</span>
            <span className="opacity-70">Servicios</span>
            <span className="opacity-70">Ubicación</span>
            <span className="opacity-70">Reseñas</span>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="relative h-[62vh] md:h-[78vh] w-full overflow-hidden">
          <Image src="/hero01.jpg" alt="Vista balcón Filandia" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 pb-24 md:pb-16 px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl text-white">
              <p className="text-sm tracking-widest uppercase text-emerald-200/90">{CONFIG.addressShort}</p>
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight mt-2">Tu descanso en Filandia</h1>
              <p className="mt-3 text-white/90 max-w-xl">Dúplex con parqueadero privado, balcón con vista y todo lo necesario para desconectar en el Eje Cafetero.</p>
              <div className="flex flex-wrap gap-2 mt-4 text-sm text-white/90">
                <span className="inline-flex items-center gap-1 bg-white/10 rounded-full px-3 py-1"><BedDouble className="w-4 h-4" /> {CONFIG.beds}</span>
                <span className="inline-flex items-center gap-1 bg-white/10 rounded-full px-3 py-1"><Bath className="w-4 h-4" /> {CONFIG.baths}</span>
                <span className="inline-flex items-center gap-1 bg-white/10 rounded-full px-3 py-1"><Wifi className="w-4 h-4" /> {CONFIG.wifi}</span>
                <span className="inline-flex items-center gap-1 bg-white/10 rounded-full px-3 py-1"><DoorOpen className="w-4 h-4" /> {CONFIG.capacity}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHATSAPP FLOTANTE (sin enlace): muestra y copia número */}
      <div className="fixed bottom-6 right-6 z-50">
        <button onClick={copyWhatsapp} className="flex items-center gap-2 rounded-full bg-emerald-600 text-white px-4 py-3 shadow-lg hover:opacity-95 active:scale-[0.99]">
          <PhoneCall className="w-5 h-5" />
          <span className="text-sm font-medium">Más información</span>
        </button>
        <div className="mt-2 text-[11px] text-stone-700 bg-white/90 rounded-full px-3 py-1 border border-emerald-100 shadow-sm">{CONFIG.whatsappNumber}</div>
        {copied && (
          <div className="mt-2 text-xs text-emerald-900 bg-emerald-100 rounded-full px-3 py-1 shadow-sm">
            Número copiado al portapapeles
          </div>
        )}
      </div>

      {/* POR QUÉ ELEGIRNOS */}
      <section className="max-w-6xl mx-auto px-4 py-14" id="ventajas">
        <SectionTitle eyebrow="Confort + Ubicación" title="Detalles que hacen la diferencia" subtitle="Todo lo que necesitas para una estadía cómoda y memorable." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Feature icon={Mountain} title="Vista panorámica" desc="Balcón con montañas y atardeceres únicos." />
          <Feature icon={Car} title="Parqueadero privado" desc="Tu vehículo seguro y a la mano." />
          <Feature icon={Coffee} title="Cerca de cafés" desc="Camina a cafés y restaurantes locales." />
          <Feature icon={Wifi} title="WiFi rápido" desc="Ideal para teletrabajo y streaming." />
          <Feature icon={ShieldCheck} title="Tranquilo y seguro" desc="Zona residencial, descanso garantizado." />
          <Feature icon={DoorOpen} title="Dúplex acogedor" desc="Dos niveles con distribución cómoda." />
        </div>
      </section>

      {/* GALERÍA */}
      <section className="bg-emerald-50/60 py-14" id="fotos">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle eyebrow="Explora" title="Galería de fotos" subtitle="Reemplaza estas imágenes por tus fotos reales." />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { src: "/g1.jpg", alt: "Fachada y parqueadero" },
              { src: "/g2.jpg", alt: "Sala y cocina" },
              { src: "/g3.jpg", alt: "Habitación principal" },
              { src: "/g4.jpg", alt: "Balcón con vista" },
              { src: "/g5.jpg", alt: "Baño moderno" },
              { src: "/g6.jpg", alt: "Detalle de decoración" },
              { src: "/g7.jpg", alt: "Detalle de decoración" },
            ].map((img) => (
              <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm">
                <Image src={img.src} alt={img.alt} fill className="object-cover hover:scale-105 transition" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE + SERVICIOS */}
      <section className="max-w-6xl mx-auto px-4 py-14" id="servicios">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <SectionTitle title="Un lugar pensado para descansar" center={false} />
            <p className="text-stone-600 leading-relaxed">
              Dúplex moderno y acogedor a 5 minutos del parque principal. Disfruta de un balcón con vista a las montañas, cocina completamente equipada y parqueadero privado.
              Perfecto para parejas, familias o viajeros que buscan tranquilidad sin alejarse de lo mejor de Filandia.
            </p>
            <ul className="mt-5 space-y-2 text-stone-700">
              <li>• Capacidad: {CONFIG.capacity}</li>
              <li>• Camas: {CONFIG.beds}</li>
              <li>• Baños: {CONFIG.baths}</li>
              <li>• Internet: {CONFIG.wifi}</li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Mountain, label: "Vista montaña" },
              { icon: Car, label: "Parqueadero" },
              { icon: Coffee, label: "Café cercano" },
              { icon: Wifi, label: "WiFi veloz" },
              { icon: ShieldCheck, label: "Seguro" },
              { icon: DoorOpen, label: "2 niveles" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-2xl border border-emerald-100 bg-white/80 shadow-sm p-5 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-600/10 text-emerald-900">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UBICACIÓN */}
      <section className="bg-emerald-50/60 py-14" id="ubicacion">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle eyebrow="Ubicación" title="En el corazón del Quindío" subtitle="Cerca del mirador, cafés artesanales y restaurantes típicos." />
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            <div className="rounded-2xl overflow-hidden shadow">
              <iframe src={CONFIG.mapEmbedUrl} width="100%" height="360" loading="lazy" className="border-0" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <div className="space-y-3 text-stone-700">
              <p>Base perfecta para recorrer el Eje Cafetero: Salento, Valle de Cocora y pueblos con encanto están a un corto trayecto.</p>
              <ul className="space-y-2">
                <li>• Mirador de Filandia</li>
                <li>• Parque principal y cafés</li>
                <li>• Transporte a Salento y Cocora</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* RESEÑAS */}
      <section className="max-w-6xl mx-auto px-4 py-14" id="resenas">
        <SectionTitle eyebrow="Opiniones" title="Nuestros huéspedes lo dicen" />
        <div className="grid md:grid-cols-3 gap-4">
          <Review name="Laura" city="Bogotá" text="El lugar es increíble, todo limpio y con una vista espectacular. Volvería sin pensarlo." />
          <Review name="Carlos" city="Medellín" text="Perfecto para descansar y trabajar remoto. Tiene todo lo necesario." />
          <Review name="Sophie" city="Francia" text="Decoración hermosa y atención excelente. Muy recomendado." />
        </div>
      </section>

      {/* CTA FINAL SIN ENLACES */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[url('/cta-texture.jpg')] bg-cover bg-center opacity-10" />
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold">Conoce tu próximo hospedaje en Filandia</h3>
          <p className="text-stone-600 mt-2">Naturaleza, comodidad y una vista que enamora. Sin enlaces externos, información clara y transparente.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-emerald-100 bg-white/60">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm">© {new Date().getFullYear()} {CONFIG.brand}. Todos los derechos reservados.</p>
          <div className="text-sm text-stone-600 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> {CONFIG.addressShort}
          </div>
        </div>
      </footer>
    </div>
  );
}
