import { Box, Text } from 'native-base';
import React from 'react';
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
    const {control, handleSubmit, reset, setValue,formState : {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => { 
        reset();
        setValue('mes', ''); 
        navigation.navigate('historicData', {month: data.mes, year: data.ano});
    };

    return(
        <Box flex={1} backgroundColor='primary.100'>
            <Header navigation={navigation}/>
            <Box marginTop={5}>
                <Box paddingX={8}>
                    <Text alignSelf='center' color='primary.600' fontWeight='bold' fontSize={16}>Escolha um Período</Text>                
                    <Box>
                        <Box>
                            <MyYearMask
                                control={control}
                                errors={errors}
                                name='ano'                               
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
                        isLoading={false}
                        handleSubmite={handleSubmit}
                        onSubmit={onSubmit}
                        marginTop={4}
                    />  
                </Box>
            </Box>
        </Box>
    );
}