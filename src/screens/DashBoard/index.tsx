import React, { useState } from 'react';
import { Box } from 'native-base';
import Header from '../../components/Header';
import Balance from '../../components/Balance';
import Expenses from '../../components/Expenses';

interface InputProps {
    navigation: any,
    route: any
}

export default function DashBoard({route, navigation}: InputProps){
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const typeNavigation = route.params.typeNavigation;

    return (
        <Box flex={1} backgroundColor='primary.100'>
            <Header navigation={navigation} maxHeight={16} typeNavigation={typeNavigation}/>
            <Balance income={income} expense={expense}/>
            <Expenses setIncome={setIncome} setExpense={setExpense}/>
        </Box>
    );
}