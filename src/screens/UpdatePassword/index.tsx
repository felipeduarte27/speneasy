import React, {useState, useContext} from 'react';
import { Box, useToast } from 'native-base';
import Header from '../../components/Header';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'; 
import MyInput from '../../components/MyInput';
import MyButtonSubmit from '../../components/MyButtonSubmit';
import api from '../../api/axios';
import { Context } from '../../context/UserContext';
import MyToastBox from '../../components/MyToastBox';
import MyTitleScreen from '../../components/MyTitleScreen';

const schema = yup.object({
    password: yup.string().required('Campo Obrigatório !')
        .oneOf([yup.ref('passwordConfirmation'), null], 'As senhas devem ser iguais !'),
    passwordConfirmation: yup.string().required('Campo Obrigatório !')
        .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais !')
}).required();

interface InputProps {
  navigation: any
}

export default function UpdatePassword({navigation}: InputProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { user: userContext } = useContext(Context);
    const toast = useToast();

    const {control, handleSubmit, reset, formState: { errors }} = useForm({
        defaultValues: {
            password:  '',            
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => { 
        try{  
            setIsLoading(true);
            await api.put(`/users/updatePassword/${userContext.id}`, data);
            toast.show({
                render: () => {
                    return <MyToastBox description='Dados salvos com sucesso !' type='sucess'/>;}
            }); 
        }catch(error){
            toast.show({
                render: () => {
                    return <MyToastBox description='Erro ao salvar os dados !' type='error'/>;}
            });
        }finally{
            setIsLoading(false);
            reset(); 
        }
                                    
    };
    return (        
        <Box flex={1} backgroundColor='primary.100'>
            <Header navigation={navigation}/>
            <Box paddingX={8} marginTop={5}>                
                <MyTitleScreen name='Atualizar Senha'/>
                <MyInput
                    name='password' 
                    placeholder='Senha'               
                    control={control} 
                    errors={errors} 
                    inputLeftElement=''                                     
                    type='password'
                    marginTop='4'
                /> 

                <MyInput
                    name='passwordConfirmation' 
                    placeholder='Repita a Senha'               
                    control={control} 
                    errors={errors} 
                    inputLeftElement=''                                     
                    type='password'
                    marginTop='4'
                />
                
                <MyButtonSubmit
                    text='Atualizar'
                    loadingText='Atualizando'
                    isLoading={isLoading}
                    handleSubmite={handleSubmit}
                    onSubmit={onSubmit}
                    marginTop={4}
                />
            </Box>
        </Box>
    );
}