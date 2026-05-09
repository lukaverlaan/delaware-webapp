import useSWR from "swr";
import { getAll } from "../../api";

export default function SitesWidget() {
    const { data: sites = [] } = useSWR("sites", getAll);

    const actief = sites.filter(s => s.operationeleStatus === "actief").length;
    const offline = sites.filter(s => s.operationeleStatus === "offline").length;

    return (
        <div className="surface p-5 rounded-xl">
            <h3 className="font-semibold mb-3">Sites status</h3>

            <div className="space-y-2 text-sm">
                <p>Actief: {actief}</p>
                <p>Offline: {offline}</p>
            </div>
        </div>
    );
}