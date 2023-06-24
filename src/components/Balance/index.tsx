import React from 'react';
import { Box, Text, useTheme } from 'native-base';

interface InputProps {
    income: any,
    expense: any
}

export default function Balance ({income, expense}: InputProps){
    const theme = useTheme();
    return (
        <Box 
            borderWidth={1}
            shadow={2}
            borderColor='secondary.300'
            borderRadius={4} 
            marginLeft={14} 
            marginRight={14} 
            marginTop={3} 
            marginBottom={3}          
            backgroundColor='primary.100'
            flexDirection='row'
            justifyContent='space-between'
            padding={4}
        >
            <Box>
                <Text alignSelf='center' fontSize={18} color='secondary.900' fontWeight='bold'>Saldo</Text>
                <Box flexDirection='row' justifyContent='space-between'>
                    <Text marginRight={1} fontSize={16} color='primary.200' fontWeight='bold'>R$</Text>
                    <Text fontSize={16} color='primary.200' fontWeight='bold'>{
                        income ? income.toFixed(2).toString().replace('.', ',') : '0,00'
                    }</Text>
                </Box>
            </Box>

            <Box>
                <Text alignSelf='center' fontSize={18} color='secondary.900' fontWeight='bold'>Gastos</Text>
                <Box flexDirection='row' justifyContent='space-between'>
                    <Text marginRight={1} fontSize={16} color={theme.colors.primary[300]} fontWeight='bold'>R$</Text>
                    <Text fontSize={16} color={theme.colors.primary[300]} fontWeight='bold'>{
                        expense.toFixed(2).toString().replace('.', ',')
                    }</Text>
                </Box>
            </Box>
          
        </Box>
    );
}