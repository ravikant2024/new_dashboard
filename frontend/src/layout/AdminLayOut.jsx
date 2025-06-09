import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import AdminNavbar from '../adminpanel/AdminNavbar';
import AdminSidebar from '../adminpanel/AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayOut = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        })
    }, [])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box >
                <AdminNavbar />
            </Box>

            {/* Main Content */}
            <Box sx={{ display: 'flex', flex: 1, marginTop: '34px', height: '100%' }}>
                <Box sx={{ width: '200px' }}>
                    <AdminSidebar />
                </Box>
                <Box sx={{
                    flex: 1,
                    padding: 2,
                    marginLeft: 0,
                    height: 'auto',
                    width: 'calc(100% - 270px)',

                }}>
                    <Outlet />
                    
                </Box>
            </Box>
        </Box>

    );
};

export default AdminLayOut;
