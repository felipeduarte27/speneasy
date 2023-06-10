/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState, useContext} from 'react';
import { Box, Text, FlatList } from 'native-base';
import Cost from '../Cost';
import { Context } from '../../context/UserContext';
import api from '../../api/axios';

interface Category {
    id: number,
    name: string,
    categoriesId: string
}

const Tree = ({ categories, nivel = 0 }: any) => {
    const {name, children, expensesValue} = categories;

    return (
        <>
            {name !== 'root' ?
                <> 
                    <Box flexDirection='row' justifyContent='space-between' marginTop={1} marginLeft={nivel === 1 ? 0 : nivel+0.5}>
                        <Text fontWeight='bold' fontSize={16} color='secondary.900'>
                            {name}
                        </Text>
                        <Text fontWeight='bold' fontSize={16} color='secondary.900'>
                            R$ {expensesValue ? expensesValue : '0,00'}
                        </Text>
                    </Box>
                </>
                : null}
            
            {children.map((child) => (
                <>
                    <Tree categories={{name: child.name, children: child.children, expensesValue: child.expensesValue}} nivel={nivel+1}/>
                </>
            ))}
        </>
    );
};

export default function Expenses (){
    const [categories, setCategories] = useState<Category[]>([]);
    const [openScreen, setOpenScreen] = useState(false);
    const { user: userContext } = useContext(Context);
    
    const loadData = async () => {
        try{            
            const apiReturn = await api.get(`/categories/findAll/${userContext.id}`);
            console.log(apiReturn.data);
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
            {openScreen ? 
                <Box paddingX={14}>
                    <Text fontSize={18} fontWeight='bold' alignSelf='center'>Desepesas</Text>
                    <Tree categories={categories} />
                </Box>
                : null
            }
        </>
    );
}