import React from 'react'
import Navbar from './component/Navbar';
import Dashboard from './component/dashboard';
import { PrismaClient } from './generated/prisma'
import { BlogsType } from '../lib/types'; // Import your BlogsType

//create a single instance of prismaclient
const prisma = new PrismaClient()

const adminpage = async () => {

    return ( 
        <div>
            <Navbar />
            <Dashboard/>
        </div>
     );
}
 
export default adminpage;