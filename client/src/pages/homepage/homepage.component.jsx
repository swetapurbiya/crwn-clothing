import React from 'react';

import Directory from '../../components/directory/directory.component.jsx';

//import './homepage.styles.scss';   
//Replaced with homepage.styles.jsx (styled component)

import {HomePageContainer} from './homepage.styles';

const HomePage = () => (
    <HomePageContainer>
        <Directory />
    </HomePageContainer>
);

export default HomePage;