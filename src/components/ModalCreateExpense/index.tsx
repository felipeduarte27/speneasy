import React, {useState, useContext} from 'react';
import { Modal } from 'native-base';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MyMoneyMask from '../InputMasks/MyMoneyMask';
import MyButtonSubmit from '../MyButtonSubmit';
import { useForm } from 'react-hook-form';
import api from '../../api/axios';
import { Context } from '../../context/UserContext';
import { currencyToFloat } from '../../helpers';

const schema = yup.object({
    value: yup.string().required('Campo Obrigatório !')
}).required();

interface Category{
  id: number,
  name: string
}

interface InputProps {
  category: Category,
  openModal: boolean,
  setOpenModal: any,
  loadData: any
}

const ModalCreateExpense = ({category, openModal, setOpenModal, loadData}: InputProps) => {    
    const [isLoading, setIsLoading] = useState(false);
    const { user: userContext } = useContext(Context);
    const {control, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: {
            value: ''
        },
        resolver: yupResolver(schema)
    });
  
    const clear = () => {  
        reset();      
        setOpenModal(false);
    };
  
    const onSubmit = async (data) => {
        try{
            setIsLoading(true); 
            const date = new Date();
            await api.post('/expenses/create', {
                value: currencyToFloat(data.value),
                month: date.getMonth()+1,
                year: date.getFullYear(),
                userId: parseInt(userContext.id),
                categoriesId: category.id
            });                        
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
            clear();  
            loadData();          
        }
    };
  
    return (
        <Modal isOpen={openModal} onClose={()=>{clear();}}>
            <Modal.Content>
                <Modal.CloseButton/>
                <Modal.Header justifyContent='center' alignItems='center'>{category.name}</Modal.Header>
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
    );
};

export default ModalCreateExpense;