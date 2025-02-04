import Blog from "./Blog";

const byLikes = (a, b) => b.likes - a.likes;

const BlogList = ({ blogs, doVote, doDelete }) => {
  return (
    <div>
      {blogs.sort(byLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleVote={doVote}
          handleDelete={doDelete}
        />
      ))}
    </div>
  );
};

export default BlogList;
