/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from 'react';
import { Box, Text } from 'native-base';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import MyButtonSubmit from '../../components/MyButtonSubmit';
import MyInput from '../../components/MyInput';

const schema = yup.object({
    nome: yup.string().required('Campo Obrigatório'),
    email: yup.string().email('Email inválido !').required('Campo obrigatório !'),
    password: yup.string().required('Campo obrigatório !')
}).required();

interface InputProps {
  myOnSubmit: any,
  title: string,
  buttonTitle: string,
  user: object,
  resetForm: boolean,
  loadingText: string
}

interface User {
    nome: string
}

export default function MyFormUser({myOnSubmit, title, buttonTitle, user, resetForm, loadingText}: InputProps){
    const [isLoading, setIsLoading] = useState(false);

    const {control, handleSubmit, reset, formState: { errors }} = useForm({
        defaultValues: {
            nome: user['nome'],
            email: user['email'],
            password: user['passWord'],            
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {       
        myOnSubmit(data);
        setIsLoading(true);
        setTimeout(()=>{
            setIsLoading(false);
            if(resetForm)
                reset();
            return null;
        },3000);               
    };

    return (    
        <Box paddingX={8}>
            <Text alignSelf='center' fontSize='2xl' fontWeight='bold'>
                {title}
            </Text>
                
            <MyInput
                name='nome' 
                placeholder='Nome'
                autoFocus={true}
                control={control} 
                errors={errors} 
                inputLeftElement=''                                             
                type='text'
                marginTop='4'
            />

            <MyInput
                name='email' 
                placeholder='Email'
                autoFocus={false}
                control={control} 
                errors={errors} 
                inputLeftElement='person'                                            
                type='text'
                marginTop='4'
            />

                
            <MyInput
                name='password' 
                placeholder='Senha'
                autoFocus={false}
                control={control} 
                errors={errors} 
                inputLeftElement=''                                     
                type='password'
                marginTop='4'
            />

            <MyButtonSubmit
                text={buttonTitle}
                loadingText={loadingText}
                isLoading={isLoading}
                handleSubmite={handleSubmit}
                onSubmit={onSubmit}
                marginTop={4}
            />             
        </Box>
    );
}