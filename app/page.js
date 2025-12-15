// /app/page.js

async function getDriveAssets() {
    // Mantener la lógica de fetch para la ruta API de Supabase
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const apiUrl = `${baseUrl}/api/images`; 

    try {
        const res = await fetch(apiUrl, { 
            next: { revalidate: 3600 } 
        });

        if (!res.ok) {
            throw new Error(`Error ${res.status} al obtener datos de Supabase.`);
        }
        
        const jsonResponse = await res.json();
        
        return jsonResponse.images || []; 
        
    } catch (error) {
        console.error("Fallo al cargar assets de Supabase:", error);
        return null;
    }
}

// ==========================================================
// 2. COMPONENTE PRINCIPAL (Usando Clases CSS)
// ==========================================================
export default async function ImageGalleryPage() {
    
    const imagesData = await getDriveAssets();

    if (!imagesData || imagesData.length === 0) {
        return (
            <div className="error-message">
                <h1>Error de Carga</h1>
                <p>No se pudieron obtener imágenes. Verifica la consola y las variables de entorno de Supabase.</p>
            </div>
        );
    }

    // Mapear los datos de las imágenes a elementos <img> de HTML
    const imageElements = imagesData.map((item, index) => (
        <div key={item.id || index} className="image-item">
            <img 
                src={item.url} 
                alt={item.name} 
            />
            <p className="image-name">{item.name}</p>
        </div>
    ));

    return (
        <div>
            <h1 className="gallery-title">
                Galería de Imágenes (Cargadas desde Supabase)
            </h1>
            
            <div className="gallery-container">
                {imageElements}
            </div>
        </div>
    );
}