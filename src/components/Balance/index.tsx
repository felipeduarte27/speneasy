import React from 'react';
import { Box, Text } from 'native-base';
import theme from '../../theme';

export default function Balance (){
    return (
        <Box 
            borderRadius={4} 
            marginLeft={14} 
            marginRight={14} 
            marginTop={-4} 
            backgroundColor='primary.100'
            flexDirection='row'
            justifyContent='space-between'
            padding={4}
        >
            <Box>
                <Text alignSelf='center' fontSize={24} color='secondary.900' fontWeight='bold'>Saldo</Text>
                <Box flexDirection='row' justifyContent='space-between'>
                    <Text marginRight={4} fontSize={22} color='others.100' fontWeight='bold'>R$</Text>
                    <Text fontSize={22} color='others.100' fontWeight='bold'>600,24</Text>
                </Box>
            </Box>

            <Box>
                <Text alignSelf='center' fontSize={24} color='secondary.900' fontWeight='bold'>Gastos</Text>
                <Box flexDirection='row' justifyContent='space-between'>
                    <Text marginRight={4} fontSize={22} color={theme.colors.others[200]} fontWeight='bold'>R$</Text>
                    <Text fontSize={22} color={theme.colors.others[200]} fontWeight='bold'>200,24</Text>
                </Box>
            </Box>
          
        </Box>
    );
}