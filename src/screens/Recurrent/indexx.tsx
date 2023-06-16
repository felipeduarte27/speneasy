import { Box, Text } from 'native-base';
import React from 'react';
import Header from '../../components/Header';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import MyButtonSubmit from '../../components/MyButtonSubmit';
import MyMoneyMask from '../../components/InputMasks/MyMoneyMask';
import MyInputSelect from '../../components/MyInputSelect';

const schema = yup.object({
    value: yup.string().required('Campo obrigatório !'),
    categorias: yup.string().required('Campo obrigatório !')
});

interface InputProps {
  navigation: any,
}

export default function Recurrents({navigation}: InputProps){
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
            <Box marginTop={10}>
                <Box paddingX={8}>
                    <Text alignSelf='center' color='primary.600' fontWeight='bold' fontSize='2xl'>Despesa Recorrente</Text>                
                    <Box>
                        <Box>
                            <MyMoneyMask
                                control={control}
                                errors={errors}
                                name='value'
                                mask='money'                            
                            /> 
                        </Box>
                        <Box marginTop={2}>
                            <MyInputSelect 
                                control={control}
                                name='categorias'
                                errors={errors}
                                data={[]}
                                placeholder='Escolha uma Categoria'
                            />
                        </Box>                 
                    </Box>      
                    <MyButtonSubmit
                        text='Cadastrar'
                        loadingText='Cadastrando'
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