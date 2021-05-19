import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatTweet } from '../utils/helpers';

class Tweet extends Component {
    render(){
        const { tweet } = this.props;
        console.log(tweet);

        return(
            <div className="tweet"></div>
        )
    }
}

const mapStateToProps = ({tweets, users, authedUser}, {id}) =>{
    const tweet = tweets[id];

    return {
        authedUser,
        tweet: formatTweet(tweet, users[authedUser], authedUser)
    }
}

export default connect(mapStateToProps)(Tweet)
