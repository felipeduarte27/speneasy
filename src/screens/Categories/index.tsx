import { Box, Text } from 'native-base';
import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FlatList, IconButton, Icon } from 'native-base';
import MyInput from '../../components/MyInput';
import {Ionicons} from '@expo/vector-icons';
import api from '../../api/axios';
import { Context } from '../../context/UserContext';
import MyButtonSubmit from '../../components/MyButtonSubmit';
import MyInputSelect from '../../components/MyInputSelect';

const defaultValues = {
    id: 0,
    name: '',
    categorias: '0',
    categoriesId: '0'
};

const schema = yup.object({
    nome: yup.string().required('Campo obrigatório !'),
    categorias: yup.string().required('Campo obrigatório !')
}).required();

interface InputProps {
  navigation: any,
  route: any
}

interface Category {
    id: number,
    name: string,
    categoriesId: string
}

export default function Categories ({route, navigation}: InputProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState<Category>(defaultValues);
    const [categories, setCategories] = useState<Category[]>([]);
    const [openScreen, setOpenScreen] = useState(false);
    const { user: userContext } = useContext(Context);
    const typeNavigation = route.params.typeNavigation;
    const {control, handleSubmit, reset, setValue, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {              
        try{
            setIsLoading(true);
            if(category && category.id > 0){
                await api.put(`/categories/update/${category.id}`, {
                    name: data.nome,
                    userId: parseInt(userContext.id),
                    active: true,
                    categoriesId: parseInt(data.categorias) > 0 ? parseInt(data.categorias) : null,
                    recurrent: null
                });
            }else{
                await api.post('/categories/create', {
                    name: data.nome,
                    userId: parseInt(userContext.id),
                    active: true,
                    categoriesId: parseInt(data.categorias) > 0 ? parseInt(data.categorias) : null,
                    recurrent: null
                });
            }
            const apiReturn = await api.get(`/categories/findAllActives/${userContext.id}`);
            setCategories(apiReturn.data);     
        }catch(error){
            console.log(error);
        }finally{
            reset();
            setValue('categorias', ''); 
            setIsLoading(false);
        }
    };  

    const loadData = async () => {
        try{
            const apiReturn = await api.get(`/categories/findAllActives/${userContext.id}`);
            setCategories(apiReturn.data);
            setOpenScreen(true);
        } catch(error){
            console.log(error);
        }        
    };

    useEffect(()=>{
        loadData();
    },[]);

    return (
        <>
           
            <Box flex={1} backgroundColor='primary.100'>
                <Header navigation={navigation} maxHeight={14.5} typeNavigation={typeNavigation}/>                
                {openScreen ? (
                    <>
                        <Box paddingX={8} marginTop={5}>
                            <Text alignSelf='center' fontSize={16} fontWeight='bold' color='primary.600'>
                                {category.name ? 'Atualizar' : 'Cadastrar'} Categoria
                            </Text>                        
                            <Box>
                                <MyInput
                                    name='nome' 
                                    placeholder='Nome'               
                                    control={control} 
                                    errors={errors} 
                                    inputLeftElement=''                                             
                                    type='text'
                                    marginTop='4'
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
                            <Box>
                                <MyButtonSubmit
                                    text={category.name ? 'Atualizar' : 'Cadastrar'}
                                    loadingText={category.name ? 'Atualizando' : 'Cadastrando'}
                                    isLoading={isLoading}
                                    handleSubmite={handleSubmit}
                                    onSubmit={onSubmit}
                                    marginTop={4}
                                />  
                            </Box>
                        </Box>
                        <Box borderTopWidth={1} borderColor='secondary.900' margin={4}> 
                            <Text alignSelf='center' color='primary.600' fontWeight='bold' fontSize={16} marginTop={4}>Lista de Categorias</Text>
                            {categories.length > 0 ? 
                                <FlatList
                                    marginLeft={4}
                                    marginRight={4}
                                    data={categories}
                                    keyExtractor={(item) => String(item.id)}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({item}) => (
                                        <Box flexDirection='row' alignItems='center' justifyContent='space-between'>
                                            <Text fontWeight='bold' color='secondary.900' fontSize={14}>{item.name}</Text> 
                                            <Box flexDirection='row' alignContent='center' alignItems='center'>
                                                <IconButton                                                      
                                                    onPress={()=>{                                                                                               
                                                        setValue('nome', item.name); 
                                                        setValue('categorias', item.categoriesId ? item.categoriesId : '0'); 
                                                        setCategory({
                                                            id: item.id, 
                                                            name: item.name, 
                                                            categoriesId: item.categoriesId});
                                                    }} 
                                                    _pressed={{backgroundColor: 'primary.100'}}                                                                                                                                        
                                                    icon={
                                                        <Icon color='primary.600' as={Ionicons} name='create-sharp'/>
                                                    }/>  
                                                <IconButton
                                                    onPress={async ()=>{
                                                        try{
                                                            await api.delete(`categories/delete/${item.id}`);
                                                            const apiReturn = await api.get(`/categories/findAllActives/${userContext.id}`); 
                                                            setCategories(apiReturn.data);                                                
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
                                        </Box>
                                    )}                
                                />
                                : <Text marginTop={2}  alignSelf='center'fontWeight='bold' color='secondary.900' fontSize={16}>
                                       Não há categorias cadastradas !
                                </Text>} 
                        </Box>
                    </>
                ) : null}
            </Box>
        </>
    );
}