/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Text, Link } from 'native-base';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../api/axios';
import Tree from '../../components/Tree';

interface Category {
    id: number,
    name: string,
    categoriesId: string
}

interface InputProps {
  navigation: any,
  route: any
}

export default function HistoricData ({navigation, route}: InputProps) {
    const [openScreen, setOpenScreen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [totalExpensese, setTotalExpenses] = useState(0);
    const { month, year } = route.params;

    const loadData = async () => {
        try{

            const returnApi = await api.get(`categories/findByPeriod/${month}/${year}`);
            setCategories(returnApi.data);
            const returnApi2 = await api.get(`/expenses/findTotalExpensesByPeriod/${month}/${year}`);
            setTotalExpenses(returnApi2.data);
           
        }catch(error){
            console.log(error);
        }finally{
            setOpenScreen(true);
        }
    };

    useEffect(()=>{        
        loadData();
    },[]);

    return (
        <>
            {openScreen ? 
                <Box flex={1} backgroundColor='primary.100'> 
                    <Header navigation={navigation}/>
                    <Box flexDirection='column' alignItems='center' marginTop={10}>
                        <Box>
                            <Text fontWeight='bold' color='primary.600' fontSize='2xl'>Despesas Totais</Text>
                            <Text 
                                alignSelf='center'
                                fontWeight='bold' 
                                color='primary.300' 
                                fontSize='2xl'>R$ {totalExpensese.toFixed(2).toString().replace('.', ',')}</Text>
                        </Box>
                        <Box marginTop={6} width='90%'>
                            
                            { totalExpensese ?
                                <Tree categories={categories} nivel={0} handleCategory={null}/>
                                : 
                                <Text alignSelf='center' color='secondary.900' fontSize='16'>
                                    Não há lançamentos para esse mês !
                                </Text>
                            }
                        </Box>
                        <Box flexDirection='row' justifyContent='space-between' marginTop={8}>
                            <Link onPress={()=>{navigation.navigate('historicSearchForm');}} isUnderlined={false} _text={{
                                color: 'primary.600',
                                fontSize: 18,
                                fontWeight: 'bold'
                            }}>
                                Voltar
                            </Link>                            
                        </Box>
                    </Box>
                </Box>
                : null
            }
        </>
    );}