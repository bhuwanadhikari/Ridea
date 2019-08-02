import React, { Component } from 'react';
import Button from '../../../ui/Button/Button';

import './RideData.css'


let rideData = {};
class RideData extends Component {
    constructor(props) {
        super(props)

        this.state = {
            seatsCount: 1,
            pickupTime: new Date().getTime() + 10 * 60 * 1000,
            waitFor: 20,
            errors: {}
        }
    }

    onChangeHandler = (e) => {
        if (e.target.name !== 'shift') {
            rideData[e.target.name] = parseInt(e.target.value, 10);
            return
        }
        rideData[e.target.name] = e.target.value;

    }

    onSubmitHandler = () => {
        var adder = 0;
        if (Object.keys(rideData).length < 6) {
            alert("Input all of the fields");
        } else {
            //convert all of the date to date
            if (rideData.shift === 'PM') {
                rideData.hour = rideData.hour + 12;

            }

            if (rideData.shift === 'AM' && rideData.hour === 12) {
                rideData.hour = 0;
            }
            if (rideData.day === 1) {
                adder = 1;
            }

            const pickupTime = new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate() + rideData.date,
                rideData.hour,
                rideData.minute,
                0,
                0
            );

            console.log("Pickup date is we have set is :", pickupTime);
            this.setState({
                seatsCount: rideData.seatsCount,
                pickupTime: pickupTime.getTime(),
                waitFor: rideData.waitFor
            }, () => {

                console.log("Ride data is:", rideData);
                this.props.getRideData(this.state);
            });
        }
    }

    render() {
        const thisHour = new Date().getHours();
        const thisMinute = new Date().getMinutes();
        // console.log("This is hour an dminute", thisHour, thisMinute);

        if(thisHour>12){
            //set no pm
            //set hour to 12 format
        }

        
        
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
                    </select>
                </div>

                <div className="Selector">
                    Date: <select
                        name='date'
                        onChange={this.onChangeHandler}
                        type="number"
                        className="DaySelector"
                    >
                        <option value="" hidden>Date</option>
                        <option value='0'>Today</option>
                        <option value='1'>Tomorrow</option>
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