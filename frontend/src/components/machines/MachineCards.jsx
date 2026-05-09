import Machine from './Machine';

export default function MachineCards({ machines }) {

    if (machines.length === 0) {
        return (
            <div className='p-4 mb-4 text-sm text-(--primary) rounded-lg bg-(--primary)'>
                There are no machines yet.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
            {machines
                .sort((a, b) => a.id - b.id)
                .map((m) => (
                    <div key={m.id}>
                        <Machine {...m} />
                    </div>
                ))}
        </div>
    );
}