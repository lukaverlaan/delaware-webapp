import useSWR from "swr";
import { getAll } from "../../api";

export default function PlanningWidget() {
    const { data: taken = [] } = useSWR("taken", getAll);

    const upcoming = taken
        .filter(t => t.datum)
        .sort((a, b) => new Date(a.datum) - new Date(b.datum))
        .slice(0, 5);

    return (
        <div className="surface p-5 rounded-xl">
            <h3 className="font-semibold mb-4">Komende taken</h3>

            {upcoming.length === 0 ? (
                <p className="text-sm text-gray-400">
                    Geen geplande taken
                </p>
            ) : (
                <div className="space-y-2">
                    {upcoming.map(t => (
                        <div key={t.id} className="text-sm">
                            <p className="font-medium">
                                {t.omschrijving}
                            </p>
                            <p className="text-gray-400 text-xs">
                                {new Date(t.datum).toLocaleDateString("nl-BE")}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}