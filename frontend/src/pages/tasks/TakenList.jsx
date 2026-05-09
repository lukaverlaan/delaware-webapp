import useSWR from 'swr';
import { getAll } from '../../api';
import TakenCards from '../../components/tasks/TakenCards';
import AsyncData from '../../components/AsyncData';
import { Link } from 'react-router';

const TakenList = () => {

  const { data: taken = [], error, isLoading } = useSWR('taken', getAll);

  return (
    <div className="p-6 max-w-7xl mx-auto">

      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Taken</h1>
        <p className="text-gray-400">Overzicht van al je taken</p>
      </div>

      <AsyncData loading={isLoading} error={error}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            { key: 'open', label: 'Open', color: 'bg-blue-500/10 text-blue-400 ring-blue-500/20' },
            { key: 'in_progress', label: 'In Behandeling', color: 'bg-yellow-500/10 text-yellow-400 ring-yellow-500/20' },
            { key: 'done', label: 'Klaar', color: 'bg-green-500/10 text-green-400 ring-green-500/20' }
          ].map(({ key, label, color }) => {
            const tasks = taken.filter(t => t.status?.toLowerCase() === key).sort((a, b) => a.id - b.id);
            return (
              <div key={key}>
                <div className="flex items-center gap-3 mb-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}>
                    {label} ({tasks.length})
                  </span>
                </div>
                {tasks.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    Geen {label.toLowerCase()} taken
                  </div>
                ) : (
                  <TakenCards taken={tasks} />
                )}
              </div>
            );
          })}
        </div>
      </AsyncData>
      <Link
        to="/taken/add"
        className="fixed bottom-6 right-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-(--primary) hover:bg-(--primary) shadow-lg text-white z-40"
      >
        + Nieuwe taak
      </Link>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="surface rounded-xl p-4">
    <p className="text-sm text-muted">{label}</p>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
);

export default TakenList;