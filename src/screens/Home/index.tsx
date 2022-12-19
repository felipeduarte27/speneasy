import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import theme from '../../theme';
import Routes from '../../routes';
import { UserContext } from '../../context/UserContext';

export default function Home() {
    
    return (      
        <NativeBaseProvider theme={theme}>
            <NavigationContainer>  
                <UserContext>
                    <Routes/>    
                </UserContext>                                
            </NavigationContainer>
        </NativeBaseProvider>      
    );
}