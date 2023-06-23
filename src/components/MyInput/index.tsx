/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from 'react';
import { Input, Icon, Pressable, FormControl } from 'native-base';
import { Controller } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';

interface InputProps {
  control: any,
  name: string,
  errors: any,
  inputLeftElement: any,  
  type: string,
  placeholder: string, 
  marginTop: string
}

export default function MyInput({name, errors, control, type, inputLeftElement, placeholder, marginTop}: InputProps){
    const [show, setShow] = useState(false);
  
    const rightElement = () => {       
        if(type === 'password'){
            return (<Pressable onPress={() => setShow(!show)}>
                <Icon as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />} size={5} mr="2" color="secondary.900" />
            </Pressable>);
        }else{
            return null;
        }        
    };

    const leftElement = () => {       
        if(inputLeftElement === 'person'){
            return (<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="secondary.900" />);
        }else{
            return null;
        }        
    };

    return (
        <FormControl isInvalid={name in errors}>
            <Controller
                control={control} 
                name={name}
                render={({field: {onChange, value}})=>(
                    <Input 
                        height={10}
                        fontSize={15}
                        minW='100%'
                        backgroundColor='primary.100'                       
                        value={value}
                        onChangeText={onChange}
                        placeholder={placeholder}                                         
                        marginTop={marginTop} 
                        autoCapitalize='none'                                       
                        type={type === 'text'? 'text' : (show ? 'text' : 'password')}
                        InputLeftElement={leftElement()} 
                        InputRightElement={rightElement()}
                        _invalid={{
                            borderWidth: 1,
                            borderColor: 'primary.300'
                        }} 
                    />
                )}
            />
            <FormControl.ErrorMessage _text={{color: 'primary.300'}}>                       
                {errors[`${name}`]?.message}
            </FormControl.ErrorMessage>
        </FormControl>
    );
}