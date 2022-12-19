/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Box } from 'native-base';
import Header from '../../components/Header';
import Balance from '../../components/Balance';
import Expenses from '../../components/Expenses';

interface InputProps {
    navigation: any
}

export default function DashBoard({navigation}: InputProps){
    //const {handleLogout, user} = useContext(Context);
    
    return (
        <Box flex={1} backgroundColor='primary.100'>
            <Header navigation={navigation}/>
            <Balance/>
            <Expenses/>
        </Box>
    );
}