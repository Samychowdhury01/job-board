import React from 'react';
import {ClerkProvider} from '@clerk/nextjs'
import { Metadata } from 'next';
import AdminNavbar from './jobs/[slug]/_components/admin-navbar';

export const metadata: Metadata = {
    title: "Admin",
    
}


const AdminLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <ClerkProvider>
            <AdminNavbar/>
            {children}
        </ClerkProvider>
    );
};

export default AdminLayout;