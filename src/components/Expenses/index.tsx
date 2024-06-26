import React, {useEffect, useState, useContext} from 'react';
import { Box, Text } from 'native-base';
import { Context } from '../../context/UserContext';
import Tree from '../Tree';
import api from '../../api/axios';
import ModalCreateExpense from '../ModalCreateExpense';
import Loading from '../../screens/Loading';
import MyTitleEmptyList from '../MyTitleEmptyList';

interface Category {
    id: number,
    name: string,
    categoriesId: string,
    children: any
}

interface InputProps{
    setIncome: any,
    setExpense: any
}

export default function Expenses ({setIncome, setExpense}: InputProps){
    const [categories, setCategories] = useState<Category>({id: 0, name: '', categoriesId: '', children: []});
    const [category, setCategory] = useState({id: 0, name: ''});
    const [openScreen, setOpenScreen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const { user: userContext } = useContext(Context);
    
    const loadData = async () => {  
        Promise.all([
            api.get('/categories/findAll', {params: {userId: userContext.id}}), 
            api.get('/expenses/findTotalExpenseActualMonth', {params: {userId: userContext.id}}),
            api.get('/incomes/find', {params: {userId: userContext.id}}),
            api.get('/recurrents/findTotalRecurrentsActualMonth', {params: {userId: userContext.id}})
        ]).then((values) => {
            setCategories(values[0].data);
            setExpense(values[1].data + values[3].data);
            setIncome(values[2].data.value - (values[1].data + values[3].data));
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
                    <Text fontSize={16} color='primary.600' fontWeight='bold' alignSelf='center'>Despesas</Text>
                    {categories.children.length > 0 ? 
                        <Tree categories={categories} nivel={0} handleCategory={handleCategory}/>
                        : <MyTitleEmptyList text='Não há categorias ativas !'/>} 
                </Box>
                : <Loading/>
            }
        </>
    );
}