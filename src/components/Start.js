import React from 'react'
import App from './App.js';
import AppIcon from '../images/app_icon2.png'

class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            cityValue: "",
            errorMessage: "",
            key: '59f584dffd1f435e3a89e00798792587',
            validation: false,
            loading: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState({...this.state, [event.target.name]: value})
    }

    handleChangeName(event) {
        this.setState({name: event.target.value})
    }

    handleSubmit(event) {
        this.setState({loading: true})
        return fetch('https://api.openweathermap.org/data/2.5/weather?q=' + this.state.cityValue + '&appid=' + this.state.key)
            .then(function (resp) {
                return resp.json()
            })
            .then((data) => {
                if (data.cod === "404" || data.cod === "400") {
                    setTimeout(() => {
                        this.setState({errorMessage: "Sorry, there is no such city"});
                        this.setState({loading: false});
                    }, 1000)
                } else {
                    setTimeout(() => {
                        this.setState({validation: true})
                    }, 1000);
                    localStorage.setItem("name", this.state.name);
                    localStorage.setItem("city", this.state.cityValue);
                }
            })
            .catch(() => {
                console.log(this.state.validation);
                console.log("error message");
            });
    }

    render() {
        return (
            this.state.validation ? (<App city={this.state.cityValue} name={this.state.name}/>) : (
                <div className="starting-container">
                    <img src={AppIcon} className={"app-icon"} alt={""}/>
                    <div className="box-title"><span className="box-colored-small">Welcome to</span></div>
                    <div className="box-title"><span className="box-colored"/>Weather-Dos</div>
                    <div className="input-box">
                        <div className="box-subtitle">Enter your location to get weather info</div>
                        <form onSubmit={
                            (e) => {
                                e.preventDefault();
                                this.handleSubmit(this.state.cityValue);
                            }}>
                            <div className="inputs">
                                <input type="text" name="cityValue" id="city" value={this.state.cityValue}
                                       onChange={this.handleChange} placeholder="Your city"/>
                            </div>
                            <div className="error-message">{this.state.errorMessage}</div>
                            {this.state.loading ? <div className="loading-ellipsis">
                                <div/><div/><div/><div/>
                            </div> : (<button type="submit" value="Send">Continue</button>)}
                        </form>
                    </div>
                </div>
            )
        )
    }
}

export default Start
