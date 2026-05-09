import Taak from './Taak';

export default function TakenCards({ taken }) {

  if (taken.length === 0) {
    return (
      <div className='p-4 mb-4 text-sm text-(--primary) rounded-lg bg-(--primary)'>
        Er zijn nog geen taken.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {taken
        .sort((a, b) => a.id - b.id)
        .map((t) => (
          <div key={t.id}>
            <Taak {...t} />
          </div>
        ))}
    </div>
  );
}
