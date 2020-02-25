import React from 'react';
import PropTypes from 'prop-types';
import RepoItem from './Repoitem';

const Repos = ({ repos }) => {
  return repos.map(repo => <RepoItem repo={repo} key={repo.id} />);       // siempre que se muestra una lista en React, cada elemento debe tener su ID
};

Repos.propTypes = {
  repos: PropTypes.array.isRequired
};

export default Repos;