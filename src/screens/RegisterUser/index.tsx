import React from 'react';
import { Box, Link, Text } from 'native-base';
import MyFormUser from '../../components/MyFormUser';
import { useToast } from 'native-base';
import MyToastBox from '../../components/MyToastBox';
import api from '../../api/axios';

interface InputProps {
  navigation: any
}

export default function RegisterUser({navigation}: InputProps){
    
    const toast = useToast();

    const myOnSubmit = async (data) => {
        try{
            await api.post('/users/create', {name: data.nome, ...data});
            toast.show({
                render: () => { return <MyToastBox description='Usuário cadasatrado !' type='sucess'/>; }
            });
        }catch(error){
            console.log(error);
            toast.show({
                render: () => { return <MyToastBox description='Erro ao salvar os dados !' type='error'/>; }
            });
        }
    };
    
    return (
        <Box bgColor='primary.600' flex={1} flexDir='column' alignContent='center' justifyContent='center'>                
            <Box height='50%' bgColor='primary.600' padding={10}>
                <Text bold fontSize={28} mt={40} color='primary.100'>Bem Vindo</Text>
            </Box>
            <Box paddingTop={4} borderRadius='18' flex={1} flexDir='column' bg='primary.100'>
  
                <MyFormUser 
                    user={{nome: '', email: '', passWord: ''}}
                    buttonTitle='Cadastrar' 
                    title='Cadastrar Usuário' 
                    myOnSubmit={myOnSubmit}
                    resetForm={true}
                    loadingText='Cadastrando'
                    type='create'
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

        </Box>

    );
}