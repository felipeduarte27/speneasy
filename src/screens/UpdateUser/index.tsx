/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useContext } from 'react';
import { Box, useToast } from 'native-base';
import Header from '../../components/Header';
import MyFormUser from '../../components/MyFormUser';
import MyToastBox from '../../components/MyToastBox';
import Loading from '../Loading';
import { Context } from '../../context/UserContext';
import api from '../../api/axios';

interface InputProps {
  navigation: any
}

interface User {
  nome: string,
  email: string,
}

export default function UpdateUser ({navigation}: InputProps) {
    const [user, setUser] = useState<User>({
        nome: '',
        email: '',
    });
    const [openScreen, setOpenScreen] = useState(false);
    const toast = useToast();
    const { user: userContext } = useContext(Context);

    const myOnSubmit = (data) => {        
        setUser(data);  
        toast.show({
            render: () => {
                return <MyToastBox description='Dados salvos com sucesso !' type='sucess'/>;}
        });      
    };

    const loadData = async () => {
        try{            
            const apiReturn = await api.get(`/users/findById/${userContext.id}`);
            const { name, email } = apiReturn.data;
            setUser({
                nome: name,
                email: email,
            }); 
        }catch(error){
            console.log(error);
        }finally{
            setOpenScreen(true); 
        }
    };

    useEffect(()=>{       
        loadData(); 
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
