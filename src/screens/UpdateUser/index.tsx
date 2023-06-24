import React, { useState, useEffect, useContext } from 'react';
import { Box, useToast } from 'native-base';
import Header from '../../components/Header';
import MyFormUser from '../../components/MyFormUser';
import MyToastBox from '../../components/MyToastBox';
import Loading from '../Loading';
import { Context } from '../../context/UserContext';
import api from '../../api/axios';

interface InputProps {
  navigation: any,
  route: any
}

interface User {
  nome: string,
  email: string,
}

export default function UpdateUser ({route, navigation}: InputProps) {
    const [user, setUser] = useState<User>({
        nome: '',
        email: '',
    });
    const [openScreen, setOpenScreen] = useState(false);
    const toast = useToast();
    const { user: userContext } = useContext(Context);
    const typeNavigation = route.params.typeNavigation;

    const myOnSubmit = async (data) => { 
        try{                  
            setUser(data);  
            await api.put(`/users/update/${userContext.id}`, {name: data.nome, email: data.email});
            toast.show({
                render: () => {
                    return <MyToastBox description='Dados salvos com sucesso !' type='sucess'/>;}
            }); 
        }catch(error){
            console.log(error);
            toast.show({
                render: () => {
                    return <MyToastBox description='Erro ao salvar os dados !' type='error'/>;}
            }); 
        }     
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
                    <Header navigation={navigation} maxHeight={14.5} typeNavigation={typeNavigation}/>
                    <Box marginTop={5}>
                        <MyFormUser 
                            user={user}
                            buttonTitle='Atualizar' 
                            title='Atualizar Usuário' 
                            myOnSubmit={myOnSubmit}
                            resetForm={false}
                            loadingText='Atualizando'
                            type='update'
                        />
                    </Box>            
                </Box>
            ) : <Loading/>}            
        </>
    );
}
