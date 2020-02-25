import React, { useContext, useState } from 'react';                // uso de Hooks
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const [text, setText] = useState('');                   // El componente Search usa su propio state; no toma valores desde el Provider

  const onChange = event => setText(event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();                                         // se incluye esto para que en el submit no se envíen los datos a un archivo, por defecto
    if (text === '') {
      alertContext.setAlert('Please enter something...', 'light');
    } else {
      githubContext.searchUsers(text);
      setText('');
    }
  };

  return(
    <div>
      <form onSubmit={onSubmit} className="form">
        <input type="text" name="text" placeholder="Search users..."
               value={text} onChange={onChange} />
        <input type="submit" value="Search" className="btn btn-dark btn-block" />
      </form>
      { githubContext.users.length > 0 && (                         // implementando un "if" mediante un operador AND !!!
        <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>
          Clear
        </button>
        )
      }
    </div>
  );
};

export default Search;