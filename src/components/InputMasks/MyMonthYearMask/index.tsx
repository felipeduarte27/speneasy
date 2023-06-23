/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { TextInputMask } from 'react-native-masked-text';
import { Controller } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Text, useTheme } from 'native-base';

interface InputProps {
  control: any,
  name: string,
  errors: any, 
}

export default function MyMonthYearMask ({control, name, errors }: InputProps) {

    const theme = useTheme();
    const styles = StyleSheet.create({
        input: {
            width: '100%',
            height: 40,
            borderWidth: 0.3,        
            borderRadius: 4,
            padding: 10,
            backgroundColor: theme.colors.primary[100],
            marginTop: 12,
            fontSize: 14
        },
        labelError: {
            alignSelf: 'flex-start',
            color: theme.colors.primary[300],
            marginTop: 3,
            marginBottom: 8
        }
    });

    return (
        <>
            <Controller
                control={control}
                name={name}
                render={({field: {onChange, value}})=>(
                    <TextInputMask                                                                                                
                        type={'custom'}
                        value={value}
                        onChangeText={onChange}                    
                        options={{
                            mask: '99/9999'
                        }}  
                        style={[styles.input, { borderColor: !errors[`${name}`] ? theme.colors.secondary[900] : theme.colors.primary[300]}
                            , { borderWidth: !errors[`${name}`] ? 0.3 : 1}]}                              
                        placeholder='Mês/Ano'                                                            
                    />
                )}
            />  
            {errors[`${name}`] && <Text style={styles.labelError}>{errors[`${name}`]?.message}</Text>}          
        </>);
}

