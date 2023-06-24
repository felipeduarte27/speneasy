/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box, Link } from 'native-base';

interface InputProps {
    categories: any,
    nivel: number, 
    handleCategory: any,  
}

const Tree = ({ categories, nivel = 0, handleCategory }: InputProps) => {   
    const {id, name, children, expensesValue, recurrentValue} = categories;
    
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
                                fontSize: 14, 
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
                                fontSize: 14, 
                                color: 'secondary.900'
                            }}>
                            {recurrentValue && expensesValue ? `R$ ${
                                (recurrentValue + expensesValue).toFixed(2).toString().replaceAll('.', ',')}` : 
                                recurrentValue ? `R$ ${recurrentValue.toFixed(2).toString().replaceAll('.', ',')}` :
                                    expensesValue ? `R$ ${expensesValue.toFixed(2).toString().replaceAll('.', ',')}` :
                                        !(children.length > 0) ? 'R$ 0,00' : ''
                            }

                        </Link>                       
                    </Box>
                </>
                : null}
            
            {children.map((child) => (
                <React.Fragment key={child.id}>             
                    <Tree                        
                        categories={{
                            id: child.id, 
                            name: child.name, children: 
                            child.children, 
                            expensesValue: child.expensesValue,
                            recurrentValue: child.recurrentValue
                        }} 
                        nivel={nivel+1}
                        handleCategory={handleCategory}/>                
                </React.Fragment>
            ))}
        </>
    );
};

export default Tree;