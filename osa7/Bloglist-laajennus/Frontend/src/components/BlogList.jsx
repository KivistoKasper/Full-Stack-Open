import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const byLikes = (a, b) => b.likes - a.likes;

const BlogList = ({ blogs }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  //console.log("blogs: ", blogs);

  return (
    <Table striped>
      <tbody>
        {blogs.sort(byLikes).map((blog) => (
          <tr key={blog.id}>
            <td>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author}
              </Link>
            </td>
            <td>{blog.user.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BlogList;
