/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, Text, Icon, IconButton } from 'native-base';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface InputProps {
    navigation: any
}

export default function Header({navigation}: InputProps) {    
  
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    return (
        <Box 
            height='12%' 
            bgColor='primary.600' 
            flexDirection='row' 
            justifyContent='space-between'
            paddingX={8}
        >
            <Box marginTop={12}>
                <Text fontSize='lg' fontWeight='bold' color='primary.100' mt={1}>
                    {meses[Number(new Date().getMonth())]}
                </Text>
            </Box>
            <Box marginTop={12}> 
                <IconButton 
                    onPress={()=>navigation.navigate('dashBoard')}                                                                          
                    _pressed={{backgroundColor: 'primary.600'}}                                
                    icon={
                        <Icon color='primary.100' as={Ionicons} name='home'/>
                    }/>            
            </Box>
        </Box>
    );
}