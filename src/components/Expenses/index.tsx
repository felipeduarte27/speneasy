/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState, useContext} from 'react';
import { Box, Text } from 'native-base';
import { Context } from '../../context/UserContext';
import Tree from '../Tree';
import api from '../../api/axios';
import ModalCreateExpense from '../ModalCreateExpense';

interface Category {
    id: number,
    name: string,
    categoriesId: string
}

interface InputProps{
    setIncome: any,
    setExpense: any
}

export default function Expenses ({setIncome, setExpense}: InputProps){
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState({id: 0, name: ''});
    const [openScreen, setOpenScreen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const { user: userContext } = useContext(Context);
    
    const loadData = async () => {
        try{                    
            const apiReturn = await api.get(`/categories/findAll/${userContext.id}`);            
            setCategories(apiReturn.data); 
            setIncome(6500);
            
            const apiReturn2 = await api.get('/expenses/findTotalExpenseActualMonth');  
                            
            setExpense(apiReturn2.data);
            setOpenScreen(true);
            
        } catch(error){
            console.log(error);
        }        
    };

    const handleCategory = async (id, name: any) => { 
        setCategory({id: id, name: name});       
        setOpenModal(true);              
    };

    useEffect(()=>{        
        loadData();
    },[]);

    return (
        <>
            {openScreen ? 
                <Box paddingX={14}>
                    <ModalCreateExpense category={category} openModal={openModal} setOpenModal={setOpenModal} loadData={loadData}/>
                    <Text fontSize={18} fontWeight='bold' alignSelf='center'>Desepesas</Text>
                    <Tree categories={categories} nivel={0} handleCategory={handleCategory}/>
                </Box>
                : null
            }
        </>
    );
}