// /app/components/PhaserLoader.js
'use client'; // ¡IMPORTANTE! Esto lo convierte en un Client Component

import dynamic from 'next/dynamic';

// 1. Carga el componente PhaserGame solo en el cliente (ssr: false)
// La ruta es relativa a este componente.
const DynamicPhaserGame = dynamic(
  () => import('./PhaserGame'), 
  { ssr: false }
);

export default function PhaserLoader() {
  return (
    <div>
      {/* 2. Renderiza el componente de juego cargado dinámicamente */}
      <DynamicPhaserGame />
    </div>
  );
}