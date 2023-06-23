/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Controller } from 'react-hook-form';
import { Select, CheckIcon, useTheme, FormControl } from 'native-base';

interface InputProps {
  control: any,
  name: string,
  errors: any,
  data: any,
  placeholder: string
}

export default function MyInputSelect({ control, name, errors, data, placeholder }: InputProps) {
    const theme = useTheme();
    return (
        <>
            <FormControl isInvalid={name in errors}>
                <Controller                
                    name={name}
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <Select 
                            height={10}
                            fontSize={14}
                            borderColor={errors[`${name}`] ? 'primary.300' : 'secondary.200'}                                        
                            selectedValue={value}                                 
                            accessibilityLabel={placeholder}
                            placeholder={placeholder} 
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
                            <Select.Item label='Nenhum(a)' value='0' _text={{fontWeight: 'bold',}}/>
                            {
                                data.map((d) => (
                                    <Select.Item key={d.id} label={d.name} value={d.id} _text={{fontWeight: 'bold',}}/>
                                ))
                            }                                                                                                                      
                        </Select>
                    )}
                /> 
                <FormControl.ErrorMessage _text={{color: 'primary.300'}}>                       
                    {errors[`${name}`]?.message}
                </FormControl.ErrorMessage>    
            </FormControl>       
        </>);
}
