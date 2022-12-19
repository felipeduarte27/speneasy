/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { Box, Link } from 'native-base';
import MyFormUser from '../../components/MyFormUser';
import { useToast } from 'native-base';
import MyToastBox from '../../components/MyToastBox';

interface InputProps {
  navigation: any
}

export default function RegisterUser({navigation}: InputProps){
    
    const toast = useToast();

    const myOnSubmit = (data) => {
        console.log('myOnSubmit:');
        console.log(data);                     
        toast.show({
            render: () => { return <MyToastBox description='Usuário cadasatrado !' type='sucess'/>; }
        });
    };

    return (
        <Box flex={1} flexDir='column' justifyContent='center' bg='primary.100'>
  
            <MyFormUser 
                user={{nome: '', email: '', passWord: ''}}
                buttonTitle='Cadastrar' 
                title='Cadastrar Usuário' 
                myOnSubmit={myOnSubmit}
                resetForm={true}
                loadingText='Cadastrando'
            />
           
            <Box flexDirection='row' justifyContent='left' marginTop={2} marginLeft={8}>
                <Link onPress={()=>{navigation.navigate('login');}} isUnderlined={false} _text={{
                    color: 'secondary.900',
                    fontSize: 16
                }}>
                    Login
                </Link>                                  
            </Box>               
        </Box>
    );
}