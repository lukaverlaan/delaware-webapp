import useSWR from "swr";
import { getAll } from "../../api";
import { useAuth } from "../../contexts/auth";

export default function MyTasksWidget() {
    const { user } = useAuth();
    const { data: taken = [] } = useSWR("taken", getAll);

    const myTasks = taken.filter(
        t => t.medewerker?.id === user?.id
    ).slice(0, 5);

    return (
        <div className="p-5">
            {myTasks.length === 0 ? (
                <p className="text-sm text-gray-400">
                    Geen taken toegewezen
                </p>
            ) : (
                myTasks.map(t => (
                    <p key={t.id} className="text-sm">
                        {t.omschrijving}
                    </p>
                ))
            )}
        </div>
    );
}