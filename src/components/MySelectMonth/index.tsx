import React from 'react';
import { Controller } from 'react-hook-form';
import { Select, CheckIcon, useTheme, FormControl } from 'native-base';

interface InputProps {
  control: any,
  name: string,
  errors: any
}

export default function MySelectMonth ({ control, name, errors }: InputProps) {
    const theme = useTheme();
    return (
        <>
            <FormControl isInvalid={name in errors}>
                <Controller                
                    name={name}
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <Select 
                            fontSize={14}
                            height={10}
                            borderColor={errors[`${name}`] ? 'primary.300' : 'secondary.200'}                                        
                            selectedValue={value}                                 
                            accessibilityLabel="Escolha uma mês" 
                            placeholder="Escolha um mês" 
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
                            <Select.Item label='Junho' value='6' _text={{fontWeight: 'bold',}}/>
                            <Select.Item label='Julho' value='7' _text={{fontWeight: 'bold',}}/>
                            <Select.Item label='Agosto' value='8' _text={{fontWeight: 'bold',}}/>
                            <Select.Item label='Setembro' value='9' _text={{fontWeight: 'bold',}}/>
                            <Select.Item label='Outubro' value='10' _text={{fontWeight: 'bold',}}/>
                            <Select.Item label='Novembro' value='11' _text={{fontWeight: 'bold',}}/>
                            <Select.Item label='Dezembro' value='12' _text={{fontWeight: 'bold',}}/>                                                                                                                       
                        </Select>
                    )}
                />   
                <FormControl.ErrorMessage _text={{color: 'primary.300'}}>                       
                    {errors[`${name}`]?.message}
                </FormControl.ErrorMessage>  
            </FormControl>        
        </>);
}
