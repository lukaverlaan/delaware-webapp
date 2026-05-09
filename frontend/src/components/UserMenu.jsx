import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../contexts/auth';
import { User } from 'lucide-react';

export default function UserMenu() {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!user) return null;

    return (
        <div ref={menuRef} className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                    <User size={18} />
                </div>

                <div className="text-left">
                    <p className="text-sm font-medium">
                        {user.voornaam}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.rol}
                    </p>
                </div>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#11161c] border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg z-50">
                    <Link
                        to="/gebruikers/me"
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/5 transition"
                    >
                        Mijn profiel
                    </Link>

                    <Link
                        to="/logout"
                        className="block px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-white/5 transition"
                    >
                        Logout
                    </Link>
                </div>
            )}
        </div>
    );
}