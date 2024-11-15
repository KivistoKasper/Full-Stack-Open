import { createSlice } from "@reduxjs/toolkit"

import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      const id = action.payload.id
      const anecdoteToVote = state.find(n => n.id === id)
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1
      }
    }
  }
})

export const {updateAnecdote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = content => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(content)
    dispatch(updateAnecdote(votedAnecdote))
  }
}

export default anecdoteSlice.reducer
