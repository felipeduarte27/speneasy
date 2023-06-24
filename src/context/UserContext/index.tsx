import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../screens/Loading';

const Context = createContext(
    {
        user: {id: '0', nome: ''},         
        authenticated: false,         
        handleLogin: null, 
        handleLogout: null,
        isUserValid: null
    });

interface InputProps {
  children: any
}

interface User {
    id: string,
    nome: string,
}

function UserContext({children}: InputProps){
    const [user, setUser] = useState<User>();
    const [authenticated, setAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    const _storeData = async (firstPair, secondPair, thirdPair) => {
        await AsyncStorage.multiSet([firstPair, secondPair, thirdPair]);        
    };

    const _clearData = async (keys) => {
        await AsyncStorage.multiRemove(keys);
    };

    const _getData = async (keys) => {
        const stores = await AsyncStorage.multiGet(keys);
        const temp = stores.map(([key, value]) => ({[key]: value}));
        const data = {
            id: temp[0] ? temp[0].id : null,
            nome: temp[1] ? temp[1].nome : null,
            token: temp[2] ? temp[2].token : null
        };

        return data;
    };

    const handleLogin = (user) =>{
    
        _storeData(['id', user.id], ['nome', user.nome], ['token', user.token]);
        setUser({id: user.id, nome: user.nome});
        setAuthenticated(true);        
    };

    const handleLogout = () => {
        setUser(undefined);
        setAuthenticated(false);
        const keys = ['id', 'nome', 'token'];
        _clearData(keys);
    };

    const isUserValid = async () => {
        
        const data = await _getData(['id', 'nome', 'token']);        
        
        if((data.id && data.nome && data.token) && data.token === 'valid'){
            return true;         
        }
        return false;        
    };

    const handleSession = async () => {
        if(await isUserValid()){
            if(!user){
                const data = await _getData(['id', 'nome']);                 
                setUser({id: data.id, nome: data.nome});
            }            
            setAuthenticated(true);
            setIsLoading(false);                            
        }else{
            handleLogout();  
            setIsLoading(false);           
        }              
    };

    useEffect(()=>{             
        setTimeout(()=> {handleSession();}, 3000);
    }, []);

    if(isLoading){
        return <Loading/>;
    }
    return (
        <Context.Provider value={{user, authenticated, handleLogin, handleLogout, isUserValid}}>
            {children}
        </Context.Provider>
    );
}

export {Context, UserContext};