import React from 'react'
import NavList from '../NavList/NavList'
import { useViewport } from '../../context/ViewportContext'
import MobileNav from '../NavList/MobileNav'
const AdminPage =() =>{
     const {width} = useViewport()
     const breakpoint = 650
     if(width > breakpoint){
     return(
         <div>
             <NavList/>
         </div>
     )}else{
        return <MobileNav/>
     }
     
}

export default () => <AdminPage/ >;
