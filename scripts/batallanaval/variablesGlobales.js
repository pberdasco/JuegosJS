const MAX_X = 12;
const MAX_Y = 12;
const VALE_PEGADO = false;
const CELDA_VACIA = 99;
const TiposBarco = [];

let T_Jugador_Propio;
let T_Jugador_Disparos;
let T_Maquina_Propio;
let T_Maquina_Disparos;

let BarcosJ = [];
let BarcosM = [];

const IngresoBarcoEnv = {barcoNumero: 0,   
                         barcosTipo: 1,    // cuantos barcos lleva ingresados del tipo actual
                         tipoNumero: 0};   // posicion del array de tipos que esta procesando