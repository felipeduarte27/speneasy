/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Box, Text, FlatList } from 'native-base';
import Cost from '../Cost';

const categorias = [
    {
        id: 1,
        nome: 'Casa'
    },
    {
        id: 2,
        nome: 'Carro'
    }
];

export default function Expenses (){
    return (
        <Box paddingX={14}>
            <Text fontSize={18} fontWeight='bold'>Desepesas</Text>
            <FlatList
                data={categorias}
                keyExtractor={(item) => String(item.id)}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <Box flexDirection='column' padding={2} >
                        <Text fontWeight='bold' fontSize={18}>{item.nome}</Text>
                        <Cost categoryId={item.id}/>
                    </Box>
                )}                
            />
        </Box>
    );
}