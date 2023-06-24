import { Box, Text, FlatList, IconButton, Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../api/axios';
import { Ionicons } from '@expo/vector-icons';
import { getMonthName } from '../../helpers';

interface InputProps {
  navigation: any,
  route: any
}

export default function Expenses({route, navigation}: InputProps){
    const [expenses, setExpenses] = useState([]);
    const [openScreen, setOpenScreen] = useState(false);
    const typeNavigation = route.params.typeNavigation;
    const loadData = async () => {
      
        try{
    
            const returnApi = await api.get(`/expenses/findByPeriod/${new Date().getMonth() + 1}/${new Date().getFullYear()}`);
            setExpenses(returnApi.data);
    
        }catch(errors){
            console.log(errors);
        }finally{setOpenScreen(true);}
      
    };

    useEffect(()=> {
        loadData();
    }, []);

    return(
        <>
            <Box flex={1} backgroundColor='primary.100'>
                <Header navigation={navigation} maxHeight={14.5} typeNavigation={typeNavigation}/>
                {openScreen ?      
                    <Box marginTop={5}> 
                        <Text alignSelf='center' color='primary.600' fontWeight='bold' fontSize={16} >
                              Despesas de {getMonthName(new Date().getMonth()+1)}
                        </Text>
                        {expenses.length > 0 ? 
                            <FlatList
                                marginTop={5}
                                marginLeft={4}
                                marginRight={4}
                                data={expenses}
                                keyExtractor={(item) => String(item.id)}
                                showsVerticalScrollIndicator={false}
                                renderItem={({item}) => (
                                    <Box flexDirection='row' alignItems='center' justifyContent='space-between'>
                                        <Text fontWeight='bold' color='secondary.900' fontSize={14} maxWidth={50}>
                                            {item.value.toFixed(2).toString().replace('.', ',')}
                                        </Text>  
                                        <Text fontWeight='bold' color='secondary.900' fontSize={14}>
                                            {
                                                item.categories.name
                                            }
                                        </Text>  
                                        <IconButton
                                            onPress={async ()=>{
                                                try{
                                                    await api.delete(`expenses/delete/${item.id}`);
                                                    loadData();                                               
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
                    : null }
            </Box>
        </>
    );
}