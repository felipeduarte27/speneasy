/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Box, Text, FlatList, Link, Modal, FormControl } from 'native-base';
import MyButtonSubmit from '../MyButtonSubmit';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MyMoneyMask from '../InputMasks/MyMoneyMask';

const schema = yup.object({
    value: yup.string().required('Campo Obrigatório')
}).required();

interface Cost {
  id: number,
  nome: string
}

interface InputProps {
  categoryId: number   
}

export default function Cost ({categoryId}: InputProps){

    const [despesas, setDespesas] = useState([
        {
            id: 1,
            nome: 'Aluguel',
            id_categoria: 1,
            valor: '600,21'
        },
        {
            id: 2,
            nome: 'Condomínio',
            id_categoria: 1,
            valor: '221.23'
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [cost, setCost] = useState<Cost>({id: 0, nome: ''});

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

    const onSubmit = (data) => {
        console.log(data);
        setIsLoading(true);  
        setTimeout(()=>{
            setModalVisible(false);
            setIsLoading(false);
        }, 3000);      
        
        reset();
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
                            autoFocus={true}
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

            <FlatList
                data={despesas}
                keyExtractor={(item) => String(item.id)}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <Box padding={2} flexDirection='row' justifyContent='space-between'>  
                        <Link 
                            onPress={()=>{
                                setCost({id: item.id, nome: item.nome}); 
                                setModalVisible(true);
                            }} 
                            isUnderlined={false} 
                            _text={{
                                fontWeight: 'bold', 
                                fontSize: 16, 
                                color: 'secondary.900'
                            }}>
                            {item.nome}
                        </Link>                    
                        <Link 
                            onPress={()=>{
                                setCost({
                                    id: item.id, nome: item.nome
                                }); 
                                setModalVisible(true);
                            }} 
                            isUnderlined={false} 
                            _text={{
                                fontWeight: 'bold', 
                                fontSize: 16, 
                                color: 'secondary.900'
                            }}>R$ {item.valor}
                        </Link>
                    </Box>
                )}                
            />
        </>
    );}