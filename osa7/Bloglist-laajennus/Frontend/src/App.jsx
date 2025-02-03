import { useState, useEffect, createRef } from "react";

import blogService from "./services/blogs";
import loginService from "./services/login";
import storage from "./services/storage";

import Login from "./components/Login";
import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useNotificationDispatch } from "./contexts/NotificationContext";

const App = () => {
  //const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  // for mutations
  const queryClient = useQueryClient();
  // for notification dispatch
  const dispatch = useNotificationDispatch();

  // ------- Mutations -------
  // Keeps this here above the useEffect!
  // create a new blog mutate.
  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
  // for voting
  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
  // for delete
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
  // ------- Mutations -------

  useEffect(() => {
    const user = storage.loadUser();
    if (user) {
      setUser(user);
    }
  }, []);

  const blogQuery = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    retry: 1,
  });

  if (blogQuery.isLoading) {
    return <div>loading data...</div>;
  } else if (blogQuery.isError) {
    return <div>anecdote service is not avaivable due problems is server</div>;
  }

  // place blogs data
  const blogs = blogQuery.data;

  const blogFormRef = createRef();

  // notification handler
  const notify = (message, state = "success") => {
    dispatch({ type: "MSG", msg: message, state: state });
    setTimeout(() => {
      dispatch({ type: "CLEAR" });
    }, 3500);
  };

  // login handler
  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      setUser(user);
      storage.saveUser(user);
      notify(`Welcome back, ${user.name}`);
    } catch (error) {
      notify("Wrong credentials", "error");
    }
  };

  // ------- Blog aggregation -------
  // handle new blog
  const handleCreate = async (blog) => {
    createBlogMutation.mutate(blog);
    notify(`Blog created: ${blog.title}, ${blog.author}`);
    blogFormRef.current.toggleVisibility();
  };

  // handle blog like
  const handleVote = async (blog) => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 });
    console.log("updating: ", blog);
    notify(`You liked ${blog.title} by ${blog.author}`);
  };

  // handle blog delete
  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id);
      console.log("Deleting: ", blog);
      notify(`Blog ${blog.title}, by ${blog.author} removed`);
    }
  };
  // ------- Blog aggregation -------

  const handleLogout = () => {
    setUser(null);
    storage.removeUser();
    notify(`Bye, ${user.name}!`);
  };

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Login doLogin={handleLogin} />
      </div>
    );
  }

  const byLikes = (a, b) => b.likes - a.likes;

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog doCreate={handleCreate} />
      </Togglable>
      {blogs.sort(byLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleVote={handleVote}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default App;
