import * as React from "react";
import Search from "./Search";

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
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
