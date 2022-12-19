import { Box, Text } from 'native-base';
import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
export default function CustomDrawer(props){
    return (
        <Box flex={1}>
            <DrawerContentScrollView {...props}>
                <Box borderBottomWidth={1} borderColor='secondary.900' marginX={2} marginBottom={2}>
                    <Text alignSelf='center' marginBottom={2} fontSize={18} fontWeight='bold' color='secondary.900'>Menu</Text>
                </Box>
                <Box>
                    <DrawerItemList {...props}/>                    
                </Box>                
            </DrawerContentScrollView>
            
        </Box>
    );
}