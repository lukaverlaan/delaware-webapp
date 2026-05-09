import useSWR from "swr";
import { useParams } from "react-router";
import { getBySiteId } from "../../api";
import MachineCards from "../../components/machines/MachineCards";
import AsyncData from "../../components/AsyncData";

const MachineList = () => {
  const { siteId } = useParams();

  const {
    data,
    error,
    isLoading,
  } = useSWR(siteId ? `machines/site/${siteId}` : null, getBySiteId);

  const machines = data ?? [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Machines</h1>
        <p className="text-gray-400">Overzicht van alle Machines</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-8">
        <Stat className="mx-auto" label="Totaal" value={machines.length} />
      </div>

      <AsyncData loading={isLoading} error={error}>
        <MachineCards machines={machines} />
      </AsyncData>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="surface rounded-xl p-4">
    <p className="text-sm text-muted">{label}</p>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
);

export default MachineList;