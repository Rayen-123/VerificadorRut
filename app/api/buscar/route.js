import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  const API_KEY = "TU_API_KEY_AQUI";
  const CX = "TU_SEARCH_ENGINE_ID_AQUI";
  
  const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${query}&searchType=image&num=10`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // Extraemos solo las URLs de las imágenes
    const imagenes = data.items?.map(item => item.link) || [];
    return NextResponse.json(imagenes);
  } catch (error) {
    return NextResponse.json({ error: "Error en la búsqueda" }, { status: 500 });
  }
}