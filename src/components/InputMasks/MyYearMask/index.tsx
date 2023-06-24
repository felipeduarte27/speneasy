import React from 'react';
import { TextInputMask } from 'react-native-masked-text';
import { Controller } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { useTheme, FormControl } from 'native-base';

interface InputProps {
  control: any,
  name: string,
  errors: any, 
}

export default function MyYearMask ({control, name, errors }: InputProps) {

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
            fontSize: 14
        }
    });

    return (
        <>
            <FormControl isInvalid={name in errors}>
                <Controller
                    control={control}
                    name={name}
                    render={({field: {onChange, value}})=>(
                        <TextInputMask                                                                                                
                            type={'custom'}
                            value={value}
                            onChangeText={onChange}                    
                            options={{
                                mask: '9999'
                            }}  
                            style={[styles.input, { borderWidth: !errors.ano ? 0.3 : 1 ,borderColor: !errors.ano ? theme.colors.secondary[900] : theme.colors.primary[300]}]}                              
                            placeholder='Ano'                                                            
                        />
                    )}
                />   
                <FormControl.ErrorMessage _text={{color: 'primary.300'}}>                       
                    {errors[`${name}`]?.message}
                </FormControl.ErrorMessage>  
            </FormControl>       
        </>);
}

