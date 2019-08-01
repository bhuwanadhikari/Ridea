import React, { Component } from 'react';
import axios from 'axios';
import InputField from '../../ui/InputField/InputField';
import Button from '../../ui/Button/Button';
import { ETIME } from 'constants';

class Calc extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fare: '',
            errors: {},
            myFare: '',
            hisFare: '',
            showSummary: false,
        }
    }

    handleCalcSubmit = (e) => {
        e.preventDefault();
        if (this.state.fare % 10 !== 0) {
            console.log("inside errors");
            this.setState({ errors: { fare: 'Enter the taxi fare in the multiple of 10' } });
            return;
        }
        const payload = {
            totalFare: this.state.fare,
            him: this.props.him
        }
        axios
            .post('/api/fare/calc-fare', { ...payload })
            .then(res => {
                console.log('The response is ', res.data);
                this.setState({
                    myFare: res.data.myFare,
                    hisFare: res.data.hisFare,
                    showSummary: true
                });
            })
    }

    onChangeHandler = (e) => {
        console.log('changin');
        this.setState({ fare: e.target.value, errors: {} });
    }


    render() {
        return (
            <div className="CalcWrapper">
                {!this.state.showSummary
                    ? (<form >
                        <InputField
                            autofocus={true}
                            value={this.state.fare || ""}
                            type="number"
                            name="fare"
                            placeholder="Input total Fare"
                            changed={this.onChangeHandler}
                            errors={this.state.errors}
                        />
                        <Button
                            clicked={this.handleCalcSubmit}
                            cls="Success InlineBtn"
                        >
                            Calculate
                    </Button>

                        <Button
                            clicked={this.props.calcClosed}
                            cls="Warning InlineBtn"
                        >
                            Cancel
                    </Button>

                    </form>)
                    : (<form>

                        <h3>Your Fare: Rs.{this.state.myFare}</h3>
                        <h3>Your Partner's Fare: Rs.{this.state.hisFare}</h3>

                        <Button
                            clicked={this.props.calcClosed}
                            cls="Warning InlineBtn"
                        >
                            Okay
                        </Button>

                    </form>)}

            </div>
        );
    }
}

export default Calc;