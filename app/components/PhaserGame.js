// /app/components/PhaserGame.js
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

// ==========================================================
// 1. CLASE DE LA ESCENA (Toda la lógica del juego)
// ==========================================================
class TicTacToeScene extends Phaser.Scene {
    constructor() {
        super('TicTacToeScene');
        this.board = null;       // Matriz 3x3 del estado del juego (0: vacío, 1: X, 2: O)
        this.currentPlayer = 1;  // 1 para X, 2 para O
        this.gameActive = true;  // Para detener la interacción al ganar
        this.gridSize = 100;     // Tamaño de cada casilla
        this.gridOffset = 250;   // Offset para centrar el tablero
        this.textInfo = null;    // Objeto de texto para mensajes
    }

    // 1.1. PRELOAD: Carga de recursos
    preload() {
        // Necesitas dos imágenes cuadradas para las marcas X y O
        // Ejemplo: public/assets/x.png y public/assets/o.png
        this.load.image('x', '/assets/x.png'); 
        this.load.image('o', '/assets/o.png'); 
    }

    // 1.2. CREATE: Inicialización
    create() {
        this.createBoardGraphics();
        this.initializeGameState();
        this.textInfo = this.add.text(400, 50, 'Turno de X', { 
            fontSize: '32px', 
            fill: '#FFF',
            backgroundColor: '#333'
        }).setOrigin(0.5);

        // Configurar el input para detectar clics en el tablero
        this.input.on('pointerdown', this.handleInput, this);
    }

    // Crea las líneas visibles del tablero
    createBoardGraphics() {
        const graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xffffff } });
        const size = this.gridSize;
        const offset = this.gridOffset;

        // Dibuja las dos líneas verticales
        for (let i = 1; i <= 2; i++) {
            graphics.lineBetween(offset + i * size, offset, offset + i * size, offset + 3 * size);
        }

        // Dibuja las dos líneas horizontales
        for (let i = 1; i <= 2; i++) {
            graphics.lineBetween(offset, offset + i * size, offset + 3 * size, offset + i * size);
        }
    }

    // Inicializa el tablero y variables
    initializeGameState() {
        // Tablero vacío 3x3
        this.board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        this.currentPlayer = 1;
        this.gameActive = true;
        if (this.textInfo) {
            this.textInfo.setText('Turno de X');
        }
        
        // Eliminar las marcas viejas si es un reinicio
        this.children.getAll().forEach(child => {
            if (child.texture && (child.texture.key === 'x' || child.texture.key === 'o')) {
                child.destroy();
            }
        });
    }

    // Maneja el clic del jugador
    handleInput(pointer) {
        if (!this.gameActive) {
            // Si el juego ha terminado, un clic reinicia el juego
            this.initializeGameState();
            return;
        }

        const x = pointer.x;
        const y = pointer.y;
        const size = this.gridSize;
        const offset = this.gridOffset;

        // Calcular la fila (row) y columna (col) basadas en las coordenadas del clic
        const row = Math.floor((y - offset) / size);
        const col = Math.floor((x - offset) / size);

        // 1. Validación de límites
        if (row < 0 || row > 2 || col < 0 || col > 2) {
            return; // Clic fuera del tablero
        }

        // 2. Validación de casilla vacía
        if (this.board[row][col] === 0) {
            this.makeMove(row, col);
        }
    }

    // Realiza el movimiento en el tablero y actualiza la gráfica
    makeMove(row, col) {
        const markerKey = this.currentPlayer === 1 ? 'x' : 'o';
        const offset = this.gridOffset;
        const size = this.gridSize;

        // 1. Actualizar el estado interno
        this.board[row][col] = this.currentPlayer;

        // 2. Dibujar la marca en el centro de la casilla
        const posX = offset + col * size + size / 2;
        const posY = offset + row * size + size / 2;
        
        this.add.image(posX, posY, markerKey)
            .setScale((size*0.45) / 128); // Ajustar el tamaño (asumiendo que X/O tienen 128px originales)

        // 3. Chequear el resultado
        if (this.checkForWin(this.currentPlayer)) {
            this.endGame(`¡${markerKey.toUpperCase()} GANA! Clic para reiniciar.`);
        } else if (this.checkForDraw()) {
            this.endGame("EMPATE. Clic para reiniciar.");
        } else {
            // 4. Cambiar de turno
            this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
            const nextPlayer = this.currentPlayer === 1 ? 'X' : 'O';
            this.textInfo.setText(`Turno de ${nextPlayer}`);
        }
    }

    // Lógica para chequear si el jugador actual ha ganado
    checkForWin(player) {
        const b = this.board;

        // Filas, Columnas y Diagonales
        for (let i = 0; i < 3; i++) {
            // Checkear filas (horizontal)
            if (b[i][0] === player && b[i][1] === player && b[i][2] === player) return true;
            // Checkear columnas (vertical)
            if (b[0][i] === player && b[1][i] === player && b[2][i] === player) return true;
        }

        // Checkear diagonales
        if (b[0][0] === player && b[1][1] === player && b[2][2] === player) return true; // Diagonal principal
        if (b[0][2] === player && b[1][1] === player && b[2][0] === player) return true; // Diagonal secundaria

        return false;
    }

    // Lógica para chequear empate
    checkForDraw() {
        // Si no hay ceros (espacios vacíos) y nadie ha ganado, es empate
        return !this.board.flat().includes(0);
    }

    // Finaliza el juego y muestra el mensaje
    endGame(message) {
        this.gameActive = false;
        this.textInfo.setText(message);
    }

    // No se necesita lógica continua en update para este juego
    // update() { }
}

// ==========================================================
// 2. COMPONENTE DE REACT (Monta la instancia de Phaser)
// ==========================================================
const PhaserGame = () => {
    const gameContainer = useRef(null);

    useEffect(() => {
        if (gameContainer.current) {
            const config = {
                type: Phaser.AUTO, 
                width: 800,
                height: 600,
                parent: gameContainer.current, 
                scene: [TicTacToeScene] // Usa la escena de Tic Tac Toe
            };

            const game = new Phaser.Game(config);

            return () => {
                game.destroy(true);
            };
        }
    }, []);

    return <div ref={gameContainer} id="phaser-game-container" />;
};

export default PhaserGame;