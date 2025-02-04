import Blog from "./Blog";
import { Link } from "react-router-dom";

const byLikes = (a, b) => b.likes - a.likes;

const BlogList = ({ blogs, doVote, doDelete }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      {blogs.sort(byLikes).map((blog) => (
        <li style={style} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </li>
      ))}
    </div>
  );
};
/*
<Blog
  key={blog.id}
  blog={blog}
  handleVote={doVote}
  handleDelete={doDelete}
/>

*/
export default BlogList;
