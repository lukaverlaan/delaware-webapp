import { useState, useRef, useEffect } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { useLocation } from "react-router";
import NotificationDialog from "./NotificationDialog";
import useSWR from "swr";
import { getAll } from "../../api";

export default function NotificationBell() {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef();
    const location = useLocation();
    const { data: notificaties = [] } = useSWR('/notificaties', getAll);
    const unreadCount = notificaties.filter(
        (n) => n.status !== 'GELEZEN'
    ).length;

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition relative"
            >
                <IoNotificationsOutline size={20} />

                {unreadCount > 0 && (
                    <span className="
        absolute -top-1 -right-1 
        bg-(--primary) text-white text-[10px]
        w-5 h-5 flex items-center justify-center
        rounded-full
    ">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="animate-in fade-in zoom-in-95">
                    <NotificationDialog />
                </div>
            )}
        </div>
    );
}