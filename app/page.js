// /app/page.js

import PhaserLoader from './components/PhaserLoader'; // Importa el componente de cliente

export default function GamePage() {
  return (
    <div>
      <h1>Mi Juego Web con Next.js y Phaser</h1>
      {/* Usamos el Client Component para cargar Phaser */}
      <PhaserLoader /> 
    </div>
  );
}