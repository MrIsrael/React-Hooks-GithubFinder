// En este archivo se crea el Context para el resource particular al que aplique (Github finder, en este caso, pues es una app pequeña)
import { createContext } from 'react';

const alertContext = createContext();

export default alertContext;
