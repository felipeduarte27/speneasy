import React from 'react';
import { Text } from 'native-base';

interface InputProps {
  name: string
}

export default function MyTitleScreen ({name}: InputProps) {
    return (
        <Text alignSelf='center' color='primary.600' fontWeight='bold' fontSize={16}>{name}</Text>
    );
}