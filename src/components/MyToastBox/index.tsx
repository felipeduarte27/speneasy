import React from 'react';
import { Box } from 'native-base';

interface InputProps {
  description: string,
  type: string
}
export default function MyToastBox ({description, type}: InputProps) {
    return (
        <Box
            backgroundColor={type === 'sucess' ? 'others.100' : 'others.200'}
            padding={2}
            borderRadius={3}
            _text={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'primary.100'
            }}
        >
            {description}
        </Box>
    );
}