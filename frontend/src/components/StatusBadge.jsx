export function capitalize(value) {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

const StatusBadge = ({ value }) => {
    const v = value?.toLowerCase();

    const styles =
        v === 'actief' || v === 'gezond'
            ? 'bg-green-500/10 text-green-400 ring-1 ring-green-500/20'
            : v === 'problemen'
                ? 'bg-yellow-500/10 text-yellow-400 ring-1 ring-yellow-500/20'
                : v === 'offline'
                    ? 'bg-red-500/10 text-red-400 ring-1 ring-red-500/20'
                    : 'bg-gray-500/10 text-gray-400 ring-1 ring-gray-500/20';

    return (
        <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
            <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
            {capitalize(value)}
        </span>
    );
};

export default StatusBadge;