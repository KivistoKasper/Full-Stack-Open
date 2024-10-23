import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, voteAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
//import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  
  

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    console.log('add anecdote ', content)
    dispatch(createAnecdote(content))
    event.target.newAnecdote.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm />
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input 
          type='text'
          name='newAnecdote'
          /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App