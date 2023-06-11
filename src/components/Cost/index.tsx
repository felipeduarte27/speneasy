import React, { useState, useContext } from 'react';
import { Box, Modal, Link } from 'native-base';
import MyMoneyMask from '../InputMasks/MyMoneyMask';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MyButtonSubmit from '../MyButtonSubmit';
import api from '../../api/axios';
import { Context } from '../../context/UserContext';

const schema = yup.object({
    value: yup.string().required('Campo Obrigatório')
}).required();

interface Cost {
    id: number,
    nome: string
  }

const Tree = ({ categories: categoriesProps, nivel = 0 }: any) => {
    const [cost, setCost] = useState<Cost>({id: 0, nome: ''});
    const [modalVisible, setModalVisible] = useState(false);
    const [categories, setCategories] = useState(null);
    const {id, name, children, expensesValue} = categories ? categories : categoriesProps;
    const [isLoading, setIsLoading] = useState(false);
    const { user: userContext } = useContext(Context);
    const {control, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: {
            value: ''
        },
        resolver: yupResolver(schema)
    });

    const clear = () => {        
        setModalVisible(false);
        setCost({id: 0, nome: ''});
        reset();
    };

    const onSubmit = async (data) => {
        try{
            setIsLoading(true); 
            const date = new Date();        
            await api.post('/expenses/create', {
                value: parseFloat(data.value.replace('R', '').replace('$', '').replace(',', '.').trim()),
                month: date.getMonth()+1,
                year: date.getFullYear(),
                userId: parseInt(userContext.id),
                categoriesId: cost.id
            });     
            const apiReturn = await api.get(`/categories/findAll/${userContext.id}`);               
            setCategories(apiReturn.data);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
            clear();            
        }
    };

    return (
        <>
            <Modal isOpen={modalVisible} onClose={()=>{clear();}}>
                <Modal.Content>
                    <Modal.CloseButton/>
                    <Modal.Header justifyContent='center' alignItems='center'>{cost.nome}</Modal.Header>
                    <Modal.Body>                            
                        <MyMoneyMask
                            control={control}
                            errors={errors}
                            name='value'
                            mask='money'                            
                        />                                                                            
                    </Modal.Body>
                    <Modal.Footer justifyContent='center'>                       
                        <MyButtonSubmit
                            text='Salvar'
                            loadingText='Salvando'
                            isLoading={isLoading}
                            handleSubmite={handleSubmit}
                            onSubmit={onSubmit}
                            marginTop={0}
                        />
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            
            {name !== 'root' ?
                <> 
                    <Box flexDirection='row' justifyContent='space-between' marginTop={1} marginLeft={nivel === 1 ? 0 : nivel+0.5}>
                        <Link 
                            onPress={()=>{
                                setCost({id: id, nome: name}); 
                                setModalVisible(true);                                
                            }} 
                            isUnderlined={false} 
                            _text={{
                                fontWeight: 'bold', 
                                fontSize: 16, 
                                color: 'secondary.900'
                            }}>
                            {name}
                        </Link> 
                        <Link 
                            onPress={()=>{
                                setCost({id: id, nome: name});  
                                setModalVisible(true);                               
                            }} 
                            isUnderlined={false} 
                            _text={{
                                fontWeight: 'bold', 
                                fontSize: 16, 
                                color: 'secondary.900'
                            }}>
                            R$ {expensesValue ? expensesValue : '0,00'}
                        </Link>                       
                    </Box>
                </>
                : null}
            
            {children.map((child) => (
                <>
                    <Tree 
                        key={child.id}
                        categories={{id: child.id, name: child.name, children: child.children, expensesValue: child.expensesValue}} 
                        nivel={nivel+1}/>
                </>
            ))}
        </>
    );
};

export default Tree;