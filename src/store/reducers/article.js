import { handleActions } from 'redux-actions'

export default handleActions({
    getArticle(state, action) {
        return {
            ...state,
            item: action.payload.item,
        }
    }
}, {
    item: {}
})
