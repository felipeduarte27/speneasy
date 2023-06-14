/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box, Link } from 'native-base';

interface InputProps {
    categories: any,
    nivel: number, 
    handleCategory: any   
}

const Tree = ({ categories, nivel = 0, handleCategory }: InputProps) => {   
    const {id, name, children, expensesValue} = categories;

    return (
        <>
            {name !== 'root' ?
                <> 
                    <Box flexDirection='row' justifyContent='space-between' marginTop={1} marginLeft={nivel === 1 ? 0 : nivel+0.5}>
                        <Link 
                            onPress={()=>{  
                                handleCategory(id, name);                                  
                            }} 
                            isUnderlined={false} 
                            _text={{
                                fontWeight: 'bold', 
                                fontSize: 16, 
                                color: 'secondary.900'
                            }}>
                            {name}
                        </Link> 
                        <Link 
                            onPress={()=>{
                                handleCategory(id, name);                              
                            }} 
                            isUnderlined={false} 
                            _text={{
                                fontWeight: 'bold', 
                                fontSize: 16, 
                                color: 'secondary.900'
                            }}>
                            {expensesValue ? `R$ ${expensesValue.toFixed(2).toString().replaceAll('.', ',')}` : 
                                !(children.length > 0) ? 'R$ 0,00' : ''
                            }
                        </Link>                       
                    </Box>
                </>
                : null}
            
            {children.map((child) => (
                <>
                    <Tree 
                        key={child.id}
                        categories={{id: child.id, name: child.name, children: child.children, expensesValue: child.expensesValue}} 
                        nivel={nivel+1}
                        handleCategory={handleCategory}/>
                </>
            ))}
        </>
    );
};

export default Tree;