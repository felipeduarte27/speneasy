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
        Promise.all([
            api.get(`/categories/findAll/${userContext.id}`), 
            api.get('/expenses/findTotalExpenseActualMonth'),
            api.get(`/incomes/find/${userContext.id}`)
        ]).then((values) => {
            setCategories(values[0].data);
            setExpense(values[1].data);
            setIncome(values[2].data.value - values[1].data);
            setOpenScreen(true);               
        }).catch((error)=>{
            console.log(error);
        });      
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
                    <Text fontSize={18} color='primary.600' fontWeight='bold' alignSelf='center'>Despesas</Text>
                    <Tree categories={categories} nivel={0} handleCategory={handleCategory}/>
                </Box>
                : null
            }
        </>
    );
}