/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState, useContext} from 'react';
import { Box, Text } from 'native-base';
import { Context } from '../../context/UserContext';
import Tree from '../Cost';
import api from '../../api/axios';

interface Category {
    id: number,
    name: string,
    categoriesId: string
}

export default function Expenses (){
    const [categories, setCategories] = useState<Category[]>([]);
    const [openScreen, setOpenScreen] = useState(false);
    const { user: userContext } = useContext(Context);
    
    const loadData = async () => {
        try{            
            const apiReturn = await api.get(`/categories/findAll/${userContext.id}`);            
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