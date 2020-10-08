import * as React from 'react';
import {useSearch} from 'react-use-search';

interface User {
  id: number;
  name: string;
}

interface Props {
  users: Array<User>;
}

const predicate = (user: User, query: string): boolean =>
  user.name.toLowerCase().includes(query.toLowerCase());

const Search = ({users}: Props) => {
  const [filteredUsers, query, handleChange] = useSearch(users, predicate, {
    filter: true,
    debounce: 200,
  });

  return (
    <div>
      <input
        autoFocus
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search ..."
      />

      {filteredUsers.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default Search;
