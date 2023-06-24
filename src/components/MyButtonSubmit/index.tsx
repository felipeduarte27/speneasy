import React from 'react';
import { Button } from 'native-base';

interface InputProps {
  text: string,
  loadingText: string,
  isLoading: boolean,
  handleSubmite: any,
  onSubmit: any,
  marginTop: number
}

export default function MyButtonSubmit({text, loadingText, isLoading, handleSubmite, onSubmit, marginTop}: InputProps){    
  
    return (
        <>
            <Button 
                padding={2}                           
                fontSize={16}
                isLoading={isLoading}
                isLoadingText={loadingText}
                onPress={handleSubmite(onSubmit)}
                marginTop={marginTop}
            >
                {text}
            </Button>
        </>
    );
}