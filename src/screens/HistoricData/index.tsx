/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Text, Link } from 'native-base';
import React from 'react';
import Header from '../../components/Header';
import Balance from '../../components/Balance';
import Expenses from '../../components/Expenses';

interface InputProps {
  navigation: any
}

export default function HistoricData ({navigation}: InputProps) {
    return (
        <Box flex={1} backgroundColor='primary.100'> 
            <Header navigation={navigation}/>
            <Box flexDirection='column' alignItems='center' marginTop={10}>
                <Box>
                    <Text fontWeight='bold' fontSize='2xl'>Dezembro</Text>
                </Box>
                <Box marginTop={6} width='90%'>
                    <Balance/>
                    <Expenses/>
                </Box>
                <Box flexDirection='row' justifyContent='space-between' marginTop={2}>
                    <Link onPress={()=>{navigation.navigate('historicSearchForm');}} isUnderlined={false} _text={{
                        color: 'secondary.900',
                        fontSize: 18
                    }}>
                    Voltar
                    </Link>                            
                </Box>
            </Box>
        </Box>
    );}