import { Box, Text, Link } from 'native-base';
import React, { useEffect, useState, useContext } from 'react';
import Header from '../../components/Header';
import api from '../../api/axios';
import Tree from '../../components/Tree';
import MyTitleEmptyList from '../../components/MyTitleEmptyList';
import { formatCurrencyLabel } from '../../helpers';
import { Context } from '../../context/UserContext';

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
    const { user: userContext } = useContext(Context);

    const loadData = async () => {
       
        Promise.all(
            [
                api.get(`categories/findByPeriod/${month}/${year}`, {params: {userId: userContext.id}}),
                api.get(`/expenses/findTotalExpensesByPeriod/${month}/${year}`, {params: {userId: userContext.id}}),
                api.get(`/recurrents/findTotalRecurrentsByPeriod/${month}/${year}`)
            ]
        ).then((values)=> {
                
            setCategories(values[0].data);
            setTotalExpenses(values[1].data + values[2].data);
            setOpenScreen(true);

        }).catch((error)=> console.log(error));    
       
    };

    useEffect(()=>{        
        loadData();
    },[]);

    return (
        <>
            {openScreen ? 
                <Box flex={1} backgroundColor='primary.100'> 
                    <Header navigation={navigation}/>
                    <Box flexDirection='column' alignItems='center' marginTop={5}>
                        <Box>
                            <Text fontWeight='bold' color='primary.600' fontSize={16}>Despesas Totais</Text>
                            <Text 
                                alignSelf='center'
                                fontWeight='bold' 
                                color='primary.300' 
                                fontSize={16}>R$ {formatCurrencyLabel(totalExpensese)}</Text>
                        </Box>
                        <Box marginTop={6} width='90%'>
                            
                            { totalExpensese ?
                                <Tree categories={categories} nivel={0} handleCategory={null}/>
                                : <MyTitleEmptyList text='Não há lançamentos para esse mês !'/>
                            }
                        </Box>
                        <Box flexDirection='row' justifyContent='space-between' marginTop={8}>
                            <Link onPress={()=>{navigation.navigate('historicSearchForm');}} isUnderlined={false} _text={{
                                color: 'primary.600',
                                fontSize: 16,
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