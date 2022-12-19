/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react';
import { createNativeStackNavigator }  from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Context } from '../context/UserContext';
import DashBoard from '../screens/DashBoard';
import Login from '../screens/Login';
import Exit from '../components/Exit';
import RegisterUser from '../screens/RegisterUser';
import ForgotPassword from '../screens/ForgotPassword';
import CustomDrawer from '../components/CustomDrawer';
import UpdateUser from '../screens/UpdateUser';
import Categories from '../screens/Categories';
import SubCategories from '../screens/SubCategories';
import { Ionicons } from '@expo/vector-icons';
import HistoricSearchForm from '../screens/HistoricSearchForm';
import HistoricData from '../screens/HistoricData';
import theme from '../theme';

const color = theme.colors.primary[600];
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const HistoricStack = function () {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='login'>      
            <Stack.Screen name='historicSearchForm' component={HistoricSearchForm}/>   
            <Stack.Screen name='historicData' component={HistoricData}/>             
        </Stack.Navigator>
    );};

export const Authenticated = function(){
    return (
        <Drawer.Navigator 
            drawerContent={props => <CustomDrawer {...props}/>} 
            screenOptions={{ 
                headerShown: false, 
                drawerActiveBackgroundColor: theme.colors.primary[600],
                drawerActiveTintColor: theme.colors.primary[100],
                drawerInactiveTintColor: theme.colors.secondary[900],
                drawerLabelStyle: {
                    marginLeft: -15,
                    fontSize: 16
                }}}>
            <Drawer.Screen name="dashBoard" component={DashBoard} 
                options={{
                    title: 'Página Inicial',                    
                    drawerIcon: ({color}) => (<Ionicons name='home' size={16} color={color}/>)
                }}/> 
            <Drawer.Screen name="updateUser" component={UpdateUser} options={{
                title: 'Dados Pessoais',                    
                drawerIcon: ({color}) => (<Ionicons name='person' size={16} color={color}/>)
            }}/>   
            <Drawer.Screen name="categories" component={Categories} options={{
                title: 'Categorias',                    
                drawerIcon: ({color}) => (<Ionicons name='list' size={16} color={color}/>)
            }}/>   
            <Drawer.Screen name="subCategories" component={SubCategories} options={{
                title: 'Subcategorias',                    
                drawerIcon: ({color}) => (<Ionicons name='list-circle' size={16} color={color}/>)
            }}/>  
            <Drawer.Screen name="historic" component={HistoricStack} options={{
                title: 'Histórico',                    
                drawerIcon: ({color}) => (<Ionicons name='today' size={16} color={color}/>)
            }}/> 
            <Drawer.Screen
                name='exit' 
                options={{title: 'Sair',
                    drawerIcon: (({color})=> (<Ionicons name='exit' size={16} color={color}/>))}}
                component={Exit}                
            />
                        
        </Drawer.Navigator> 
    );
};

export const Unauthenticated = function(){
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='login'>      
            <Stack.Screen name='login' component={Login}/>   
            <Stack.Screen name='registerUser' component={RegisterUser}/>  
            <Stack.Screen name='forgotPassword' component={ForgotPassword}/>    
        </Stack.Navigator>            
    );
};

export default function Routes(){    
  
    const {authenticated} = useContext(Context);

    return (                
        authenticated ? <Authenticated/> : <Unauthenticated/>
    );
          
}