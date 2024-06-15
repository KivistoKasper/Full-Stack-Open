import axios from 'axios';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const apiKey = import.meta.env.VITE_API_KEY

const getWeather = (capital) => {
  return axios.get(`${baseUrl}q=${capital}&units=metric&appid=${apiKey}`).then(response => response.data);
}

export default { 
  get: getWeather
}