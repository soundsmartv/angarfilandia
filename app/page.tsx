// app/page.tsx
import { redirect } from "next/navigation";

// Este archivo se ejecuta en el servidor (no lleves "use client")
export default function Home() {
  redirect("/landing");
}
