// En este archivo se incluyen funciones que modifican el state dependiendo de las Actions definidas en el appState del contexto "github" (GithubState)
import { SET_ALERT, REMOVE_ALERT} from '../types';

export default (state, action) => {                 // El Reducer es una función, con 2 parámetros: state y action.
  switch (action.type) {
    case SET_ALERT:
      return action.payload;                        // El initialState indica que es 'null': No hay nada más que retornar mediante '...state'
    case REMOVE_ALERT:
      return null;                                  // Devolver initialState a su estado inicial: 'null'
    default:
      return state;
  }
};
