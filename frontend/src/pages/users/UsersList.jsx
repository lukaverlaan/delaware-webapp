import { useState, useMemo } from 'react';
import useSWR from 'swr';
import { getAll } from '../../api';
import AsyncData from '../../components/AsyncData';
import { Link } from 'react-router';
import StatusBadge from '../../components/StatusBadge';
import levenshtein from 'js-levenshtein';

const UsersList = () => {
    const { data: users = [], error, isLoading } = useSWR('gebruikers', getAll);

    const [search, setSearch] = useState('');

    const filteredUsers = useMemo(() => {
        if (!search.trim()) return users;

        const query = search.toLowerCase().trim();
        const threshold = 3;

        return users.filter((u) => {
            const fullName = `${u.voornaam || ''} ${u.naam || ''}`.toLowerCase();
            const email = (u.email || '').toLowerCase();
            const rol = (u.rol || '').toLowerCase();

            return (
                levenshtein(fullName, query) <= threshold ||
                levenshtein(email, query) <= threshold ||
                levenshtein(rol, query) <= threshold
            );
        });
    }, [users, search]);

    return (
        <div className="p-6 max-w-7xl mx-auto">

            <div className="mb-6">
                <h1 className="text-3xl font-semibold mb-2">Gebruikers</h1>
                <p className="text-gray-400">Beheer alle gebruikers</p>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Zoek op naam, email of rol..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="
w-full md:w-96 px-4 py-2 rounded-lg 
bg-white dark:bg-white/5
border border-gray-200 dark:border-white/10 
focus:outline-none focus:border-(--primary)
transition
"
                />
            </div>

            <AsyncData loading={isLoading} error={error}>
                <div className="surface rounded-xl overflow-hidden">

                    {filteredUsers.length === 0 ? (
                        <div className="p-6 text-gray-400 text-sm">
                            Geen gebruikers gevonden.
                        </div>
                    ) : (
                        filteredUsers.map((u) => (
                            <Link
                                key={u.id}
                                to={`/gebruikers/${u.id}`}
                                className="flex items-center justify-between px-5 py-4 hover:bg-gray-100 dark:hover:bg-white/5 transition border-b border-gray-200 dark:border-white/5"
                            >
                                <div className="flex items-center gap-4">

                                    <div className="w-10 h-10 rounded-full bg-(--primary)/20 flex items-center justify-center text-sm font-semibold">
                                        {u.voornaam?.[0]}{u.naam?.[0]}
                                    </div>

                                    <div>
                                        <p className="font-medium">
                                            {u.voornaam} {u.naam}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {u.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">

                                    <span className="text-sm text-gray-400">
                                        {u.rol}
                                    </span>

                                    <StatusBadge value={u.status} />

                                </div>
                            </Link>
                        ))
                    )}

                </div>
            </AsyncData>

        </div>
    );
};

export default UsersList;