import React, { useContext, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './NavBar.css'
import { SearchBox } from '../inputfields'

interface NavbarProps {
    children: JSX.Element
}
export const NavBar = ({ children }: NavbarProps) => {
    const navigate = useNavigate()
    const HOME = 'home'
    const getLink = () => {
        if (window.location.pathname.includes(HOME)) { return HOME }
        return HOME
    }
    const [activePage, setActivePage] = useState(getLink())
    const [loadingNav, setLoadingNav] = useState(false)

    const searchRef = useRef(null)

    async function searchCallBack() {
    }

    return (
        <div >

            <nav className="navbar navbar-dark bg-dark  sticky-top">
                <Link className="navbar-brand" to="/">CRUD</Link>
                <div className='nav-menu'>
                    <Link className={`nav-item ${activePage === HOME ? 'active' : ''}`} to="/" onClick={e => { }}>Home <span className="sr-only"></span></Link>
                </div>

                <div className='search-bar'>
                    <SearchBox name="search" reference={searchRef} placeholder={'Search User'} callback={searchCallBack} clear={() => { }} />
                </div>

            </nav>
            {loadingNav ? <div className="loadingLine" /> : null}

            {children}

        </div>
    )
}
