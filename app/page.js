"use client";
import { useState } from 'react';
import { Rut } from './lib/Rut';
import { Button, Group, Input } from "@chakra-ui/react"

export default function PaginaRut() {
    const [inputRut, setInputRut] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [nombreClase, setNombreClase] = useState("vacio");

    const manejarAceptar = () => {
        const textoIngresado = inputRut.trim();

        if (textoIngresado !== "") {
            try {
                const objetoRut = new Rut(textoIngresado);
                
                if (objetoRut.esValido()) {
                    setMensaje(`¡RUT Válido! -> ${objetoRut.toString()}`);
                    setNombreClase("exito");
                } else {
                    setMensaje("Formato de RUT no reconocido");
                    setNombreClase("error");
                }
            } catch (e) {
                setMensaje("Hubo un error al procesar el RUT");
                setNombreClase("error");
            }
        } else {
            setMensaje("Por favor, ingresa un número");
            setNombreClase("espera");
        }
    };

    return (
    <main className="main-container">
            <div className='principal'>
                <div className="titulo-container">
                    <h1 className="titulo">VERIFICADOR DE RUT</h1>
                </div>

                <div>                    
                    <div className="input-container">
                        <Group attached w="full" maxW="sm">
                          <Input flex="1" placeholder="Ej: 12.345.678-K"
                            type="text" 
                            className="inputRut"
                            value={inputRut}
                            onChange={(e) => setInputRut(e.target.value)}/>
                          <Button bg="bg.subtle" variant="outline" onClick={manejarAceptar}>
                            Verificar RUT
                          </Button>
                        </Group>
                    </div>

                    {/* Caja de resultado dinámica */}
                    {mensaje && (
                        <div className={`mensaje-base ${nombreClase}`}>
                            {mensaje}
                        </div>
                    )}

                    {/* Formatos (La parte gris que tenías abajo) */}
                    <div className="formatos">
                        <p>Formatos aceptados</p>
                        <div>
                            <span className="formatosRut">12345678</span>
                            <span className="formatosRut">12345678-9</span>
                            <span className="formatosRut">12.345.678-K</span>
                            <span className="formatosRut">y más...</span>
                        </div>
                    </div>
                </div>
            </div>
            <p className="firma">
                Verificador de digito verificador del rut - © 2026 - Rayen Aburto
            </p>
        </main>
    );
}