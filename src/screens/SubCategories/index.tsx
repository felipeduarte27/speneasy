/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Text, useTheme } from 'native-base';
import React, { useState, useCallback, useEffect } from 'react';
import Header from '../../components/Header';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Input, FormControl, FlatList, IconButton, Icon, Select, CheckIcon } from 'native-base';
import { Controller } from 'react-hook-form';
import {Ionicons} from '@expo/vector-icons';

const subCategorias = [
    {
        id: 1,
        name: 'Aluguel'
    },
    {
        id: 2,
        name: 'Condominio'
    }
];

const categorias = [
    {
        id: 1,
        name: 'Casa'
    },
    {
        id: 2,
        name: 'Carro'
    },
    {
        id: 3,
        name: 'Cartão'
    }
];

const defaultValues = {
    id: 0,
    name: ''
};

const schema = yup.object({
    nome: yup.string().required('Campo obrigatório !'),
    idCategory: yup.string().required('Campo obrigatório')
}).required();

interface InputProps {
  navigation: any
}

interface SubCategory {
    id: number,
    name: string
}

interface Category {
    id: number,
    name: string
}

export default function SubCategories ({navigation}: InputProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [subCategory, setSubCategory] = useState<SubCategory>(defaultValues);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [openScreen, setOpenScreen] = useState(false);
    

    const {control, handleSubmit, reset, setValue, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const theme = useTheme();

    const onSubmit = (data) => {
        setIsLoading(true);        
        setIsLoading(false); 
        console.log(data);       
        
        setSubCategories([
            ...subCategories,
            {id: 3, name: data.nome}
        ]);
        
        if(subCategory.id){            
            setSubCategory(defaultValues);
        }
        
        reset();        
    };

    const loadData = async () => {
        setSubCategories(subCategorias);
        setCategories(categorias);
        setOpenScreen(true);
    };

    useEffect(()=>{
        loadData();
    }, []);

    return (
        <>
            {openScreen ? 
                (<Box flex={1} backgroundColor='primary.100'>
                    <Header navigation={navigation}/>
                    <Box>
                        <Text fontSize={16} fontWeight='bold' alignSelf='center' marginTop={4}>
                            {subCategory.name ? 'Atualizar' : 'Cadastrar'} Subcategoria
                        </Text>
                        <Box marginLeft={7} marginRight={4} marginTop={2} width='73%'>
                            <FormControl isInvalid={'idCategory' in errors}>
                                <Controller
                                    name='idCategory'
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <Select 
                                            borderColor={errors.idCategory ? 'primary.300' : 'secondary.900'}                                        
                                            selectedValue={value}                                 
                                            accessibilityLabel="Escolha uma categoria" 
                                            placeholder="Escolha uma categoria" 
                                            _selectedItem={{
                                                bg: theme.colors.primary[600],
                                                _text: {
                                                    color: theme.colors.primary[100], 
                                                    fontWeight: 'bold'
                                                },
                                                endIcon: <CheckIcon size="5" />
                                            }} 
                                            mt={1}                                             
                                            onValueChange={(itemValue: string) => {                                                
                                                onChange(itemValue);
                                            }}>
                                            {
                                                categories.map((item)=> {
                                                    return (
                                                        <Select.Item  
                                                            key={item.id} 
                                                            label={item.name} 
                                                            value={String(item.id)} 
                                                            _text={{
                                                                fontWeight: 'bold',                                                                                                     
                                                            }}
                                                        />
                                                    );})
                                            }                                                                                
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        </Box>
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
                                                placeholder='Nome da Subcategoria'                                         
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
                        <Text alignSelf='center' fontWeight='bold' fontSize={16} marginTop={4}>Lista de Subcategorias</Text>
                        <FlatList
                            marginLeft={4}
                            marginRight={4}
                            data={subCategories}
                            keyExtractor={(item) => String(item.id)}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item}) => (
                                <Box flexDirection='row' alignItems='center' justifyContent='space-between'>
                                    <Text fontWeight='bold' color='secondary.900' fontSize={16}>{item.name}</Text>
                                    <Box flexDirection='row' alignItems='center' justifyContent='center'> 
                                        <IconButton                                                      
                                            onPress={()=>{
                                                setValue('nome', item.name);
                                                setValue('idCategory', '1');
                                                setSubCategory({id: item.id, name: item.name});                                            
                                            }} 
                                            _pressed={{backgroundColor: 'primary.100'}}                                                                                                                                        
                                            icon={
                                                <Icon color='primary.600' as={Ionicons} name='create-sharp'/>
                                            }/>  
                                        <IconButton
                                            onPress={()=>console.log('delete')}
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
                </Box>) : 
                <Box>
                    <Header navigation={navigation}/>
                    <Box> Carregando </Box>
                </Box>
            }
        </>
    );
}