import React, {Component} from 'react'

class NewTweet extends Component {
    state = {
        text: '',
    }

    handleChange = (e) => {
        const text = e.target.value

        this.setState(() => ({
            text
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { text } = this.state

        // todo: Add Tweet to Store

        console.log('New Tweet: ', text)

        this.setState(() => ({
            text: ''
        }))
    }

    render(){
        const { text } = this.state

        const tweetLeft = 280 - text.length

        return(
            <div>
                <h3 className="center">Compose a new tweet</h3>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                    <textarea
                        className='textarea'
                        placeholder="What's happenning?"
                        onChange={this.handleChange}
                        value={text}
                        maxLength="280"
                    />
                    {tweetLeft <= 100 && (
                        <div className="tweet-length">
                            {tweetLeft}
                        </div>
                    )}
                    <button
                        className='btn'
                        type='submit'
                        disabled={!Boolean(text)}
                    >
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default NewTweet
