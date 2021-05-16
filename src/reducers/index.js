import { combineReducers } from 'redux'
import authedUser from './authedUser'
import user from './users'
import tweets from './tweets'

export default combineReducers({
    authedUser,
    users,
    tweets
})
