import { useParams, Link } from "react-router";
import { getById } from "../../api";
import useSWR from "swr";
import AsyncData from "../../components/AsyncData";
import StatusBadge from "../../components/StatusBadge";

const MachineDetail = () => {
  const { id } = useParams();
  const idAsNumber = Number(id);

  const {
    data: machine,
    error,
    isLoading,
  } = useSWR(id ? `machines/${idAsNumber}` : null, getById);

  return (
    <AsyncData loading={isLoading} error={error}>
      {machine && (
        <div className="max-w-5xl mx-auto p-6">
          <h1 className="text-3xl font-semibold mb-8">{machine.code}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card label="Site" value={machine.siteId} />
            <Card label="Locatie" value={machine.locatie} />
            <Card label="Product Info" value={machine.productinfo} />
            <Card label="Uptime" value={machine.uptime} />
            <Card label="Laatste Onderhoud" value={machine.laatsteonderhoud} />
            <Card label="Medewerker" value={machine.medewerker} />

            <div className="surface rounded-xl p-5">
              <p className="text-sm text-muted mb-3">Status</p>
              <StatusBadge value={machine.status} />
            </div>

            <div className="surface rounded-xl p-5">
              <p className="text-sm text-muted mb-3">Productie status</p>
              <StatusBadge value={machine.productiestatus} />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Link
              to="/machines"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                            bg-(--primary) hover:bg-(--primary)transition"
            >
              ← Terug
            </Link>
          </div>
        </div>
      )}
    </AsyncData>
  );
};

const Card = ({ label, value }) => (
  <div className="surface rounded-xl p-5">
    <p className="text-sm muted">{label}</p>
    <p className="text-lg font-medium">{value}</p>
  </div>
);

export default MachineDetail;
