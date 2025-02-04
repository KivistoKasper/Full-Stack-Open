import axios from "axios";
import storage from "./storage";

const baseUrl = "/api/users";

const getConfit = () => ({
  headers: { Authorization: `Bearer ${storage.loadUser().token}` },
});

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  console.log(response.data);
  return response.data;
};

export default { getAll };
