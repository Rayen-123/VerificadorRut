export class Rut {
    constructor(rut) {
        this.rut = rut;
    }

    computeDv() {
        // Limpiar el RUT: quitar puntos, guión y espacios
        const rutLimpio = this.rut.replace(/[^0-9kK]/g, "");
        
        let rutNumerico;
        // Si el RUT incluye dígito verificador (longitud > 8), quitarlo
        if (rutLimpio.length > 8) {
            rutNumerico = rutLimpio.substring(0, rutLimpio.length - 1);
        } else {
            rutNumerico = rutLimpio;
        }

        let suma = 0;
        let cont = 2;

        // Recorrer el RUT de derecha a izquierda
        for (let i = rutNumerico.length - 1; i >= 0; i--) {
            const digito = parseInt(rutNumerico.charAt(i));
            suma += digito * cont;
            cont++;
            if (cont > 7) {
                cont = 2;
            }
        }

        const resto = suma % 11;
        const dvCalculado = 11 - resto;

        if (dvCalculado >= 1 && dvCalculado <= 9) {
            return dvCalculado.toString();
        } else if (dvCalculado === 10) {
            return 'K';
        } else {
            return '0';
        }
    }

    esValido() {
        try {
            const formatoValido = /^[0-9kK.\- ]+$/.test(this.rut);
            if (!formatoValido) return false;

            const rutLimpio = this.rut.replace(/[^0-9kK]/g, "");
            
            if (rutLimpio.length <= 7 || rutLimpio.length > 9) {
                return false;
            }
            
            let parteNumerica = rutLimpio.length > 8 
                ? rutLimpio.substring(0, rutLimpio.length - 1) 
                : rutLimpio;
                
            return /^[0-9]+$/.test(parteNumerica);
        } catch (e) {
            return false;
        }
    }

    toString() {
        const rutLimpio = this.rut.replace(/[^0-9kK]/g, "");
        let numeros;
        
        // Extraemos solo los números sin el DV original
        if (rutLimpio.length === 9) {
            numeros = rutLimpio.substring(0, 8);
        } else if (rutLimpio.length === 8) {
            numeros = rutLimpio.substring(0, 7);
        } else {
            numeros = rutLimpio;
        }
        
        return `${numeros}-${this.computeDv()}`;
    }
}