import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    else {
      return state.anecdotes.filter(a => a.content.toLowerCase().includes(
        state.filter.toLowerCase()
      ))
    }
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      {[... anecdotes]
      .sort((a,b) => a.votes < b.votes ? 1 : -1)
      .map(anecdote =>
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
    </div>
  )
}

export default AnecdoteList