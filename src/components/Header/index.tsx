/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, Text, Icon, IconButton } from 'native-base';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

interface InputProps {
    navigation: any,
    maxHeight: number,
    typeNavigation: string
}

export default function Header({navigation, maxHeight, typeNavigation}: InputProps) {    
  
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const navigationHome = typeNavigation === 'tab' ? 'home' : 'dashBoard';
    
    return (
        <Box 
            height={`${maxHeight}%`} 
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
                <IconButton 
                    onPress={()=>navigation.navigate(`${navigationHome}`)}                                                                          
                    _pressed={{backgroundColor: 'primary.600'}}                                
                    icon={
                        <Icon color='primary.100' as={Ionicons} name='home'/>
                    }/>            
            </Box>
        </Box>
    );
}