import React, {Component, useState, useRef, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

const useSearch = (collection, predicate) => {
  const [query, setQuery] = useState();
  const [filteredCollection, setFilteredCollection] = useState(collection);

  useEffect(() => {
    setFilteredCollection(collection.filter(item => predicate(item, query)));
  }, [query]);

  const handleChange = ({target: {value}}) => setQuery(value);

  return [filteredCollection, query, handleChange];
};

const names = ['Emil', 'Frederik', 'Jimmy', 'Jesper', 'Jacob', 'Villads'];

const predicate = (name, query) => name.includes(query);

const App = () => {
  const [filteredNames, query, handleChange] = useSearch(names, predicate);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input value={query} onChange={handleChange} />
        {filteredNames.map(name => (
          <p>{name}</p>
        ))}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
