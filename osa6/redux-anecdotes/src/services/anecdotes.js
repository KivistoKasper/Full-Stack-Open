import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = {
    content: content,
    votes: 0
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async (anecdote) => {
  const putUrl = `${baseUrl}/${anecdote.id}/`
  const votes = anecdote.votes + 1
  
  const object = {
    content: anecdote.content,
    votes: votes,
   }

  const response = await axios.put(putUrl, object)
  return response.data
}

export default { getAll, createNew, vote }