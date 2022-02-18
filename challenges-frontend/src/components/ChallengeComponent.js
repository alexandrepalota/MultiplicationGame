import { Component } from "react";
import ApiClient from "../clients/ApiClient";

class ChallengeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            a: '',
            b: '',
            user: '',
            message: '',
            guess: 0
        };

        this.handleSubmintResult = this.handleSubmintResult.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        ApiClient.challenge().then(res => {
            if (res.ok) {
                res.json().then(json => {
                    this.setState({
                        a: json.factorA,
                        b: json.factorB
                    });
                });
            } else {
                this.updateMessage("Can't reach the server");
            }
        });
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    handleSubmintResult(event) {
        event.preventDefault();
        ApiClient.sendGuess(this.state.user, this.state.a, this.state.b, this.state.guess)
            .then(res => {
                if (res.ok) {
                    res.json().then(json => {
                        if (json.correct) {
                            this.updateMessage("Congratulations! Your guess is correct");
                        } else {
                            this.updateMessage("Oops! Your guess " + json.resultAttempt + " is wrong, but keep playing!");
                        }
                    });
                } else {
                    this.updateMessage("Error: server error or not available");
                }
            });
    }

    updateMessage(m) {
        this.setState({
            message: m
        });
    }

    render() {
        return (
            <div>
                <div>
                    <h3>Your new challenge is</h3>
                    <h1>{this.state.a} x {this.state.b}</h1>
                </div>
                <form onSubmit={this.handleSubmintResult}>
                    <label>
                        Your alias:
                        <input type="text" maxLength={12} name="user" value={this.state.user} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Your guess:
                        <input type="number" min="0" name="guess" value={this.state.guess} onChange={this.handleChange} />
                    </label>
                </form>
            </div>
        )
    }

}

export default ChallengeComponent;