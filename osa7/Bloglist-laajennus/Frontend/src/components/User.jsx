import { useParams } from "react-router-dom";

const User = ({ usersQuery }) => {
  const id = useParams().id;
  if (usersQuery.isLoading) {
    return <div>loading...</div>;
  }
  //console.log("id: ", id);
  //console.log("data: ", usersQuery.data);
  const user = usersQuery.data.find((u) => u.id === id);
  console.log(user);
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>
            {b.title} by {b.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
