import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  
  const vote = (id) => {
    console.log('vote', id)
    dispatch({type: 'VOTE', payload: {id: id}})
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    console.log('add anecdote ', event.target.newAnecdote.value)
    dispatch({type: 'NEW_ANECDOTE', payload: {content: event.target.newAnecdote.value}})
    event.target.newAnecdote.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(
        (a,b) => a.votes < b.votes ? 1 : -1
      ).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
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