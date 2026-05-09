import { memo } from 'react';
import { Link } from 'react-router';
import StatusBadge from '../../components/StatusBadge';

const MemoizedSite = memo(function Site({
    id,
    naam,
    capaciteit,
    locatie,
    operationeleStatus,
    productieStatus
}) {

    const capacityPercent = Math.min((capaciteit / 200) * 100, 100);

    return (
        <Link to={`/sites/${id}`} className="block group">
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

                <h2 className="text-lg font-semibold mb-1 group-hover:text-(--primary) transition">
                    {naam}
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {locatie}
                </p>

                {/* Capaciteit */}
                <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1 text-gray-500 dark:text-gray-400">
                        <span>Capaciteit</span>
                        <span>{capaciteit}</span>
                    </div>

                    <div className="h-2 bg-gray-200 dark:bg-gray-700/50 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-red-400 transition-all duration-500"
                            style={{ width: `${capacityPercent}%` }}
                        />
                    </div>
                </div>

                {/* Status */}
                <div className="flex justify-between items-center">
                    <StatusBadge value={operationeleStatus} />
                    <StatusBadge value={productieStatus} />
                </div>

            </div>
        </Link>
    );
});

export default MemoizedSite;