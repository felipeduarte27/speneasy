import { Box, Text, useToast } from 'native-base';
import React, { useEffect, useState, useContext } from 'react';
import Header from '../../components/Header';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import MyButtonSubmit from '../../components/MyButtonSubmit';
import MyMoneyMask from '../../components/InputMasks/MyMoneyMask';
import MyInputSelect from '../../components/MyInputSelect';
import api from '../../api/axios';
import { Context } from '../../context/UserContext';
import MyMonthYearMask from '../../components/InputMasks/MyMonthYearMask';
import { currencyToFloat } from '../../helpers';
import MyToastBox from '../../components/MyToastBox';

const schema = yup.object({
    value: yup.string().required('Campo obrigatório !'),
    categorias: yup.string().required('Campo obrigatório !'),
    start: yup.string().test('start', 'Campo obrigatório !', val => val && val.length === 7),
    end: yup.string().test('start', 'Campo obrigatório !', val => val && val.length === 7),
});

interface InputProps {
  navigation: any,
}

export default function Recurrents({navigation}: InputProps){
    const [categories, setCategories] = useState([]);
    const [openScreen, setOpenScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user: userContext } = useContext(Context);
    const toast = useToast();
    const {control, handleSubmit, reset, setValue, formState : {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => { 
        
        try{
            
            setIsLoading(true);            
            await api.post('recurrents/create', {
                value: currencyToFloat(data.value),
                active: true,
                categoriesId: parseInt(data.categorias),
                initialMonth: parseInt(data.start.substring(0,2)),
                initialYear: parseInt(data.start.substring(3,7)),
                finalMonth: parseInt(data.end.substring(0,2)),
                finalYear: parseInt(data.end.substring(3,7)),
                userId: parseInt(userContext.id)
            });
            toast.show({
                render: () => {
                    return <MyToastBox description='Dados salvos com sucesso !' type='sucess'/>;}
            });            
        }catch(error){            
            toast.show({
                render: () => {
                    return <MyToastBox description='Erro ao salvar os dados !' type='error'/>;}
            }); 
        }finally{
            reset();
            setValue('categorias', ''); 
            setIsLoading(false);
        }
    };

    const loadData = async () => {
        const apiReturn = await api.get(`/categories/findAllActives/${userContext.id}`);
        setCategories(apiReturn.data);  
        setOpenScreen(true);
    };

    useEffect(()=> {
        loadData();
    });
    return(
        <>
            {openScreen ? 
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
                                        data={categories}
                                        placeholder='Escolha uma Categoria'
                                    />
                                </Box>   
                                <Box flexDirection='row' alignContent='spaceBetween'>
                                    <Box width='48.5%' marginRight={1}>
                                        <MyMonthYearMask
                                            control={control}
                                            errors={errors}
                                            name='start'                                        
                                        />  
                                    </Box>
                                    <Box width='48.5%' marginLeft={1}>
                                        <MyMonthYearMask
                                            control={control}
                                            errors={errors}
                                            name='end'                                        
                                        />  
                                    </Box>
                                </Box>              
                            </Box>      
                            <MyButtonSubmit
                                text='Cadastrar'
                                loadingText='Cadastrando'
                                isLoading={isLoading}
                                handleSubmite={handleSubmit}
                                onSubmit={onSubmit}
                                marginTop={4}
                            />  
                        </Box>
                    </Box>
                </Box>
                : null
            }
        </>
    );
}