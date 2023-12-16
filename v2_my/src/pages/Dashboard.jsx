import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PiUserListDuotone } from 'react-icons/pi'
import useAuthCall from '../hooks/useAuthCall';
import { Navigate } from 'react-router-dom';
import { ListItem, ListItemText } from '@mui/material';
import logo from '../assets/img/logobonna.png'
import { IoIosLogOut } from "react-icons/io";


function Dashboard() {

    const { currentUser,userInfo } = useSelector((state) => state.auth)

    const { logout } = useAuthCall()
    const navi = useNavigate()
    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const pages = [
        {
            title: 'Ana Sayfa',
            url: '/myperformance/'
        },
        {
            title: 'Rapor',
            url: '/myperformance/myreport/'
        },
    ];


    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };



    return (

        <>

            <AppBar position="fixed" sx={{ backgroundColor: '#000000' }}>
                <Container maxWidth="xl">

                    <Toolbar disableGutters>

                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <img src={logo} alt="" style={{ height: '50px', marginRight: '1rem' }} />
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>

                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((item, index) => (
                                    <MenuItem key={index} onClick={() => {
                                        handleCloseNavMenu()
                                        navi(item.url)
                                    }}>
                                        <Typography textAlign="center">{item.title}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>

                        </Box>



                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((item, index) => (
                                <Button
                                    key={index}
                                    onClick={() => navi(item.url)}
                                    sx={{ my: 2, color: 'white', display: 'block',textTransform:'none' }}
                                >
                                    {item.title}
                                </Button>
                            ))}
                        </Box>



                        <Box sx={{ flexGrow: 0 }}>


                            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                                {
                                    currentUser && (<Typography variant='subtitle2' align='center' textTransform='none'>{currentUser}</Typography>)
                                }

                                <IoIosLogOut size={25} cursor='pointer' color='#C70039' onClick={()=>logout()}/>
                            </Box>

                        </Box>


                    </Toolbar>

                </Container>


            </AppBar>

            <Outlet />

        </>

    );
}
export default Dashboard;