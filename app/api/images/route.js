// /app/api/images/route.js
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Inicializa el cliente de Supabase usando la clave de Service Role (más segura para el servidor)
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const BUCKET_NAME = 'mochilas'; // ¡Asegúrate de que coincida con tu bucket!

export async function GET() {
    try {
        // 1. Llama a la API de Storage para listar archivos
        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .list('', { 
                limit: 100,
                offset: 0,
                sortBy: { column: 'name', order: 'asc' },
            });

        if (error) {
            console.error("Supabase Storage Error:", error);
            throw new Error(error.message);
        }

        // 2. Formatear la respuesta
        const imageUrlBase = process.env.NEXT_PUBLIC_STORAGE_URL;
        
        // El listado de Supabase incluye la URL del archivo al final del path.
        const imagesData = data
            .filter(item => item.name !== '.emptyFolderPlaceholder') // Filtra archivos de sistema
            .map(item => ({
                name: item.name,
                url: `${imageUrlBase}${item.name}`, // Construye la URL completa
                id: item.id // ID de Supabase
            }));
        
        return NextResponse.json({ 
            images: imagesData 
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching Supabase data:", error);
        return NextResponse.json({ 
            error: "Failed to fetch data from Supabase Storage", 
            details: error.message,
        }, {status:500});
    }
}