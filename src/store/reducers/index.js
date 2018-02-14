import { combineReducers } from 'redux'
import topics from './topics'
import topicsByVisit from './topics-by-visit'
import article from './article'
import comment from './comment'

export default combineReducers({
    topics,
    topicsByVisit,
    article,
    comment,
})
