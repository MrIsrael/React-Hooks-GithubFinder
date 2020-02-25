// En este archivo se define el initial state de la app, y se incluyen las Actions: Funciones de búsqueda de usuarios, traer datos de una API, etc.
import React, { useReducer } from 'react';
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
  const initialState = null;                                          // se puede inicializar el State sin definirlo como un objeto, si solo contiene
                                                                      // un elemento ('null')
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // ACTION: Set Alert
  const setAlert = (message, type) => {
    dispatch({
      type: SET_ALERT,
      payload: { message, type }
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 3000);
  };

  return (
      <AlertContext.Provider
          value={{                                                    // se va a listar el 'value' de una etiqueta JSX; por eso el doble bracket '{{'
            alert: state,                                             // como initialState = null, se puede dar un 'value name' al state completo: p.ej. 'alert'
            setAlert
          }}
      >
        {props.children}                                            {/* ESTO PORQUÉ SE INCLUYE AQUÍ? */}
      </AlertContext.Provider>
  );
};

export default AlertState;