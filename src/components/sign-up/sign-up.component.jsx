import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {auth, createUserProfileDocumemt} from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component  {
    constructor (props) {
        super(props);

        this.state = {
            displayName: '',
            email : '', 
            password : '',
            confirmPassword : ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {displayName, email, password, confirmPassword} = this.state;

        if(password !== confirmPassword) {
            alert("password dont match");
            return;
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocumemt(user, {displayName});

            this.setState({
                displayName: '',
                email : '', 
                password : '',
                confirmPassword : ''
            });

        } catch (error) {
            console.error(error)
        }
    };

    hanleChange = event => {
        const {name, value} = event.target;

        this.setState({[name]: value});
    };

    render() {
        const {displayName, email, password, confirmPassword} = this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have a account</h2>
                <span>Sign Up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput type='text' name='displayName' value={displayName} onChange={this.hanleChange} label='Display Name' required />
                    <FormInput type='text' name='email' value={email} onChange={this.hanleChange} label='Email' required />
                    <FormInput type='password' name='password' value={password} onChange={this.hanleChange} label='Password' required />
                    <FormInput type='password' name='confirmPassword' value={confirmPassword} onChange={this.hanleChange} label='Confirm Password' required />

                    <CustomButton type="submit">SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;