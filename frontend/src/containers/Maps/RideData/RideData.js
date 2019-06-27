import React, { Component } from 'react';
import InputField from '../../../ui/InputField/InputField';
import Button from '../../../ui/Button/Button';

import './RideData.css'


const newRideData = {};
class RideData extends Component {
    constructor(props) {
        super(props)

        this.state = {
            seatsCount: 1,
            pickupTime: "test",
            errors: {}
        }
    }

    onChangeHandler = (e) => {
        newRideData[e.target.name] = e.target.value;
    }

    onSubmitHandler = () => {
        console.log("Submit button clicked");
        if (Object.keys(newRideData).length < 6) {
            alert("Input all of the fields");
        } else {
            //convert all of the date to date
            // if(newRideData.shift)
            console.log(newRideData);
            const pickupTime = new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate(),
                newRideData.hour,
                newRideData.minute,
                0,
                0
            );
            console.log(pickupTime.toISOString());
            this.setState({
                seatsCount: newRideData.seatsCount,
                pickupTime,
                
            });
        }
    }

    render() {

        console.log(new Date().getMonth());
        let hourOptions = []
        for (let i = 1; i <= 12; i++) {
            hourOptions.push(<option key={i} value={i}>{i}</option>);
        }


        let minutesOptions = []
        for (let i = 0; i <= 11; i++) {
            minutesOptions.push(<option key={i} value={i * 5}>{i * 5}</option>);
        }

        let waitForOptions = []
        for (let i = 0; i <= 18; i++) {
            waitForOptions.push(<option key={i} value={i * 5}>{i * 5}</option>);
        }

        return (
            <div className="RideDataContainer">
                <h2 className="RideDataTitle">Before you Finish</h2>

                <div className="Selector">
                    Number of Seats: <select
                        onChange={this.onChangeHandler}
                        name="seatsCount"
                        type="number"
                        className="SeatNumberSelector"
                    >
                        <option value="" hidden>No. of seats</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>

                <div className="Selector">
                    Date: <select
                        name='day'
                        onChange={this.onChangeHandler}
                        type="text"
                        className="DaySelector"
                    >
                        <option value="" hidden>Date</option>
                        <option value="0">Today</option>
                        <option value="1">Tomorrow</option>
                    </select>
                </div>

                <div className="Selector">
                    Time: <select
                        name='hour'
                        onChange={this.onChangeHandler}
                        type="number"
                        className="HourSelector"
                    >

                        <option value="" hidden>Hour</option>
                        {hourOptions}
                    </select>
                    <select
                        name='minute'
                        onChange={this.onChangeHandler}
                        type="number"
                        className="HourSelector"
                    >
                        <option value="" hidden>Minutes</option>

                        {minutesOptions}
                    </select>
                    <select
                        name='shift'
                        onChange={this.onChangeHandler}
                        type="number"
                        className="HourSelector"
                    >

                        <option value="" hidden>AM or PM</option>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>

                <div className="Selector">
                    I can wait for
                    <select
                        name='waitFor'
                        onChange={this.onChangeHandler}
                        type="number"
                        className="WaitForSelectore"
                    >
                        <option value="" hidden>Choose minutes</option>
                        {waitForOptions}
                    </select> minutes to find the ride sharing partner
                </div>

                <Button cls="Success" clicked={this.onSubmitHandler} >Submit</Button>
            </div>
        );
    }
}

export default RideData;