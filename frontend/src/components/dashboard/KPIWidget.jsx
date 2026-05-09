import useSWR from "swr";
import { getAll } from "../../api";

export default function KPIWidget() {
    const { data: taken = [] } = useSWR("taken", getAll);
    const { data: sites = [] } = useSWR("sites", getAll);

    const open = taken.filter(t => t.status === "OPEN").length;
    const total = taken.length;
    const sitesCount = sites.length;

    return (
        <div className="grid grid-cols-3 gap-3 h-full">

            <Card title="Open taken" value={open} />
            <Card title="Totaal taken" value={total} />
            <Card title="Sites" value={sitesCount} />

        </div>
    );
}

const Card = ({ title, value }) => (
    <div className="
    flex flex-col justify-center
    rounded-lg border border-gray-200 dark:border-gray-800
    px-3 py-2
    h-full
  ">
        <p className="text-xs text-gray-400">{title}</p>
        <p className="text-lg font-semibold">{value}</p>
    </div>
);