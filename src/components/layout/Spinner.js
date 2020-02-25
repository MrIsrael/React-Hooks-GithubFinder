import React, { Fragment } from 'react';
import spinner from './spinner.gif';                // se pueden importar imágenes así, por tener webpack instalado

// Con arrow functions, si se retorna solo 1 statement (la etiqueta <Fragment>), se puede omitir
// el uso del método return().
const Spinner = () => <Fragment>
      <img src={spinner} alt="Loading..."
           style={{ width: '200px', margin: 'auto', display: 'block' }} />
    </Fragment>;

export default Spinner;