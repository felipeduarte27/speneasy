/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from 'react';
import { Box, Text, Link } from 'native-base';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import MyButtonSubmit from '../../components/MyButtonSubmit';
import MyInput from '../../components/MyInput';
import { useToast } from 'native-base';
import MyToastBox from '../../components/MyToastBox';
import api from '../../api/axios';

const schema = yup.object({    
    email: yup.string().email('Email inválido !').required('Campo obrigatório !'),
}).required();

interface InputProps {
  navigation: any
}

export default function ForgotPassword({navigation}: InputProps){
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const {control, handleSubmit, reset, formState: { errors }} = useForm({
        defaultValues: {           
            email: '',                       
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try{
            setIsLoading(true);
            await api.put('/users/forgotPassword', data);
            toast.show({
                render: () => {return <MyToastBox description='Email enviado !' type='sucess'/>;}
            });
        }catch(error){
            toast.show({
                render: () => {return <MyToastBox description='Email enviado !' type='sucess'/>;}
            });
        }finally{
            setIsLoading(false);
            reset();
        }              
    };

    return (
        <Box flex={1} flexDir='column' bg='primary.100'>
            
            <Box flex={1} flexDir='column' alignContent='center' justifyContent='center' padding={8}>
                <Text alignSelf='center' fontSize={16} fontWeight='bold' color='primary.600'>
                  Recuperar Senha
                </Text>

                <MyInput
                    name='email' 
                    placeholder='Email'                   
                    control={control} 
                    errors={errors} 
                    inputLeftElement='person'                                            
                    type='text'
                    marginTop='4'
                />              

                <MyButtonSubmit
                    text='Enviar'
                    loadingText='Enviando'
                    isLoading={isLoading}
                    handleSubmite={handleSubmit}
                    onSubmit={onSubmit}
                    marginTop={4}
                /> 

                <Box flexDirection='row' justifyContent='left' marginTop={2}>
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