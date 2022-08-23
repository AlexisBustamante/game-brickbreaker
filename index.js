const contenedor = document.querySelector('.contenedor');

const altoTablero = 300;
const anchoTablero = 570;
const altoBloque = 20;
const anchoBloque = 100;

const posicionInicialBola = [270, 40];
const posicionActualBola = posicionInicialBola;

//poscion del usuario
const posicionInicialUsuario = [230, 10];
let posicionActualUsuario = posicionInicialUsuario;

//definicion de movimiento de bola
let xDireccionBola = 2;
let yDireccionBola = 2;
let diametroBola = 20;

//timer
let timerID;

//definicion de clase bloque
class Bloque {
    constructor(ejeX, ejeY) {
        this.bottomLeft = [ejeX, ejeY]
        this.bottomRigth = [ejeX + anchoBloque, ejeY]
        this.topLeft = [ejeX, ejeY + altoBloque]
        this.topRigth = [ejeX + anchoBloque, ejeY + altoBloque]
    }
}

//definir todos los bloques instanciando la clase
const bloques = [
    new Bloque(10, 250),
    new Bloque(120, 250),
    new Bloque(230, 250),
    new Bloque(340, 250),
    new Bloque(450, 250),
    new Bloque(10, 220),
    new Bloque(120, 220),
    new Bloque(230, 220),
    new Bloque(340, 220),
    new Bloque(450, 220),
    new Bloque(10, 190),
    new Bloque(120, 190),
    new Bloque(230, 190),
    new Bloque(340, 190),
    new Bloque(450, 190),
]

//main
//añadi evento lisent para el documento de la tabler

//añadir usuario
const bola = document.createElement('div');
const usuario = document.createElement('div');
bola.classList.add('bola');
usuario.classList.add('usuario');
contenedor.appendChild(usuario);
contenedor.appendChild(bola);

timerID = setInterval(moverBola, 10);
document.addEventListener('keydown', moverUsuario);

//ejecucion principal
addBloques();
dibujarUsuario();
dibujarBola();

//funcion mover bolaren
function moverBola() {
    posicionActualBola[0] += xDireccionBola
    posicionActualBola[1] += yDireccionBola
    dibujarBola();
    revisarColisiones();
    gameOver();
}


///funciones añadir bloques
function addBloques() {
    for (let index = 0; index < bloques.length; index++) {
        const bloque = document.createElement('div');
        bloque.classList.add('bloque')//al elemento se le agrega la clase
        bloque.style.left = bloques[index].bottomLeft[0] + 'px';//el eje x
        bloque.style.bottom = bloques[index].bottomLeft[1] + 'px';//el ejeY
        contenedor.appendChild(bloque);
    }
}

//definir iuario
function dibujarUsuario() {
    usuario.style.left = posicionActualUsuario[0] + 'px';
    usuario.style.bottom = posicionActualUsuario[1] + 'px';
}
//mover al usuario por el tablero
function moverUsuario(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (posicionActualUsuario[0] > 0) {
                posicionActualUsuario[0] -= 20;
                dibujarUsuario();

            }
            break;
        case 'ArrowRight':
            if (posicionActualUsuario[0] < (anchoTablero - anchoBloque)) {
                posicionActualUsuario[0] += 20;
                dibujarUsuario();
            }
    }
}

//dibujar bolast
function dibujarBola() {
    bola.style.left = posicionActualBola[0] + 'px';
    bola.style.bottom = posicionActualBola[1] + 'px';
}

//Funcion de cambiar la dirección.
function cambiarDireccion() {
    if (xDireccionBola === 2 && yDireccionBola === 2) {
        yDireccionBola = -2
        return
    }
    if (xDireccionBola === 2 && yDireccionBola === -2) {
        xDireccionBola = -2
        return
    }
    if (xDireccionBola === -2 && yDireccionBola === -2) {
        yDireccionBola = 2
        return
    }
    if (xDireccionBola === -2 && yDireccionBola === 2) {
        xDireccionBola = 2
        return
    }
}

function revisarColisiones() {
    //Colision con bloques
    for (let i = 0; i < bloques.length; i++) {
        if ((posicionActualBola[0] > bloques[i].bottomLeft[0] && posicionActualBola[0] < bloques[i].bottomRigth[0]) &&
            ((posicionActualBola[1] + diametroBola) > bloques[i].bottomLeft[1] && posicionActualBola[1] < bloques[i].topLeft[1])
        ) {
            const todosLosBloques = Array.from(document.querySelectorAll('.bloque'))
            todosLosBloques[i].classList.remove('bloque')
            bloques.splice(i, 1)
            cambiarDireccion()
        }
    }


    if (
        posicionActualBola[0] >= (anchoTablero - diametroBola) ||
        posicionActualBola[1] >= (altoTablero - diametroBola) ||
        posicionActualBola[0] <= 0 ||
        posicionActualBola[1] <= 0
    ) {
        cambiarDireccion();
    }
    //revision colision con usuario
    if ((posicionActualBola[0] > posicionActualUsuario[0] && posicionActualBola[0] < posicionActualUsuario[0] + anchoBloque) &&
        (posicionActualBola[1] > posicionActualUsuario[1] && posicionActualBola[1] < posicionActualUsuario[1] + altoBloque)
    ) {
        cambiarDireccion()
    }

}
//funcion que termina el juego si la bola toca suelo.
function gameOver() {
    if (posicionActualBola[1] <= 0) {
        //game over
        clearInterval(timerID)
        document.removeEventListener('keydown', moverUsuario)
    }
}


