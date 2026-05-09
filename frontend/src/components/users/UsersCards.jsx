import User from './User';

export default function UsersCards({ users }) {

    if (users.length === 0) {
        return (
            <div className='p-4 text-sm text-blue-400 rounded-xl bg-blue-500/10 border border-blue-500/20'>
                No users found.
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {users.map((u) => (
                <User key={u.id} {...u} />
            ))}
        </div>
    );
}