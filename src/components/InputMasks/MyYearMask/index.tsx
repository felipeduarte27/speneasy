/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { TextInputMask } from 'react-native-masked-text';
import { Controller } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { useTheme } from 'native-base';

interface InputProps {
  control: any,
  name: string,
  errors: any,
  autoFocus: boolean
}

export default function MyYearMask ({control, name, errors, autoFocus}: InputProps) {

    const theme = useTheme();
    const styles = StyleSheet.create({
        input: {
            width: '100%',
            height: 40,
            borderWidth: 0.5,        
            borderRadius: 4,
            padding: 10,
            backgroundColor: theme.colors.primary[100],
            marginTop: 12,
            fontSize: 16
        }
    });

    return (
        <>
            <Controller
                control={control}
                name={name}
                render={({field: {onChange, value}})=>(
                    <TextInputMask                                        
                        autoFocus={autoFocus}                                        
                        type={'custom'}
                        value={value}
                        onChangeText={onChange}                    
                        options={{
                            mask: '9999'
                        }}  
                        style={[styles.input, { borderWidth: 1 ,borderColor: !errors.ano ? theme.colors.secondary[900] : theme.colors.primary[300]}]}                              
                        placeholder='Ano'                                                            
                    />
                )}
            />            
        </>);
}

