// En este archivo se define el initial state de la app, y se incluyen las Actions: Funciones de búsqueda de usuarios, traer datos de una API, etc.
import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  CLEAR_USERS,
  GET_USER,
  SET_LOADING,
  GET_REPOS
} from '../types';

let githubClientID;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientID = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientID = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // ACTION: Search users
  const searchUsers = async (text) => {                           // ojo al lugar correcto donde se usa "async" en una arrow function
    setLoading();

    const res = await axios.get(`https://api.github.com/search/users?q=
      ${text}&client_id=
      ${githubClientID}&client_secret=
      ${githubClientSecret}`
    );                                                            // ojo al uso de backticks (``)

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items                                     // el payload son los datos que se despacharán al Reducer, desde la Action
    });
  };

  // ACTION: Get User
  const getUser = async (username) => {
    setLoading();

    const res = await axios.get(
        `https://api.github.com/users/${username}?client_id=
      ${githubClientID}&client_secret=
      ${githubClientSecret}`);                                    // ojo al uso de backticks (``)

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  };

  // ACTION: Get Repos
  const getUserRepos = async (username) => {
    setLoading();

    const res = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
      ${githubClientID}&client_secret=
      ${githubClientSecret}`);                                    // ojo al uso de backticks (``)

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };

  // ACTION: Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // ACTION: Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });       // una Action SIEMPRE despacha algo al reducer (type y/o payload)

  return (
    <GithubContext.Provider
      value={{                                                    // se va a listar el 'value' de una etiqueta JSX; por eso el doble bracket '{{'
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,                                              // RECORDAR: Si no se retornan los elementos del appState o las
        clearUsers,                                               // Actions dentro del Provider, NO pueden invocarse o usarse desde
        getUser,                                                  // cualquier componente de la aplicación!
        getUserRepos
      }}
    >
      {props.children}                                            {/* ESTO PORQUÉ SE INCLUYE AQUÍ? */}
    </GithubContext.Provider>
  );
};

export default GithubState;