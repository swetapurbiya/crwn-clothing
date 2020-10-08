import  { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { googleProvider, auth, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';

import { signInSuccess, signInFailure, signOutFailure, signOutSucess, signUpSucess, signUpFailure } from './user.actions'

export function* getSnapshotFromUserAuth(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({ id : userSnapshot.id, ...userSnapshot.data() }));
    } catch(error){
        yield put(signInFailure(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        //console.log(user);
        yield getSnapshotFromUserAuth(user);
    } catch(error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithEmail({ payload : {email, password }}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);

        yield getSnapshotFromUserAuth(user);

    } catch(error) {
        yield put(signInFailure(error));
    }
}

export function* isUSerAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        
        yield getSnapshotFromUserAuth(userAuth);

    } catch(error) {
        yield put(signInFailure(error));
    }
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield (put(signOutSucess()));

    } catch(error) {
        yield put(signOutFailure(error));
    }
}

export function* signUp({ payload : { email, password, displayName }}) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);

        yield put(signUpSucess({user, additionalData: { displayName } }));
    } catch(error) {
        yield put(signUpFailure(error));
    }
}

export function* signInAfterSignUp({ payload : { user, additionalData }}) {
    try {
        yield getSnapshotFromUserAuth(user, additionalData);

    } catch(error) {
        yield put(signUpFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUSerAuthenticated);
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}