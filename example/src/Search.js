import React from "react";
import { useSearch } from "use-search";

const predicate = (user, query) =>
  user.name.toLowerCase().includes(query.toLowerCase());

const Search = ({ users }) => {
  const [filteredUsers, query, handleChange] = useSearch(users, predicate);

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
