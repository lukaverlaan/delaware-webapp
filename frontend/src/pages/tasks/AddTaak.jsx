import { useState } from 'react';
import { useNavigate } from 'react-router';
import { post, getAll } from '../../api';
import useSWR from 'swr';
import AsyncData from '../../components/AsyncData';
import { Link } from 'react-router';

const AddTaak = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: '',
    omschrijving: '',
    duurtijd: '',
    status: 'OPEN',
    datum: new Date().toISOString().split('T')[0],
    medewerkerId: ''
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const { data: gebruikers } = useSWR('gebruikers', getAll);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await post('taken', { arg: formData });
      navigate(-1);
    } catch (err) {
      setError('Fout bij opslaan: ' + err.message);
    }
    setSaving(false);
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8 flex items-center gap-4">
        <h1 className="text-3xl font-semibold">Nieuwe taak</h1>
      </div>

      <AsyncData loading={!gebruikers}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Type:</label>
            <input
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="input w-full border-2 border-gray-300 dark:border-gray-600 focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Omschrijving:</label>
            <textarea
              name="omschrijving"
              value={formData.omschrijving}
              onChange={handleChange}
              rows="4"
              className="input w-full border-2 border-gray-300 dark:border-gray-600 focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Duurtijd (minuten):</label>
              <input
                type="number"
                name="duurtijd"
                value={formData.duurtijd}
                onChange={handleChange}
                min="1"
                className="input w-full border-2 border-gray-300 dark:border-gray-600 focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Status:</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input w-full border-2 border-gray-300 dark:border-gray-600 focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20"
              >
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Medewerker:</label>
            <select
              name="medewerkerId"
              value={formData.medewerkerId}
              onChange={handleChange}
              className="input w-full border-2 border-gray-300 dark:border-gray-600 focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20"
            >
              <option value="">Selecteer medewerker</option>
              {gebruikers && gebruikers.map(g => (
                <option key={g.id} value={g.id}>
                  {g.voornaam} {g.naam}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Datum:</label>
            <input
              type="date"
              name="datum"
              value={formData.datum}
              onChange={handleChange}
              min={minDate}
              className="input w-full border-2 border-gray-300 dark:border-gray-600 focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20"
              required
            />

          </div>

          {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-(--primary) hover:bg-(--primary)transition"
            >
              ← Terug
            </button>
            <button type="submit" disabled={saving} className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-(--primary) hover:bg-(--primary)transition">
              {saving ? 'Opslaan...' : 'Taak aanmaken'}
            </button>
          </div>
        </form>
      </AsyncData>
    </div>
  );
};

export default AddTaak;

