import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
    
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')

    newAnecdoteMutation.mutate({content, votes: 0}, {
      onError: (err) => {
        //console.log("ERRRORRRR", err.response.data.error)
        dispatch({type: "MSG", msg: err.response.data.error})
        setTimeout(() => {
          dispatch({type: "CLEAR"})
        }, 5000)
      },
      onSuccess: () => {
        dispatch({type: "MSG", msg: `You added ${content}`})
        setTimeout(() => {
          dispatch({type: "CLEAR"})
        }, 3500)
      }
    })

    console.log("")
    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
