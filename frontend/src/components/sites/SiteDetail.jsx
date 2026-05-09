import { useParams, Link } from "react-router";
import { getById } from "../../api";
import useSWR from "swr";
import AsyncData from "../../components/AsyncData";
import StatusBadge from "../../components/StatusBadge";

const SiteDetail = () => {
  const { id } = useParams();
  const idAsNumber = Number(id);

  const {
    data: site,
    error,
    isLoading,
  } = useSWR(id ? `sites/${idAsNumber}` : null, getById);

  return (
    <AsyncData loading={isLoading} error={error}>
      {site && (
        <div className="max-w-5xl mx-auto p-6">
          <h1 className="text-3xl font-semibold mb-8">{site.naam}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card label="Locatie" value={site.locatie} />
            <Card label="Capaciteit" value={site.capaciteit} />

            <div className="surface rounded-xl p-5">
              <p className="text-sm text-muted mb-3">Operationele status</p>
              <StatusBadge value={site.operationeleStatus} />
            </div>

            <div className="surface rounded-xl p-5">
              <p className="text-sm text-muted mb-3">Productie status</p>
              <StatusBadge value={site.productieStatus} />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Link
              to= {`/machines/site/${site.id}`} 
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                            bg-(--primary) hover:bg-(--primary)transition"
            >
              Machines
            </Link>

            <Link
              to="/sites"
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

export default SiteDetail;
