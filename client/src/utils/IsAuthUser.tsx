import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../components/Redux/store';
import Login from '../components/Auth/Login';

const IsAuthUser: React.FC<{ children: ReactNode }> = ({ children }) => {



    const { user } = useSelector((state: RootState) => state.user)

    
    if (!user?.uid) {
        return <Login />
    }
    return children

}

export default IsAuthUser
