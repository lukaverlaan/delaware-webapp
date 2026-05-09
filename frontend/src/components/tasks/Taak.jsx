import { memo } from 'react';
import { Link } from 'react-router';
import StatusBadge from '../StatusBadge.jsx';

const MemoizedTaak = memo(function Taak({
  id,
  type,
  omschrijving,
  duurtijd,
  status,
  datum,
  medewerker,
}) {
  const medewerkerNaam = medewerker?.naam || 'Geen medewerker';

  return (
    <Link to={`/taken/${id}`} className="block group">
      <div className="
    rounded-2xl p-5 
    bg-white 
    dark:bg-[#11161c]
    border border-gray-200 dark:border-gray-800
    hover:border-(--primary)
    transition-all duration-300
    hover:-translate-y-1
    hover:shadow-md dark:hover:shadow-2xl
">

        <div className="flex justify-between items-start mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {type}
          </span>
        </div>

        <div className="flex items-center justify-between mb-2 text-xs text-gray-500 dark:text-gray-400">
          <span>Taak #{id}</span>
          {datum && <span>{new Date(datum).toLocaleDateString('nl-BE', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\/+/g, '/')}</span>}
        </div>

        <p className="text-xs text-gray-400 mb-1">
          {medewerkerNaam || 'Geen medewerker'}
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
          {omschrijving}
        </p>


        <div className="mb-2">
          <div className="flex justify-between text-xs mb-1 text-gray-500 dark:text-gray-400">
            <span>Duurtijd</span>
            <span>{duurtijd}</span>
          </div>
          <div className="w-48 h-3 flex items-center gap-0.5">
            {Array.from({ length: Math.min(Math.ceil(duurtijd / 15), 20) }).map((_, i) => (
              <div
                key={i}
                className="w-2.5 h-full bg-red-500 rounded-sm flex-shrink-0"
              />
            ))}
          </div>
        </div>


      </div>
    </Link>
  );
});

export default MemoizedTaak;