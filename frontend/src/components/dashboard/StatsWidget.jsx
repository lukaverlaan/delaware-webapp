import useSWR from "swr";
import { getAll } from "../../api";

export default function StatsWidget() {
    const { data: taken = [] } = useSWR("taken", getAll);

    const open = taken.filter(t => t.status === "OPEN").length;
    const inProgress = taken.filter(t => t.status === "IN_PROGRESS").length;
    const done = taken.filter(t => t.status === "DONE").length;

    return (
        <div className="surface p-5 rounded-xl">
            <h3 className="font-semibold mb-4">Taken overzicht</h3>

            <div className="space-y-2 text-sm">
                <p>Open: {open}</p>
                <p>In behandeling: {inProgress}</p>
                <p>Klaar: {done}</p>
            </div>
        </div>
    );
}