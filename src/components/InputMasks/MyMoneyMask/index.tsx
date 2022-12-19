/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { TextInputMask } from 'react-native-masked-text';
import { Controller } from 'react-hook-form';
import { Text } from 'native-base';
import { StyleSheet } from 'react-native';
import theme from '../../../theme';

interface InputProps {
  control: any,
  name: string,
  errors: any,
  mask: any,
  autoFocus: boolean
}

export default function MyMoneyMask ({control, name, errors, mask, autoFocus}: InputProps) {
    return (<>
        <Controller
            control={control}
            name={name}
            render={({field: {onChange, value}})=>(
                <TextInputMask
                    autoFocus={autoFocus}
                    type={mask}
                    value={value}
                    onChangeText={onChange}                    
                    options={{
                        precision: 2,
                        separator: ',',
                        delimiter: '.',
                        unit: 'R$ ',
                        suffixUnit: ''
                    }}
                    style={[styles.input, { borderColor: !errors[`${name}`] ? theme.colors.secondary[900] : theme.colors.others[200]}]}
                    placeholder='Valor'
                />
            )}
        />
        {errors[`${name}`] && <Text style={styles.labelError}>{errors[`${name}`]?.message}</Text>}
    </>);
}

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
        color: theme.colors.others[200],
        marginTop: 3,
        marginBottom: 8
    }
});