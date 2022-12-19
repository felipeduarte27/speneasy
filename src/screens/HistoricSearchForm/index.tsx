/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Text } from 'native-base';
import React, { useState } from 'react';
import Header from '../../components/Header';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import MyButtonSubmit from '../../components/MyButtonSubmit';
import MyYearMask from '../../components/InputMasks/MyYearMask';
import MySelectMonth from '../../components/MySelectMonth';

const schema = yup.object({
    ano: yup.string().required('Campo obrigatório !'),
    mes: yup.string().required('Campo obrigatório !')
});

interface InputProps {
  navigation: any
}

export default function HistoricSearchForm({navigation}: InputProps){
    const [isLoading, setIsLoading] = useState(false);
    const {control, handleSubmit, reset, formState : {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data);
        navigation.navigate('historicData');
    };

    return(
        <Box flex={1} backgroundColor='primary.100'>
            <Header navigation={navigation}/>
            <Box marginTop={10}>
                <Box paddingX={8}>
                    <Text alignSelf='center' fontWeight='bold' fontSize='2xl'>Escolha um Período</Text>                
                    <Box>
                        <Box>
                            <MyYearMask
                                control={control}
                                errors={errors}
                                name='ano'
                                autoFocus={true}
                            />
                        </Box>
                        <Box marginTop={2}>
                            <MySelectMonth 
                                control={control}
                                name='mes'
                                errors={errors}
                            />
                        </Box>                 
                    </Box>      
                    <MyButtonSubmit
                        text='Consultar'
                        loadingText='Consultando'
                        isLoading={isLoading}
                        handleSubmite={handleSubmit}
                        onSubmit={onSubmit}
                        marginTop={4}
                    />  
                </Box>
            </Box>
        </Box>
    );
}