import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component.jsx';
import CustomButton from '../custom-button/custom-button.component.jsx';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            email : '', 
            password : '' 
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { emailSignInStart } = this.props;
        const { email, password } = this.state;
        emailSignInStart(email, password);
    };

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name] : value});
    }

    render() {
        const { googleSignInStart }  = this.props;
        return (
            <div className = 'sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your emails and password</span>

                <form onSubmit={this.handleSubmit}>
                <label>Email</label>
                <FormInput name="email" type="email" value={this.state.email} handleChange={this.handleChange} required />

                <label>Password</label>
                <FormInput name="password" type="password" value={this.state.password} handleChange={this.handleChange} required />

                <div className='buttons'>
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton type = 'button' onClick={googleSignInStart} isGoogleSignIn>Sign In With Google</CustomButton>
                </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()), 
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
});

export default connect(null, mapDispatchToProps)(SignIn);