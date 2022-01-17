import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

class SingleTask extends React.Component {
    constructor(props) {
        super(props)
        this.state = { active: true }
    }
    render() {
        return (
            <div className={this.props.crossed ? 'crossed-out single-task' : 'single-task'} onClick={() =>
             this.props.handleCross(this.props.message)}>
                <p>{this.props.message}</p>
                <div className="remove-task" onClick={(event) => {
                        setTimeout(() => {
                            let index = this.props.message;
                            this.props.handleRemove(index);
                        }, 50);
                        event.stopPropagation()
                    }}>
                    <FontAwesomeIcon icon={faTimesCircle} />
                </div>
            </div>
        )
    }
}

export default SingleTask
