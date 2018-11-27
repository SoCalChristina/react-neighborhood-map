import React, {Component} from 'react';

class ErrorAlert extends Component {
    state = {
        show: false,
        timeout: null
    }

    componentDidMount = () => {
        let timeout = window.setTimeout(this.showMessage, 1000);
        this.setState({timeout});
    }
//clear timeout if it's still running
    componentWillUnmount = () => {
        window.clearTimeout(this.state.timeout);
    }

    showMessage = () => {
        this.setState({show: true});
    }

    render = () => {
        return (
            <div>
                {this.state.show
                    ? (
                        <div>
                            <h3>Error loading map</h3>
                                <p>Network Error.</p>
                                <p> Unable to load map. </p>
                                <p>Check for internet connection and try again.</p>
                        </div>
                    ):
                    (<div><h1>Loading</h1></div>)}
                    </div>
        )
    }
}

export default ErrorAlert;
