import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { getAll } from '../../api';
import useSWR from 'swr';
import AsyncData from '../../components/AsyncData';
import StatusBadge from '../../components/StatusBadge';

const Planning = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState(null);
  const { data: taken = [], error, isLoading } = useSWR('taken', getAll);

  const openTaskModal = (task) => setSelectedTask(task);
  const closeTaskModal = () => setSelectedTask(null);

  // maandag van de week zoeken
  useEffect(() => {
    const d = new Date(currentWeekStart);
    const day = d.getDay();
    const diff = d.getDay() === 0 ? -6 : day - 1;
    setCurrentWeekStart(new Date(d.setDate(d.getDate() - diff)));
  }, []);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentWeekStart);
    date.setDate(currentWeekStart.getDate() + i);
    return {
      date,
      dayName: date.toLocaleDateString('nl-BE', { weekday: 'short' }).toUpperCase(),
      formatted: date.toLocaleDateString('nl-BE', { day: 'numeric', month: 'short' })
    };
  });

  const tasksByDate = taken.reduce((acc, task) => {
    if (task.datum) {
      const taskDate = new Date(task.datum);
      const key = taskDate.toDateString();
      acc[key] = acc[key] || [];
      acc[key].push(task);
    }
    return acc;
  }, {});

  const prevWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(newStart);
  };

  const nextWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(newStart);
  };

  const todayDateStr = new Date().toDateString();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-semibold">Planning</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="#"
            onClick={prevWeek}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-(--primary) hover:bg-(--primary)transition"
          >
            ← Vorige week
          </Link>
          <span className="font-semibold">
            {weekDays[0].formatted} - {weekDays[6].formatted}
          </span>
          <Link
            to="#"
            onClick={nextWeek}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-(--primary) hover:bg-(--primary)transition"
          >
            Volgende week →
          </Link>
          <Link to="/taken/nieuw" className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-(--primary) hover:bg-(--primary)transition">
            + Nieuwe taak
          </Link>
        </div>
      </div>

      <AsyncData loading={isLoading} error={error}>
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {weekDays.map(({ date, dayName, formatted }) => {
            const dateStr = date.toDateString();
            const dayTasks = tasksByDate[dateStr] || [];
            return (
              <div key={dateStr} className={`border rounded-xl p-4 h-[500px] ${dateStr === todayDateStr ? 'ring-2 ring-(--primary) ring-offset-2' : ''
                }`}>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">{dayName}</h3>
                  <p className="text-sm text-muted">{formatted}</p>
                </div>
                <div className="space-y-2 overflow-y-auto max-h-[400px]">
                  {dayTasks.map((task) => (
                    <div key={task.id} className="cursor-pointer" onClick={() => openTaskModal(task)}>
                      <div className="surface rounded-lg p-3 hover:shadow-md transition">
                        <div className="flex items-center gap-2 mb-1">
                          <StatusBadge value={task.status} />
                          <span className="text-xs text-muted">#{task.id}</span>
                        </div>
                        <h4 className="font-medium line-clamp-1">{task.omschrijving}</h4>
                        <p className="text-xs text-muted">{task.type} • {task.duurtijd}min • {task.medewerker?.naam || 'Geen'}</p>
                      </div>
                    </div>
                  ))}
                  {dayTasks.length === 0 && (
                    <p className="text-gray-400 text-sm text-center py-4">Geen taken</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </AsyncData>

      {selectedTask && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="surface max-w-md w-full max-h-[80vh] overflow-y-auto rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Taak #{selectedTask.id}</h3>
              <button onClick={closeTaskModal} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <StatusBadge value={selectedTask.status} />
                <span>{selectedTask.type}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{selectedTask.omschrijving}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted">Duurtijd</span>
                  <p>{selectedTask.duurtijd} min</p>
                </div>
                <div>
                  <span className="text-muted">Datum</span>
                  <p>{new Date(selectedTask.datum).toLocaleDateString('nl-BE')}</p>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end gap-3 mt-6 pt-6 border-t">
              <Link to={`/taken/${selectedTask.id}`} className="px-6 py-2 border-red-400 rounded-lg rounded-lg bg-(--primary) hover:bg-(--primary)transition">
                Details
              </Link>
              <Link to={`/taken/edit/${selectedTask.id}`} className="px-6 py-2 border-red-400 rounded-lg rounded-lg bg-(--primary) hover:bg-(--primary)transition">
                Bewerk
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Planning;

