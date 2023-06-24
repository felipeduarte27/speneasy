/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, Text, IconButton } from 'native-base';
import React, {useContext} from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Context } from '../../context/UserContext';

interface InputProps {
    navigation: any,
}

export default function Header({navigation}: InputProps) {    
    const { user: userContext } = useContext(Context);
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    return (
        <Box 
            height={`${14}%`} 
            bgColor='primary.600' 
            flexDirection='row' 
            justifyContent='space-between'
            paddingX={8}
        >  
            <Box 
                flexDirection='row' 
                justifyContent='center' 
                alignItems='center' 
                marginTop={10}>
                <Box marginRight={4}>
                    <IconButton size={15} onPress={()=> navigation.openDrawer()} variant="solid" _icon={{
                        as: MaterialIcons,
                        name: 'menu',
                        size: 6,                        
                    }} />
                </Box>
                <Box>
                    <Text fontSize='lg' fontWeight='bold' color='primary.100'>
                        {meses[Number(new Date().getMonth())]}
                    </Text>
                </Box>
            </Box>
            <Box marginTop={12} paddingTop={3.5}> 
                <Text fontSize='lg' fontWeight='bold' color='primary.100'>
                    {userContext.nome.split(' ')[0]}
                </Text>         
            </Box>
        </Box>
    );
}