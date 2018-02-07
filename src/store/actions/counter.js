import { INCREMENT, DECREMENT, ASYNC_INCREMENT } from '../types/counter'
import { createAction } from 'redux-actions'

export const incRement = createAction(INCREMENT, ({ currentTarget }) => {
    return +currentTarget.dataset.id
})
export const decRement = createAction(DECREMENT)
export const asyncIncRement = createAction(ASYNC_INCREMENT)
