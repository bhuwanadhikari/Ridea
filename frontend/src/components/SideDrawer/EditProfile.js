import React, { Component } from 'react';
import axios from 'axios';
import InputField from '../../ui/InputField/InputField';
import Button from '../../ui/Button/Button';

class EditProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            errors: {}
        }
    }

    onChangeHandler = (e) => {
        this.setState({ name: e.target.value, errors: {} });
    }

    onDoneHandler = () => {
        axios
            .post('/api/users/edit-profile', {updatedName: this.state.name}, {new: true})
            .then((result) => {
                this.props.updateName(this.state.name);
                this.props.onEditCloseHandler();
            }).catch((err) => {
                this.setState({errors: err.response.data});
            });
    }



    render() {
        return (
            <div className="EditProfileBox">

                <h3>Edit Profile Name</h3>
                <InputField
                    className="Input"
                    type="name"
                    placeholder="New Name"
                    changed={this.onChangeHandler}
                    name="name"
                    value={this.state.name}
                    errors={this.state.errors}
                />


                <Button cls="Success" clicked={this.onDoneHandler} >Done</Button>
            </div>
        );
    }
}

export default EditProfile;