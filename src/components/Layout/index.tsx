import React from 'react';
import NavBar from './NavBar';
 
type Props = {
    children: React.ReactNode
};

const Layout = ({ children }: Props) => {
    return (
        <>
            <NavBar/>
            <main>{children}</main>
        </>
    )
}

export default Layout;
