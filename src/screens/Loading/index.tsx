import { Box, Text, Spinner } from 'native-base';
import React from 'react';

export default function Loading (){
    return (
        <Box 
            flex={1} 
            flexDirection='column'
            bgColor='primary.100' 
            alignItems='center'
            justifyContent='center'>            
            <Text alignSelf='center' fontWeight='bold' color='primary.600'> Carregando ... </Text>
            <Spinner marginTop={4} color='primary.600'/>
        </Box>
    );
}