import React from 'react';
import { Text } from 'native-base';

interface InputProps {
  text: string
}

export default function MyTitleEmptyList ({text}: InputProps) {
    return (
        <Text marginTop={2} alignSelf='center'fontWeight='bold' color='secondary.900' fontSize={16}>
            {text}
        </Text>
    );
}