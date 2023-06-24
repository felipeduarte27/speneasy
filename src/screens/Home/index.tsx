/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import theme from '../../theme';
import Routes from '../../routes';
import { UserContext } from '../../context/UserContext';

const LinearGradient = require('expo-linear-gradient').LinearGradient;

const config = {
    dependencies: {
        'linear-gradient': LinearGradient
    }
};

export default function Home() {
    
    return (      
        <NativeBaseProvider theme={theme} config={config}>
            <NavigationContainer>  
                <UserContext>
                    <Routes/>    
                </UserContext>                                
            </NavigationContainer>
        </NativeBaseProvider>      
    );
}