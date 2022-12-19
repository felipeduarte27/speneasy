/* eslint-disable @typescript-eslint/no-explicit-any */
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