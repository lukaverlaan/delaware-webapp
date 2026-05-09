import { memo } from 'react';
import { Link } from 'react-router';

const MemoizedUser = memo(function User({ id, name, email }) {
    return (
        <Link to={`/gebruikers/${id}`} className="block group">
            <div className="
                rounded-2xl p-5 
                bg-white/5 border border-white/10
                hover:border-(--primary)/40
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl
            ">
                <h2 className="text-lg font-semibold group-hover:text-(--primary) transition">
                    {name}
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                    {email}
                </p>
            </div>
        </Link>
    );
});

export default MemoizedUser;