import { NavLink, Link } from 'react-router';
import logo from '../assets/logo.png';
import logoLight from '../assets/logoBlack.png';
import { useState } from 'react';
import { IoMoonSharp, IoSunny } from 'react-icons/io5';
import { useTheme } from '../contexts';
import { useAuth } from '../contexts/auth';
import UserMenu from '../components/UserMenu';
import { NotificationBell } from '../components/notifications';
import { IoNotificationsOutline } from 'react-icons/io5';

const NavItem = ({ to, children, options }) => {
    return (
        <li className="mb-1">
            <NavLink
                to={to}
                className={`text-gray-500 dark:text-gray-300 
                hover:text-(--primary) transition
                aria-[current=page]:text-(--primary)
                ${options}`}
            >
                {children}
            </NavLink>
        </li>
    );
};

const Logo = () => {
    const { darkmode } = useTheme();
    return (
        <Link to="/" className="mr-auto flex items-center">
            <img
                src={darkmode ? logo : logoLight}
                alt="Delaware logo"
                className="h-10 w-auto"
            />
        </Link>
    );
};

const ThemeToggle = () => {
    const { darkmode, toggleDarkmode } = useTheme();
    return (
        <button
            type="button"
            onClick={toggleDarkmode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
            {darkmode ? <IoMoonSharp size={20} /> : <IoSunny size={20} />}
        </button>
    );
};

const AuthButtons = () => {
    const { isAuthed } = useAuth();
    return isAuthed ? (
        <Link className="primary" to="/logout">
            Logout
        </Link>
    ) : (
        <Link className="primary" to="/login">
            Login
        </Link>
    );
};

export default function Navbar() {
    const { isAuthed } = useAuth();
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    return (
        <>
            <nav className="relative px-6 py-4 flex items-center 
    bg-white dark:bg-[#0f1419] dark:text-gray-100
    border-b border-gray-200 dark:border-gray-800">

                {/* Links */}
                <div className="flex items-center gap-6">
                    <Logo />
                    <ul className="hidden lg:flex items-center space-x-6">
                        <NavItem to="/">Dashboard</NavItem>
                    </ul>
                </div>

                {/* Midden */}
                <ul className="hidden lg:flex mx-auto items-center space-x-8">
                    <NavItem to="/gebruikers">Gebruikers</NavItem>
                    <NavItem to="/sites">Sites</NavItem>
                    <NavItem to="/taken">Taken</NavItem>
                    <NavItem to="/planning">Planning</NavItem>
                </ul>

                {/* Rechts */}
                <div className="hidden lg:flex items-center space-x-4">
                    <UserMenu />
                    {isAuthed && <NotificationBell />}
                    <ThemeToggle />
                </div>
            </nav>

            <div className={`relative z-50 ${isNavbarOpen ? 'block' : 'hidden'}`}>
                <div className="fixed inset-0 bg-black/30"></div>

                <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6
                    max-w-sm py-6 px-6 bg-white dark:bg-[#0f1419]
                    border-r border-gray-200 dark:border-gray-800">

                    <div className="flex items-center mb-8 gap-3">
                        <Logo />
                        <div className="hidden lg:flex lg:items-center lg:space-x-4">
                            <UserMenu />
                            {isAuthed && <NotificationBell />}
                            <ThemeToggle />
                        </div>

                        <button onClick={toggleNavbar}>
                            <svg className="h-6 w-6 text-gray-500 dark:text-gray-300">
                                <path stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <ul className="space-y-2">
                        <NavItem to="/">Dashboard</NavItem>
                        <NavItem to="/gebruikers" options="block p-3 font-medium">Gebruikers</NavItem>
                        <NavItem to="/sites" options="block p-3 font-medium">Sites</NavItem>
                        {/* <NavItem to="/machines" options="block p-3 font-medium">Machines</NavItem> */}
                        <NavItem to="/taken" options="block p-3 font-medium">Taken</NavItem>
                        <NavItem to="/planning" options="block p-3 font-medium">Planning</NavItem>
                    </ul>
                </nav>
            </div>
        </>
    );
}