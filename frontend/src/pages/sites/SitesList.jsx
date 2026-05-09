import useSWR from 'swr';
import { getAll } from '../../api';
import SitesCards from '../../components/sites/SitesCards';
import AsyncData from '../../components/AsyncData';

const SitesList = () => {

    const { data: sites = [], error, isLoading } = useSWR('sites', getAll);

    const active = sites.filter(s => s.operationeleStatus === 'actief').length;
    const offline = sites.filter(s => s.operationeleStatus === 'offline').length;

    return (
        <div className="p-6 max-w-7xl mx-auto">

            <div className="mb-8">
                <h1 className="text-3xl font-semibold mb-2">Sites</h1>
                <p className="text-gray-400">Overzicht van alle locaties</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <Stat label="Totaal" value={sites.length} />
                <Stat label="Actief" value={active} />
                <Stat label="Offline" value={offline} />
            </div>

            <AsyncData loading={isLoading} error={error}>
                <SitesCards sites={sites} />
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

export default SitesList;