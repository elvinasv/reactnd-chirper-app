import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { formatTweet, formatDate } from '../utils/helpers';
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti';
import { handleToggleTweet } from '../actions/tweets';
class Tweet extends Component {
    handleLike = (e) => {
        e.preventDefault()

        const {dispatch, tweet, authedUser} = this.props;

        dispatch(handleToggleTweet({
            id: tweet.id,
            authedUser,
            hasLiked: tweet.hasLiked
        }))
    }

    toParent = (e, id) => {
        e.preventDefault()
        this.props.history.push(`/tweet/${id}`)
    }

    render(){
        const { tweet } = this.props;

        if (!tweet) {
            return <p>This tweet does not exist</p>
        }

        const {
            name, avatar, timestamp, text, hasLiked, likes, replies, parent, id
        } = tweet

          return(
            <Link to={`/tweet/${id}`} className="tweet">
                <img
                    src={avatar}
                    alt={`Avatar of ${name}`}
                    className='avatar'
                />
                <div className='tweet-info'>
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                            <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                                Replying to @{parent.author}
                            </button>
                        )}
                        <p>{text}</p>
                    </div>
                    <div className='tweet-icons'>
                        <TiArrowBackOutline className='tweet-icon' />
                        <span>{replies !== 0 && replies}</span>
                        <button className='heart-button' onClick={this.handleLike}>
                        {hasLiked === true
                            ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                            : <TiHeartOutline className='tweet-icon'/>}
                        </button>
                        <span>{likes !== 0 && likes}</span>
                    </div>
                </div>
            </Link>
        )
    }
}

const mapStateToProps = ({tweets, users, authedUser}, {id}) =>{
    const tweet = tweets[id];
    const parentTweetId = tweet ? tweets[tweet.replyingTo] : null

    return {
        authedUser,
        tweet: tweet
            ? formatTweet(tweet, users[tweet.author], authedUser, parentTweetId)
            : null
    }
}

export default withRouter(connect(mapStateToProps)(Tweet))
