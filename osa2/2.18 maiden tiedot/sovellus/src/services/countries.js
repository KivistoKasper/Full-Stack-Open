import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
const getAllUrl = `${baseUrl}/api/all`

const getAll = () => {
    return axios.get(getAllUrl).then(response => response.data);
  }

export default { getAll: getAll}