import { Box, Text, useToast, FlatList, IconButton, Icon } from 'native-base';
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
import {Ionicons} from '@expo/vector-icons';

const schema = yup.object({
    value: yup.string().required('Campo obrigatório !'),
    categorias: yup.string().required('Campo obrigatório !'),
    start: yup.string().test('start', 'Campo obrigatório !', val => val && val.length === 7),
    end: yup.string().test('start', 'Campo obrigatório !', val => val && val.length === 7),
});

interface InputProps {
  navigation: any
}

export default function Recurrents({navigation}: InputProps){
    const [categories, setCategories] = useState([]);
    const [recurrents, setRecurrents] = useState([]);
    const [openScreen, setOpenScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user: userContext } = useContext(Context);
    const toast = useToast();
    const {control, handleSubmit, reset, setValue, formState : {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const loadData = async () => {
      
        Promise.all([
            api.get(`/categories/findAllActives/${userContext.id}`),
            api.get(`/recurrents/findAllActives/${userContext.id}`)
        ]).then((values)=>{
            setCategories(values[0].data);
            setRecurrents(values[1].data);
            setOpenScreen(true);
        }).catch((error)=>{
            console.log(error);
        });  
          
    };

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
            loadData();
        }
    };

    useEffect(()=> {
        loadData();
    }, []);

    return(
        <>
            <Box flex={1} backgroundColor='primary.100'>
                <Header navigation={navigation}/>
                {openScreen ? 
                    <>
                        <Box marginTop={5}>
                            <Box paddingX={8}>
                                <Text alignSelf='center' color='primary.600' fontWeight='bold' fontSize={16}>Despesa Recorrente</Text>                
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
                        <Box borderTopWidth={1} borderColor='secondary.900' margin={4}> 
                            <Text alignSelf='center' color='primary.600' fontWeight='bold' fontSize={16} marginTop={4}>Lista de Recorrências</Text>
                            {recurrents.length > 0 ? 
                                <FlatList
                                    marginLeft={4}
                                    marginRight={4}
                                    data={recurrents}
                                    keyExtractor={(item) => String(item.id)}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({item}) => (
                                        <Box flexDirection='row' alignItems='center' justifyContent='space-between'>
                                            <Text fontWeight='bold' color='secondary.900' fontSize={14} maxWidth={50}>
                                                {item.categories.name.length > 6 ? 
                                                    item.categories.name.substring(0, 3)+'...': item.categories.name}
                                            </Text>  
                                            <Text fontWeight='bold' color='secondary.900' fontSize={14}>
                                                {
                                                    item.value.toFixed(2).toString().replace('.', ',')
                                                }
                                            </Text>  
                                            <IconButton
                                                onPress={async ()=>{
                                                    try{
                                                        await api.delete(`recurrents/delete/${item.id}`);
                                                        const apiReturn = await api.get(`/recurrents/findAllActives/${userContext.id}`); 
                                                        setRecurrents(apiReturn.data);                                               
                                                    }catch(error){
                                                        console.log(error);
                                                    }
                                                }}
                                                _pressed={{backgroundColor: 'primary.100'}}
                                                icon={
                                                    <Icon color='primary.600' as={Ionicons} name='trash'/>
                                                }
                                            />                                        
                                        </Box>
                                    )}                
                                />
                                : <Text marginTop={2}  alignSelf='center'fontWeight='bold' color='secondary.900' fontSize={16}>
                                       Não há recorrências cadastradas !
                                </Text>}                            
                        </Box>
                    </>
                    : null }
            </Box>                
        </>
    );
}