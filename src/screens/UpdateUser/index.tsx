/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Box, useToast } from 'native-base';
import Header from '../../components/Header';
import MyFormUser from '../../components/MyFormUser';
import MyToastBox from '../../components/MyToastBox';
import Loading from '../Loading';

interface InputProps {
  navigation: any
}

interface User {
  nome: string,
  email: string,
  passWord: string
}

export default function UpdateUser ({navigation}: InputProps) {
    const [user, setUser] = useState<User>({
        nome: '',
        email: '',
        passWord: ''
    });
    const [openScreen, setOpenScreen] = useState(false);
    const toast = useToast();

    const myOnSubmit = (data) => {        
        setUser(data);  
        toast.show({
            render: () => {
                return <MyToastBox description='Dados salvos com sucesso !' type='sucess'/>;}
        });      
    };

    useEffect(()=>{
        setUser({nome: 'Felipe', email: 'felipe@gmail.com', passWord: ''}); 
        setOpenScreen(true);
    },[]);

    return (
        <>
            {openScreen ? (
                <Box flex={1} backgroundColor='primary.100'>
                    <Header navigation={navigation}/>
                    <Box marginTop={10}>
                        <MyFormUser 
                            user={user}
                            buttonTitle='Atualizar' 
                            title='Atualizar Usuário' 
                            myOnSubmit={myOnSubmit}
                            resetForm={false}
                            loadingText='Atualizando'
                        />
                    </Box>            
                </Box>
            ) : <Loading/>}            
        </>
    );
}
