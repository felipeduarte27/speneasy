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
import { Ionicons } from '@expo/vector-icons';
import HistoricSearchForm from '../screens/HistoricSearchForm';
import HistoricData from '../screens/HistoricData';
import UpdatePassword from '../screens/UpdatePassword';
import Incomes from '../screens/Incomes';
import Recurrents from '../screens/Recurrent';
import Expenses from '../screens/Expenses';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useTheme } from 'native-base';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export const HistoricStack = function () {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='login'>      
            <Stack.Screen name='historicSearchForm' component={HistoricSearchForm}/>   
            <Stack.Screen name='historicData' component={HistoricData}/>             
        </Stack.Navigator>
    );};

export const TabNavigation = function(){
    const theme = useTheme();
    return (
        <Tab.Navigator
            screenOptions={( { route }) => ({
                headerShown: false,  
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',              
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === 'home') {
                        iconName = 'home';
                    } else if (route.name === 'categories') {
                        iconName = 'list';
                    } else if(route.name === 'expenses'){
                        iconName = 'document-text-outline';
                    } else {
                        iconName = 'reload-circle-sharp';
                    }                   
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarStyle: {
                    padding: 2,
                    backgroundColor: theme.colors.primary[100],
                    borderTopWidth: 0,
                }
            })}>
            <Tab.Screen initialParams={{typeNavigation: 'tab'}} name="home" component={DashBoard} options={{
                title: 'Inicio'
            }}/>
            <Tab.Screen initialParams={{typeNavigation: 'tab'}} name="categories" component={Categories} options={{
                title: 'Categorias'
            }}/>
            <Tab.Screen initialParams={{typeNavigation: 'tab'}} name="expenses" component={Expenses} options={{
                title: 'Despesas'
            }}/>
            <Tab.Screen initialParams={{typeNavigation: 'tab'}} name="recurrents" component={Recurrents} options={{
                title: 'Recorrência'
            }}/>
        </Tab.Navigator>
    );};

export const Authenticated = function(){
    const theme = useTheme();
    return (
        <Drawer.Navigator 
            drawerContent={props => <CustomDrawer {...props}/>}
            screenOptions={{ 
                headerShown: false, 
                drawerActiveBackgroundColor: theme.colors.primary[600],
                drawerActiveTintColor: theme.colors.primary[100],
                drawerInactiveTintColor: theme.colors.secondary[900],
                drawerStyle: {width: '100%'},
                unmountOnBlur: true,
                drawerLabelStyle: {
                    marginLeft: -15,
                    fontSize: 16
                }}}>
            <Drawer.Screen initialParams={{typeNavigation: 'drawer'}} name="dashBoard" component={TabNavigation} 
                options={{
                    title: 'Página Inicial',                    
                    drawerIcon: ({color}) => (<Ionicons name='home' size={16} color={color}/>)
                }}/> 
            <Drawer.Screen initialParams={{typeNavigation: 'drawer'}} name="updateUser" component={UpdateUser} options={{
                title: 'Dados Pessoais',                    
                drawerIcon: ({color}) => (<Ionicons name='person' size={16} color={color}/>)
            }}/>  
            <Drawer.Screen initialParams={{typeNavigation: 'drawer'}} name="updatePassword" component={UpdatePassword} options={{
                title: 'Senha',                    
                drawerIcon: ({color}) => (<Ionicons name='key-sharp' size={16} color={color}/>)
            }}/>  
            <Drawer.Screen initialParams={{typeNavigation: 'drawer'}} name="categories" component={Categories} options={{
                title: 'Categorias',                    
                drawerIcon: ({color}) => (<Ionicons name='list' size={16} color={color}/>)
            }}/>
            <Drawer.Screen initialParams={{typeNavigation: 'drawer'}} name="incomes" component={Incomes} options={{
                title: 'Receitas',                    
                drawerIcon: ({color}) => (<Ionicons name='add-circle-sharp' size={16} color={color}/>)
            }}/>
            <Drawer.Screen initialParams={{typeNavigation: 'drawer'}} name="recurrents" component={Recurrents} options={{
                title: 'Recorrência',                    
                drawerIcon: ({color}) => (<Ionicons name='reload-circle-sharp' size={16} color={color}/>)
            }}/>
            <Drawer.Screen initialParams={{typeNavigation: 'drawer'}} name="expenses" component={Expenses} options={{
                title: 'Despesas',                    
                drawerIcon: ({color}) => (<Ionicons name='document-text-outline' size={16} color={color}/>)
            }}/>
            <Drawer.Screen name="historic" component={HistoricStack} options={{
                title: 'Histórico',                    
                drawerIcon: ({color}) => (<Ionicons name='calendar-sharp' size={16} color={color}/>)
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