/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { extendTheme } from 'native-base';


const theme = extendTheme({
    colors: {            
        primary: {
            100: '#ffffff',
            200: '#2ecc71',           
            300: '#c32c19',
            400: '#50989f',
            500: '#489097',
            600: '#3F888F',
            700: '#368087',
            800: '#2d787f',
            900: '#237077',
        },            
        secondary: {            
            100: '#ebebeb',
            200: '#d8d8d7',
            300: '#c5c4c3',
            400: '#b2b2af',
            500: '#a09f9d',
            600: '#8e8d8a',
            700: '#858481',
            800: '#7c7b79',
            900: '#747370',
        }
    },
    components: {
        Input: {           
            defaultProps: {
                size: 'xl',
                _focus: {
                    bg: 'primary.50',
                    borderColor: 'secondary.900'
                }
            },                                      
        },
        Button: {
            defaultProps: {
                size:'md',
                bg:'primary.600',
                _text:{
                    fontWeight: 'bold',
                    fontSize: '18'
                }
            }
        }
    },
});

export default theme;
