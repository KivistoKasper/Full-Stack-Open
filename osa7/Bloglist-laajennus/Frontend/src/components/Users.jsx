import userService from "../services/users";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Users = () => {
  // getting blogs
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
    retry: 1,
  });

  if (usersQuery.isLoading) {
    return <div>loading...</div>;
  }

  const users = usersQuery.data;
  console.log("users: ", users);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
          {users.map((u) => (
            <tr key={u.id}>
              <th>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </th>
              <th>{u.blogs.length}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
