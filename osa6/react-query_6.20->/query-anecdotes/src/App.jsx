import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()

  // for notification dispatch
  const dispatch = useNotificationDispatch()

  // for voting 
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    dispatch({type: "VOTE", msg: `You voted ${anecdote.content}`})
    setTimeout(() => {
      dispatch({type: "CLEAR"})
    }, 3500)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
    
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ){
    return <div>loading data...</div>
  }
  else if ( result.isError ){
    return <div>anecdote service is not avaivable due problems is server</div>
  }

  const anecdotes = result.data 

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
