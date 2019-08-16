import React, { useEffect, useState } from "react";
import Search from "./Search";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => {
        setUsers(users);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>{isLoading ? <p>Loading users ...</p> : <Search users={users} />}</div>
  );
};

export default App;
