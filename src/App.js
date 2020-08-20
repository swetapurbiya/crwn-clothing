import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';

import {setCurrentUser} from './redux/user/user.actions';

import {auth, createUserProfileDocumemt} from './firebase/firebase.utils';

class App extends React.Component {

  unSubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props;


    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

       if (userAuth) {
         const userRef = await createUserProfileDocumemt(userAuth);

         userRef.onSnapshot(snapShot => {      
          setCurrentUser({
            id : snapShot.id,
            ...snapShot.data()
          });
         });
       }

       setCurrentUser({userAuth});
     });
  }

  componentWillUnmount() {
      this.unSubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component= {HomePage} />
          <Route path='/shop' component= {ShopPage} />
          <Route path='/signIn' component= {SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
