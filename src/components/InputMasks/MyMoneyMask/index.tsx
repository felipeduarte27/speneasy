/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { TextInputMask } from 'react-native-masked-text';
import { Controller } from 'react-hook-form';
import { Text, useTheme } from 'native-base';
import { StyleSheet } from 'react-native';

interface InputProps {
  control: any,
  name: string,
  errors: any,
  mask: any, 
}

export default function MyMoneyMask ({control, name, errors, mask }: InputProps) {

    const theme = useTheme();
    const styles = StyleSheet.create({
        input: {
            width: '100%',
            height: 50,
            borderWidth: 0.5,        
            borderRadius: 4,
            padding: 10,
            backgroundColor: theme.colors.primary[100],
            marginTop: 12
        },
        labelError: {
            alignSelf: 'flex-start',
            color: theme.colors.primary[300],
            marginTop: 3,
            marginBottom: 8
        }
    });

    return (<>
        <Controller
            control={control}
            name={name}
            render={({field: {onChange, value}})=>(
                <TextInputMask                    
                    type={mask}
                    value={value}
                    autoFocus={true}
                    onChangeText={onChange}                    
                    options={{
                        precision: 2,
                        separator: ',',
                        delimiter: '.',
                        unit: 'R$ ',
                        suffixUnit: ''
                    }}
                    style={[styles.input, { borderColor: !errors[`${name}`] ? theme.colors.secondary[900] : theme.colors.primary[300]}]}
                    placeholder='Valor'
                />
            )}
        />
        {errors[`${name}`] && <Text style={styles.labelError}>{errors[`${name}`]?.message}</Text>}
    </>);
}

