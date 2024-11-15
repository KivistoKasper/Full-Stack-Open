import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, notificationClear } from '../reducers/notificationReducer'

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

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    
    dispatch(voteAnecdote(anecdote))
    dispatch(notificationChange(`you voted '${anecdote.content}'`))

    setTimeout(() => {
      dispatch(notificationClear())
    }, 4000)
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList