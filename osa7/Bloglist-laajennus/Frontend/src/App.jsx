import { createRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

import blogService from "./services/blogs";
import loginService from "./services/login";
import storage from "./services/storage";
import userService from "./services/users";

import Login from "./components/Login";
import BlogList from "./components/BlogList";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useNotificationDispatch } from "./contexts/NotificationContext";

const App = () => {
  // for mutations
  const queryClient = useQueryClient();
  // for notification dispatch
  const dispatch = useNotificationDispatch();

  // ------- Mutations -------
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
  // for saving user
  const saveUserMutation = useMutation({
    mutationFn: storage.saveUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  // for removing user
  const removeUserMutation = useMutation({
    mutationFn: storage.removeUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  // ------- Mutations -------

  // getting user
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: storage.loadUser,
    retry: 1,
  });
  // getting blogs
  const blogQuery = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    retry: 1,
  });
  // getting users
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
    retry: 1,
  });

  if (blogQuery.isLoading) {
    return <div>loading data...</div>;
  } else if (blogQuery.isError) {
    return <div>anecdote service is not avaivable due problems is server</div>;
  }

  // place blogs data
  const blogs = blogQuery.data;
  // user and all users data
  const user = userQuery.data;
  //const users = usersQuery.data;

  const blogFormRef = createRef();

  // notification handler
  const notify = (message, state = "success") => {
    dispatch({ type: "MSG", msg: message, state: state });
    setTimeout(() => {
      dispatch({ type: "CLEAR" });
    }, 3500);
  };

  // ------- user login -------
  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      saveUserMutation.mutate(user);
      notify(`Welcome back, ${user.name}`);
    } catch (error) {
      notify("Wrong credentials", "error");
    }
  };

  const handleLogout = () => {
    removeUserMutation.mutate();
    notify(`Bye, ${user.name}!`);
  };
  // ------- user login -------

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

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Login doLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Link to="/users">Show users</Link>
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                  <NewBlog doCreate={handleCreate} />
                </Togglable>
                <BlogList blogs={blogs} />
              </div>
            }
          />
          <Route path="/users" element={<Users usersQuery={usersQuery} />} />
          <Route path="/users/:id" element={<User usersQuery={usersQuery} />} />
          <Route
            path="/blogs/:id"
            element={
              <Blog blogs={blogs} doVote={handleVote} doDelete={handleDelete} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
