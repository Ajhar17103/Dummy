import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import GetAllWishListData from '../../Component/WishList/GetAllWishListData';

const NavigationBar = ({ effect }) => {
    const [navbarShadow, setNavbarShadow] = useState(false);
    const [wishlistCount, setWishlistCount] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setNavbarShadow(true);
            } else {
                setNavbarShadow(false);
            }
        };

        let data = GetAllWishListData();
        if (data?.length !== 0) {
            setWishlistCount(data?.length);
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [effect]);

    return (
        <Navbar
            bg="light"
            expand="lg"
            fixed="top"
            className={`px-3 ${navbarShadow ? 'shadow-lg' : ''}`}
        >
            <Navbar.Brand as={Link} to="/">Azharul</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {/* Centering the nav items */}
                <Nav className="mx-auto" style={{ width: '100%', justifyContent: 'center' }}>
                    <Nav.Link
                        as={Link}
                        to="/"
                        active={location.pathname === '/'}
                    >
                        Home
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to="/wishlist"
                        active={location.pathname === '/wishlist'}
                    >
                        Wishlist <Badge pill bg="primary">{wishlistCount}</Badge>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;
