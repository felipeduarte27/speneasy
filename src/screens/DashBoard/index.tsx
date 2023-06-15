import React, { useState } from 'react';
import { Box } from 'native-base';
import Header from '../../components/Header';
import Balance from '../../components/Balance';
import Expenses from '../../components/Expenses';

interface InputProps {
    navigation: any
}

export default function DashBoard({navigation}: InputProps){
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    
    return (
        <Box flex={1} backgroundColor='primary.100'>
            <Header navigation={navigation}/>
            <Balance income={income} expense={expense}/>
            <Expenses setIncome={setIncome} setExpense={setExpense}/>
        </Box>
    );
}