import React, {useState} from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component.jsx';
import CustomButton from '../custom-button/custom-button.component.jsx';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {

    const [userCredentials, setCredentials ] = useState({email : '', password : '' })

    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        
        emailSignInStart(email, password);
    };

    const handleChange = event => {
        const { value, name } = event.target;

        setCredentials({ ...userCredentials, [name] : value});
    };
    
    return (
        <div className = 'sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your emails and password</span>

            <form onSubmit={handleSubmit}>
            <label>Email</label>
            <FormInput name="email" type="email" value={email} handleChange={handleChange} required />

            <label>Password</label>
            <FormInput name="password" type="password" value={password} handleChange={handleChange} required />

            <div className='buttons'>
                <CustomButton type="submit">Sign In</CustomButton>
                <CustomButton type = 'button' onClick={googleSignInStart} isGoogleSignIn>Sign In With Google</CustomButton>
            </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()), 
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
});

export default connect(null, mapDispatchToProps)(SignIn);