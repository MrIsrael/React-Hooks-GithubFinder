import React, { Fragment, useEffect, useContext } from 'react';                            // se agrega el hook "useEffect"
import Spinner from "../layout/Spinner";
import Repos from '../repos/Repos';
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';
                                                                               // el prop 'match' se usa para poder mostrar la ruta (URL) con el nombre del usuario
const User = ({ match }) => {                                                  // se hubiera podido poner:                 const User = (props) => {
                                                                               // pero se hizo destructuring de una vez:   const User = ({ match, ... }) => {
  const githubContext = useContext(GithubContext);

  const { getUser, getUserRepos, user, loading, repos } = githubContext;

  useEffect(() => {                                                     // el Hook useEffect reemplaza al lifecycle method componentDidMount()
    getUser(match.params.login);                                               // pasar el nombre del usuario desde la ruta, al método getUser
    getUserRepos(match.params.login);                                          // pasar el nombre del usuario desde la ruta, al método getUserRepos
    // La siguiente "ruta Lint" borra el mensaje de error que sale siempre en la consola de Chrome. Se escribe como un comentario, de hecho:
    // eslint-disable-next-line
  }, []);                                                                // los brackets vacíos permiten que useEffect emule el comportamiento de
                                                                               // componentDidMount: las funciones dentro de él se ejecutarán solo 1 vez,
                                                                               // tan pronto se cargue el componente User.
  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable
  } = user;

  if (loading) return <Spinner />;

  return(
    <Fragment>
      <Link to='/' className='btn btn-light'>Back to Search</Link>
      Hireable: {' '}
      { hireable ? (<i className='fas fa-check text-success' />) :
                   (<i className='fas fa-times-circle text-danger' />)}
      <div className='card grid-2'>
        <div className='all-center'>
          <img src={avatar_url} className='round-img' alt='' style={{ width: '150px' }} />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className='btn btn-dark my-1'>Visit Github profile</a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: </strong> {login}
                </Fragment>
              )}
            </li>

            <li>
              {company && (
                  <Fragment>
                    <strong>Company: </strong> {company}
                  </Fragment>
              )}
            </li>

            <li>
              {blog && (
                  <Fragment>
                    <strong>Website: </strong> {blog}
                  </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className='card text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-success'>Following: {following}</div>
        <div className='badge badge-light'>Public Repos: {public_repos}</div>
        <div className='badge badge-dark'>Public Gists: {public_gists}</div>
      </div>

      <Repos repos={repos} />
    </Fragment>
  );
};

export default User;