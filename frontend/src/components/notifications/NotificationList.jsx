import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import AsyncData from "../AsyncData";
import { getAll, markNotifAsRead } from "../../api";
import NotificationItem from "./NotificationItem";

export default function NotificationList() {
    const {
        data: notificaties = [],
        isLoading,
        error,
    } = useSWR('/notificaties', getAll);

    const {
        trigger: markNotifRead,
        error: markError,
    } = useSWRMutation("/notificaties", markNotifAsRead);

    const filtered = notificaties
        .filter((n) => n.status?.toLowerCase() !== 'gelezen')
        .slice(0, 5);

    return (
        <AsyncData loading={isLoading} error={error || markError}>
            <div className="max-h-96 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-800">
                {filtered.length === 0 ? (
                    <div className="p-4 text-sm text-muted">
                        Geen notificaties
                    </div>
                ) : (
                    filtered.map((notif) => (
                        <NotificationItem
                            key={notif.id}
                            notif={notif}
                            markRead={markNotifRead}
                        />
                    ))
                )}
            </div>
        </AsyncData>
    );
}