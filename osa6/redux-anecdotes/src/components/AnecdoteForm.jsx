import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, notificationClear } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value

    dispatch(createAnecdote(content))
    dispatch(notificationChange(`you added '${content}'`))
    
    // clear notification
    setTimeout(() => {
      dispatch(notificationClear())
    }, 4000)
    event.target.newAnecdote.value = ''
  }

  return (
    <div>
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

export default AnecdoteForm