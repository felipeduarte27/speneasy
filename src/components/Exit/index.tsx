import React, { useEffect, useContext } from 'react';

import { Context } from '../../context/UserContext';

export default function Exit(){
    const { handleLogout } = useContext(Context);
    useEffect(()=>{
        handleLogout();
    },[]);
    return(<></>);
}