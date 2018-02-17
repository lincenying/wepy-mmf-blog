import { combineReducers } from 'redux'
import global from './global'
import topics from './topics'
import topicsByVisit from './topics-by-visit'
import article from './article'
import comment from './comment'

export default combineReducers({
    global,
    topics,
    topicsByVisit,
    article,
    comment,
})
