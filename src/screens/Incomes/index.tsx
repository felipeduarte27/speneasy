import React, { useState, useEffect, useContext } from 'react';
import { Box, useToast } from 'native-base';
import Header from '../../components/Header';
import MyToastBox from '../../components/MyToastBox';
import Loading from '../Loading';
import { Context } from '../../context/UserContext';
import api from '../../api/axios';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import MyButtonSubmit from '../../components/MyButtonSubmit';
import MyMoneyMask from '../../components/InputMasks/MyMoneyMask';
import { currencyToFloat } from '../../helpers';
import MyTitleScreen from '../../components/MyTitleScreen';

const schema = yup.object({
    value: yup.string().required('Campo Obrigatório !'),
}).required();

interface InputProps {
  navigation: any,
}

interface Income {
  id: number,
  active: boolean,
  value: number,
  userId: number
}

export default function Incomes ({navigation}: InputProps) {
    const [income, setIncome] = useState<Income>({
        id: 0, 
        active: true, 
        value: 0,
        userId: 0
    });
    const [isLoading, setIsLoading] = useState(false);
    const [openScreen, setOpenScreen] = useState(false);
    const toast = useToast();
    const { user: userContext } = useContext(Context);
    const {control, handleSubmit, reset, formState: { errors }} = useForm({        
        resolver: yupResolver(schema)
    });

    const loadData = async () => {
        try{
            const apiReturn = await api.get('/incomes/find', {params: {userId: userContext.id}});
            
            const { id, active, value, userId } = apiReturn.data;
            
            if(id){
                setIncome({
                    id: id,
                    active: active,
                    value: value, 
                    userId: userId               
                }); 
                reset({                
                    value: value,                
                });
            }
        }catch(error){
            console.log(error);
        }finally{
            setOpenScreen(true); 
        }
    };

    const onSubmit = async (data) => { 
        try{   
            setIsLoading(true);      
            if(income.id > 0){              
                await api.put(`/incomes/update/${income.id}`, {...income, value: currencyToFloat(data.value)});
            }else{                
                await api.post('/incomes/create/', {
                    value: currencyToFloat(data.value),
                    active: true,
                    userId: parseInt(userContext.id)
                });
            }
            toast.show({
                render: () => {
                    return <MyToastBox description='Dados salvos com sucesso !' type='sucess'/>;}
            }); 
        }catch(error){
            console.log(error);
            toast.show({
                render: () => {
                    return <MyToastBox description='Erro ao salvar os dados !' type='error'/>;}
            }); 
        }finally{
            loadData();
            setIsLoading(false);
        }     
    };


    useEffect(()=>{       
        loadData(); 
    },[]);

    return (
        <>
            {openScreen ? (
                <Box flex={1} backgroundColor='primary.100'>
                    <Header navigation={navigation}/>
                    <Box marginTop={5} paddingX={8}>                     
                        <MyTitleScreen name='Receita Mensal'/>
                        <MyMoneyMask
                            control={control}
                            errors={errors}
                            name='value'
                            mask='money'                            
                        /> 
                    
                        <MyButtonSubmit
                            text={income.id > 0 ? 'Atualizar' : 'Cadastrar'}
                            loadingText={income.id > 0 ? 'Atualizando' : 'Cadastrando'}
                            isLoading={isLoading}
                            handleSubmite={handleSubmit}
                            onSubmit={onSubmit}
                            marginTop={4}
                        />  
                    </Box>            
                </Box>
            ) : <Loading/>}            
        </>
    );
}
