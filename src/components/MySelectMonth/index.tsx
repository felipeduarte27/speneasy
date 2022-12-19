/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Controller } from 'react-hook-form';
import theme from '../../theme';
import { Select, CheckIcon } from 'native-base';

interface InputProps {
  control: any,
  name: string,
  errors: any
}

export default function MySelectMonth ({ control, name, errors }: InputProps) {
    return (
        <>
            <Controller                
                name={name}
                control={control}
                render={({field: {onChange, value}}) => (
                    <Select 
                        borderColor={errors[`${name}`] ? 'others.200' : 'secondary.900'}                                        
                        selectedValue={value}                                 
                        accessibilityLabel="Escolha uma categoria" 
                        placeholder="Escolha uma categoria" 
                        _selectedItem={{
                            bg: theme.colors.primary[600],
                            _text: {
                                color: theme.colors.primary[100], 
                                fontWeight: 'bold'
                            },
                            endIcon: <CheckIcon size="5" />
                        }} 
                        mt={1}                                             
                        onValueChange={(itemValue: string) => {                                    
                            onChange(itemValue);
                        }}>
                                        
                        <Select.Item label='Janeiro' value='1' _text={{fontWeight: 'bold',}}/>
                        <Select.Item label='Fevereiro' value='2' _text={{fontWeight: 'bold',}}/>
                        <Select.Item label='Março' value='3' _text={{fontWeight: 'bold',}}/>
                        <Select.Item label='Abril' value='4' _text={{fontWeight: 'bold',}}/>
                        <Select.Item label='Maio' value='5' _text={{fontWeight: 'bold',}}/>
                        <Select.Item label='Junho' value='' _text={{fontWeight: 'bold',}}/>
                        <Select.Item label='Julho' value='7' _text={{fontWeight: 'bold',}}/>
                        <Select.Item label='Agosto' value='8' _text={{fontWeight: 'bold',}}/>
                        <Select.Item label='Setembro' value='9' _text={{fontWeight: 'bold',}}/>
                        <Select.Item label='Outubro' value='10' _text={{fontWeight: 'bold',}}/>
                        <Select.Item label='Novembro' value='11' _text={{fontWeight: 'bold',}}/>
                        <Select.Item label='Dezembro' value='12' _text={{fontWeight: 'bold',}}/>                                                                                                                       
                    </Select>
                )}
            />            
        </>);
}
