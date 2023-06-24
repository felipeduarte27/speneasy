import React from 'react';
import { Button, Box } from 'native-base';

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
        <Box
            bg={{
                linearGradient: {
                    colors: ['primary.400', 'primary.900'],
                    start: [0, 0],
                    end: [1, 0]
                }
            }}
            marginTop={marginTop}
            borderRadius={2}
        >
            <Button 
                variant='unstyled'                
                isLoading={isLoading}
                isLoadingText={loadingText}
                onPress={handleSubmite(onSubmit)}                
            >
                {text}
            </Button>
        </Box>
    );
}