/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState, useContext, useCallback } from 'react';
import { Box, Image, Link, Text, useTheme } from 'native-base';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import { Context } from '../../context/UserContext';
import MyButtonSubmit from '../../components/MyButtonSubmit';
import MyInput from '../../components/MyInput';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

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

    const theme = useTheme();
    
    const {control, handleSubmit, reset, formState: { errors }} = useForm({
        defaultValues: {
            email: '',
            password: '',            
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        setIsLoading(true);
        setTimeout(()=>{
            const user = {id: '1', nome: 'Felipe', token: 'valid'};

            if(true){                        
                handleLogin(user);
                setIsLoading(false);
                reset();            
            }else{
                return null;
            } 
        },3000);               
    };

    const clear = () => {
        reset();
    };

    useFocusEffect( useCallback(()=>{return clear();},[]));

    return (
        <Box flex={1} flexDir='column' bg='primary.100'>
            
            <Box flex={1} flexDir='column' alignContent='center' justifyContent='center' padding={8}>
                {
                    /**
                        <Image 
                        alt='Login' 
                        size='lg' 
                        source={imgLogin.image}
                        alignSelf='center'
                        />
                     */
                }
                <Box flexDir='column' alignItems='center'>
                    <Box alignSelf='center' borderWidth={2} borderRadius={42} padding={2} borderColor='primary.600'>
                        <Box marginLeft={1}>
                            <Ionicons name='logo-usd' size={58} color={theme.colors.primary[600]}/>
                        </Box>                    
                    </Box>
                    <Box>
                        <Text color='primary.600' fontWeight='bold' fontSize={16}>Speneasy</Text>
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
    );
}