import axios from "axios";
import storage from "./storage";

const baseUrl = "/api/blogs";

const getConfit = () => ({
  headers: { Authorization: `Bearer ${storage.loadUser().token}` },
});

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const update = async (newObject) => {
  const request = axios.put(
    `${baseUrl}/${newObject.id}`,
    newObject,
    getConfit(),
  );
  const response = await request;
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfit());
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfit());
  return response.data;
};

export default { getAll, create, update, remove };
