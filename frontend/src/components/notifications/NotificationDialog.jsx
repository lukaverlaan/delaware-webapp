import NotificationList from "./NotificationList";

export default function NotificationDialog() {
    return (
        <div
            className="
        absolute right-0 mt-3 w-80
        surface rounded-2xl shadow-lg
        overflow-hidden
        z-50
      "
        >
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold">Notificaties</h3>
            </div>

            <NotificationList />
        </div>
    );
}