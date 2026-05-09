import { useParams, Link } from 'react-router';
import { getById } from '../../api';
import useSWR from 'swr';
import AsyncData from '../../components/AsyncData';

const TaakDetail = () => {
  const { id } = useParams();
  const idAsNumber = Number(id);

  const { data: taak, error, isLoading } =
    useSWR(id ? `taken/${idAsNumber}` : null, getById);

  return (
    <AsyncData loading={isLoading} error={error}>
      {taak && (
        <div className="max-w-5xl mx-auto p-6">

          <h1 className="text-3xl font-semibold mb-8">
            Taak #{taak.id}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <Card label="Type" value={taak.type} />
            <Card label="Datum" value={taak.datum ? new Date(taak.datum).toLocaleDateString('nl-BE', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\/+/g, '/') : 'N/A'} />
            <Card label="Duurtijd" value={`${taak.duurtijd} minutes`} />

            <div className="md:col-span-2 surface rounded-xl p-5">
              <p className="text-sm muted mb-3">Omschrijving</p>
              <p className="text-lg font-medium">{taak.omschrijving}</p>
            </div>

            <Card
              label="Medewerker"
              value={taak.medewerker?.naam || 'Niet toegewezen'}
            />

          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Link
              to="/taken"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                            bg-(--primary) hover:bg-(--primary)transition"
            >
              ← Terug
            </Link>
            <Link
              to={`/taken/edit/${id}`}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                            bg-(--primary) hover:bg-(--primary)transition"
            >
              Bewerk
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

export default TaakDetail;

