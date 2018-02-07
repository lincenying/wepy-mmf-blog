import { handleActions } from 'redux-actions'
import { INCREMENT, DECREMENT, ASYNC_INCREMENT } from '../types/counter'

export default handleActions({
    [INCREMENT] (state, action) {
        console.log(11111, action)
        return {
            ...state,
            num: state.num + 1
        }
    },
    [DECREMENT] (state, action) {
        console.log(22222, action)
        return {
            ...state,
            num: state.num - 1
        }
    },
    [ASYNC_INCREMENT] (state, action) {
        console.log(33333, action)
        return {
            ...state,
            asyncNum: state.asyncNum + action.payload
        }
    }
}, {
    num: 0,
    asyncNum: 0
})
