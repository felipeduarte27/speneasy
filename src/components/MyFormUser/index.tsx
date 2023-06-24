/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState, useLayoutEffect, useCallback } from 'react';
import { Box, Text } from 'native-base';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import MyButtonSubmit from '../../components/MyButtonSubmit';
import MyInput from '../../components/MyInput';

const createSchema = yup.object({
    nome: yup.string().required('Campo Obrigatório !'),
    email: yup.string().email('Email inválido !').required('Campo obrigatório !'),
    password: yup.string().required('Campo obrigatório !')
}).required();

const updateSchema = yup.object({
    nome: yup.string().required('Campo Obrigatório !'),
    email: yup.string().email('Email inválido !').required('Campo obrigatório !')
}).required();

interface InputProps {
  myOnSubmit: any,
  title: string,
  buttonTitle: string,
  user: object,
  resetForm: boolean,
  loadingText: string,
  type: string
}

interface User {
    nome: string
}

export default function MyFormUser({myOnSubmit, title, buttonTitle, user, resetForm, loadingText, type}: InputProps){
    const [isLoading, setIsLoading] = useState(false);

    const {control, handleSubmit, reset, formState: { errors }} = useForm({
        defaultValues: {
            nome: user['nome'],
            email: user['email'],
            password: user['passWord'] ? user['passWord'] : '',            
        },
        resolver: yupResolver(type === 'create' ? createSchema : updateSchema)
    });

    const onSubmit = (data) => { 
        setIsLoading(true);
        myOnSubmit(data);
        setIsLoading(false);
        if(resetForm)
            reset();                             
    };

    return (    
        <Box paddingX={8}>
            <Text alignSelf='center' fontSize={16} fontWeight='bold' color='primary.600'>
                {title}
            </Text>
                
            <MyInput
                name='nome' 
                placeholder='Nome'               
                control={control} 
                errors={errors} 
                inputLeftElement=''                                             
                type='text'
                marginTop='4'
            />

            <MyInput
                name='email' 
                placeholder='Email'               
                control={control} 
                errors={errors} 
                inputLeftElement='person'                                            
                type='text'
                marginTop='4'
            />

            {type === 'create' ? 
                <MyInput
                    name='password' 
                    placeholder='Senha'               
                    control={control} 
                    errors={errors} 
                    inputLeftElement=''                                     
                    type='password'
                    marginTop='4'
                /> : null}
            

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