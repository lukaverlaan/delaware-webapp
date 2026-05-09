import useSWR from "swr";
import { getAll } from "../../api";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const COLORS = ["#3b82f6", "#facc15", "#22c55e"];

export default function TasksChart() {
    const { data: taken = [] } = useSWR("taken", getAll);

    const data = [
        { name: "Open", value: taken.filter(t => t.status === "OPEN").length },
        { name: "In Progress", value: taken.filter(t => t.status === "IN_PROGRESS").length },
        { name: "Done", value: taken.filter(t => t.status === "DONE").length },
    ];

    return (
        <div className="surface p-4 rounded-xl h-full">
            <h3 className="font-semibold mb-3">Taken verdeling</h3>

            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={data} dataKey="value" outerRadius={70}>
                        {data.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}