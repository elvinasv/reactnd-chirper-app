import { showLoading, hideLoading } from 'react-redux-loading'
import { saveLikeToggle, saveTweet } from '../utils/api'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'

function addTweet(tweet){
    return {
        type: ADD_TWEET,
        tweet,
    }
}

export function receiveTweets(tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets,
    }
}

const toggleTweet = ({id, authedUser, hasLiked}) => {
    return {
        type: TOGGLE_TWEET,
        id,
        authedUser,
        hasLiked
    }
}

export function handleAddTweet(tweet, replyingTo){
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())

        saveTweet({
            text: tweet,
            author: authedUser,
            replyingTo
        })
            .then((tweet) => dispatch(addTweet(tweet)))
            .then(() => dispatch(hideLoading()))
    }
}

export function handleToggleTweet(info) {
    return (dispatch) => {
        dispatch(toggleTweet(info))

        return saveLikeToggle(info)
            .catch((e)=>{
                console.warn('Error in handleToggleTweet', e)
                dispatch(toggleTweet(info))
                alert('There was an error liking a tweet')
            })
    }
}
