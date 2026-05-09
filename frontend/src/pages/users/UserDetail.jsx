import { useParams, Link } from 'react-router';
import { getById } from '../../api';
import useSWR from 'swr';
import AsyncData from '../../components/AsyncData';
import StatusBadge, { capitalize } from '../../components/StatusBadge';

const UserDetail = () => {
    const { id } = useParams();

    const { data: user, error, isLoading } =
        useSWR(id ? `gebruikers/${id}` : null, getById);

    return (
        <AsyncData loading={isLoading} error={error}>
            {user && (
                <div className="max-w-6xl mx-auto p-6">

                    <div className="grid md:grid-cols-[280px_1fr] gap-10">

                        <div className="space-y-6">

                            {/* Avatar */}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-full bg-(--primary)/20 flex items-center justify-center text-xl font-semibold">
                                    {user.voornaam?.[0]}{user.naam?.[0]}
                                </div>

                                <h2 className="mt-4 text-xl font-semibold">
                                    {user.voornaam} {user.naam}
                                </h2>

                                <p className="text-xs text-gray-500 mt-1">
                                    {user.rol}
                                </p>

                                <div className="mt-3">
                                    <StatusBadge value={user.status} />
                                </div>
                            </div>

                        </div>

                        <div className="space-y-8">
                            <Section title="Persoonlijke info">
                                <Row label="Voornaam" value={user.voornaam} />
                                <Row label="Naam" value={user.naam} />
                            </Section>

                            <Section title="Contact">
                                <Row label="Email" value={user.email} />
                                <Row label="GSM" value={user.gsm} />
                                <Row label="Adres" value={user.adres} />
                            </Section>

                            <Section title="Werk informatie">
                                <Row label="Personeelsnummer" value={user.personeelsnummer} />
                                <Row label="Rol" value={user.rol} />
                            </Section>

                            <div className="flex justify-end">
                                <Link
                                    to="/gebruikers"
                                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                                    bg-(--primary) hover:bg-(--primary-hover)
                                    transition"
                                >
                                    ← Terug
                                </Link>
                            </div>

                        </div>

                    </div>

                </div>
            )}
        </AsyncData>
    );
};

const Section = ({ title, children }) => (
    <div>
        <h3 className="text-sm uppercase text-gray-400 mb-4 tracking-wide">
            {title}
        </h3>

        <div className="surface divider rounded-xl overflow-hidden">
            {children}
        </div>
    </div>
);

const Row = ({ label, value }) => (
    <div className="flex justify-between items-center px-4 py-3 surface-soft">
        <span className="text-sm text-muted">{label}</span>
        <span className="text-sm font-medium">{value || '-'}</span>
    </div>
);

export default UserDetail;