import React, { useState, useContext, useCallback } from 'react';
import { Box, Link, Text, useTheme } from 'native-base';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import { Context } from '../../context/UserContext';
import MyButtonSubmit from '../../components/MyButtonSubmit';
import MyInput from '../../components/MyInput';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import MyToastBox from '../../components/MyToastBox';
import { useToast } from 'native-base';
import api from '../../api/axios';


const schema = yup.object({
    email: yup.string().email('Email inválido !').required('Campo obrigatório !'),
    password: yup.string().required('Campo obrigatório !')
}).required();

interface InputProps {
    navigation: any
}

export default function Login({navigation}: InputProps){
    const [isLoading, setIsLoading] = useState(false);
    const {handleLogin} = useContext(Context);
    const toast = useToast();
    const theme = useTheme();
    
    const {control, handleSubmit, reset, formState: { errors }} = useForm({
        defaultValues: {
            email: '',
            password: '',            
        },
        resolver: yupResolver(schema)
    });

    const clear = () => {
        reset();
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        const { email, password } = data;
        try{
            const apiReturn = await api.post('users/auth/login', {
                username: email,
                password: password
            });
            const { id, name, access_token } = apiReturn.data;
            const user = {
                id: id.toString(),
                nome: name,
                token: access_token
            };
            handleLogin(user);
            setIsLoading(false);
            reset();           
        }catch(error){
            setIsLoading(false);
            clear();
            toast.show({
                render: () => {return <MyToastBox description='Login Inválido !' type='error'/>;}
            });
        }
    };

    useFocusEffect( useCallback(()=>{return clear();},[]));

    return (
        <Box flex={1} flexDir='column' bg='primary.100'>
            
            <Box bgColor='primary.600' flex={1} flexDir='column' alignContent='center' justifyContent='center'>                
                <Box height='50%' bgColor='primary.600' padding={10}>
                    <Text bold fontSize={28} mt={40} color='primary.100'>Bem Vindo</Text>
                </Box>
                <Box borderRadius='18' bgColor='primary.100' height='50%' paddingY={4} paddingX={8}>
                    <Box flexDir='column' alignItems='center'>
                        <Box 
                            alignSelf='center' 
                            borderWidth={2} 
                            borderRadius={42} 
                            padding={2} 
                            bg={{
                                linearGradient: {
                                    colors: ['primary.400', 'primary.900'],
                                    start: [0, 0],
                                    end: [1, 0]
                                }
                            }}
                            borderColor='primary.700'>
                            <Box marginLeft={1}>
                                <Ionicons name='logo-usd' size={58} color={theme.colors.primary[100]}/>
                            </Box>                    
                        </Box>
                        <Box>
                            <Text color='primary.900' fontWeight='bold' fontSize={18}>Gasto Mensal</Text>
                        </Box>
                    </Box>
                    <MyInput
                        name='email' 
                        placeholder='Email'                   
                        control={control} 
                        errors={errors} 
                        inputLeftElement='person'                                         
                        type='text'
                        marginTop='4'
                    />

                
                    <MyInput
                        name='password' 
                        placeholder='Senha'                   
                        control={control} 
                        errors={errors} 
                        inputLeftElement=''                                            
                        type='password'
                        marginTop='4'
                    />

                    <MyButtonSubmit
                        text='Login'
                        loadingText='Logando'
                        isLoading={isLoading}
                        handleSubmite={handleSubmit}
                        onSubmit={onSubmit}
                        marginTop={4}
                    />  
                    <Box flexDirection='row' justifyContent='space-between' marginTop={2}>
                        <Link onPress={()=>{navigation.navigate('registerUser');}} isUnderlined={false} _text={{
                            color: 'secondary.900',
                            fontSize: 16
                        }}>
                    Cadastrar
                        </Link> 
                        <Link onPress={()=>navigation.navigate('forgotPassword')} isUnderlined={false} _text={{
                            color: 'secondary.900',
                            fontSize: 16
                        }}>
                    Esqueceu a Senha?
                        </Link>             
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}