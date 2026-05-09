import { useState } from "react";

export default function NotificationItem({ notif, markRead }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className="
                px-4 py-3
                hover:bg-gray-100 dark:hover:bg-white/5
                transition cursor-pointer
            "
            onClick={() => setOpen((prev) => !prev)}
        >
            <div className="flex items-start justify-between gap-3">

                <div className="flex-1">
                    <p className="text-sm font-medium">
                        {notif.type || "Notificatie"}
                    </p>

                    <p className="text-xs text-muted mt-1">
                        {notif.inhoud || "-"}
                    </p>

                    {open && (
                        <div className="mt-3 text-xs text-muted space-y-1">
                            <p><strong>ID:</strong> {notif.id}</p>
                            <p><strong>Status:</strong> {notif.status}</p>
                            <p><strong>Datum:</strong> {notif.datum}</p>
                            <p><strong>Code:</strong> {notif.code}</p>
                        </div>
                    )}
                </div>

                {notif.status !== 'GELEZEN' && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // 🔥 voorkomt open/close bij klik
                            markRead(notif.id);
                        }}
                        className="
                            text-xs px-2 py-1 rounded-md
                            bg-(--primary)/10 text-(--primary)
                            hover:bg-(--primary)/20
                            transition
                        "
                    >
                        Markeer
                    </button>
                )}
            </div>
        </div>
    );
}