import React, {useContext} from 'react';
import Useritem from './Useritem';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext';

const Users = () => {
  const githubContext = useContext(GithubContext);    // al importar y definir el Context en este componente, se pueden invocar y usar
                                                      // todas las Actions y elementos del State global para toda la app (GithubState).
  const { users, loading } = githubContext;           // destructuring de un par de 'values' del Context, que son los que se usan aquí

/*  Lo que se pretende con la función .map abajo es retornar (mostrar en pantalla), para cada uno de los usuarios del arreglo "users[]",
    el componente Useritem, pasando a dicho componente los datos relevantes de cada usuario, mediante props, en cada iteración de .map()  */
    if (loading) {   // es lo mismo que: if (loading === true) {
      return <Spinner />
    } else {
      return(
          <div style={userStyle}>
            {users.map(user => (
                <Useritem key={user.id} user={user} />
            ))}
          </div>
      );
    }
};

const userStyle = {                                   // con este estilo se logran mostrar 3 columnas de usuarios, es estilo grid
  display: 'grid',                                    // cada fila del grid se va llenando automáticamente, a medida que se hace el
  gridTemplateColumns: 'repeat(3, 1fr)',              // fetch de usuarios desde la API de Github, a través del endpoint al cual se
  gridGap: '1rem'                                     // comunican las funciones getUser y searchUsers, en el componente principal (App.js).
};

export default Users;