/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Text } from 'native-base';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Input, FormControl, FlatList, IconButton, Icon } from 'native-base';
import { Controller } from 'react-hook-form';
import {Ionicons} from '@expo/vector-icons';

const categorias = [
    {
        id: 1,
        name: 'Casa'
    },
    {
        id: 2,
        name: 'Carro'
    }
];

const defaultValues = {
    id: 0,
    name: ''
};

const schema = yup.object({
    nome: yup.string().required('Campo obrigatório !')
}).required();

interface InputProps {
  navigation: any
}

interface Category {
    id: number,
    name: string
}

export default function Categories ({navigation}: InputProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState<Category>(defaultValues);
    const [categories, setCategories] = useState<Category[]>([]);
    const [openScreen, setOpenScreen] = useState(false);

    const {control, handleSubmit, reset, setValue, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        setIsLoading(true);        
        setIsLoading(false);        
        setCategories([
            ...categories,
            {id: 3, name: data.nome}
        ]);
        
        if(category.id){            
            setCategory(defaultValues);
        }
        reset();
    };  

    const loadData = async () => {
        setCategories(categorias);
        setOpenScreen(true);
    };

    useEffect(()=>{
        loadData();
    },[]);

    return (
        <>
            {openScreen ? 
                (<Box flex={1} backgroundColor='primary.100'>
                    <Header navigation={navigation}/>
                    <Box>
                        <Text fontSize={16} fontWeight='bold' alignSelf='center' marginTop={4}>
                            {category.name ? 'Atualizar' : 'Cadastrar'} Categoria
                        </Text>
                        <Box 
                            flexDir ='row' 
                            justifyContent='center' 
                            alignItems='center'                                                                                                                         
                            margin={4}                                                
                        >
                            <Box marginRight={1} width='80%'>
                                <FormControl isInvalid={'nome' in errors}>
                                    <Controller
                                        control={control} 
                                        name='nome'
                                        render={({field: {onChange, value}})=>(
                                            <Input 
                                                minW='100%' 
                                                backgroundColor='primary.100'                                      
                                                value={value}
                                                onChangeText={onChange}
                                                placeholder='Nome da Categoria'                                         
                                                marginTop={0} 
                                                autoCapitalize='none'                                       
                                                type='text'                                        
                                                _invalid={{
                                                    borderWidth: 1,
                                                    borderColor: 'primary.300'
                                                }} 
                                            />
                                        )}
                                    />                            
                                </FormControl>
                            </Box>
                            <Box marginLeft={1}>
                                <Button 
                                    isLoading={isLoading}
                                    isLoadingText=''
                                    onPress={handleSubmit(onSubmit)}
                                    height={10} 
                                    width={10} 
                                    borderRadius={44/2} 
                                    padding={0}>
                                    <Text alignSelf='center' fontSize={18} fontWeight='bold' color='primary.100' >+</Text>
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                    <Box borderTopWidth={1} borderColor='secondary.900' margin={4}> 
                        <Text alignSelf='center' fontWeight='bold' fontSize={16} marginTop={4}>Lista de Categorias</Text>
                        <FlatList
                            marginLeft={4}
                            marginRight={4}
                            data={categories}
                            keyExtractor={(item) => String(item.id)}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item}) => (
                                <Box flexDirection='row' alignItems='center' justifyContent='space-between'>
                                    <Text fontWeight='bold' color='secondary.900' fontSize={16}>{item.name}</Text> 
                                    <Box flexDirection='row' alignContent='center' alignItems='center'>
                                        <IconButton                                                      
                                            onPress={()=>{setValue('nome', item.name); setCategory({id: item.id, name: item.name});}} 
                                            _pressed={{backgroundColor: 'primary.100'}}                                                                                                                                        
                                            icon={
                                                <Icon color='primary.600' as={Ionicons} name='create-sharp'/>
                                            }/>  
                                        <IconButton
                                            onPress={()=>{console.log('delete');}}
                                            _pressed={{backgroundColor: 'primary.100'}}
                                            icon={
                                                <Icon color='primary.600' as={Ionicons} name='trash'/>
                                            }
                                        />                         
                                    </Box>
                                </Box>
                            )}                
                        />
                    </Box>
                </Box>) : null
            }
        </>
    );
}