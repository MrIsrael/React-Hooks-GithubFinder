// En este archivo se incluyen funciones que modifican el state dependiendo de las Actions definidas en el appState del contexto "github" (GithubState)
import {
  SEARCH_USERS,
  CLEAR_USERS,
  GET_USER,
  SET_LOADING,
  GET_REPOS
} from '../types';

export default (state, action) => {                 // El Reducer es una función, con 2 parámetros: state y action.
  switch (action.type) {                            // El 'dispatch' enviado al Reducer desde el State contiene un 'type' y un posible 'payload'.
    case SEARCH_USERS:                              // Se evalúa aquí el 'type' recibido.
      return {
        ...state,
        users: action.payload,                      // Se asigna al elemento 'users' del state el 'payload' recibido desde la Action
        loading: false
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false
      };
    case SET_LOADING:
      return {                                      // El state no se puede modificar directamente; se debe hacer primero una "copia" de él,
        ...state,                                   // modificar esa copia, y luego "sobreescribir" el state anterior con el modificado.
        loading: true                               // Si se despachó al Reducer el type 'SET_LOADING', se cambia del initialState (o del state,
      };                                            // como sea que esté actualmente) el elemento 'loading', al valor 'true'.
    default:
      return state;                                 // Si no se recibe ningún 'type' al invocar al Reducer (cuando se crea un 'dispatch'), el Reducer
  }                                                 // no retorna nada diferente: Devuelve el state como estaba.
}
