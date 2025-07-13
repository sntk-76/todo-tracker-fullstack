import TaskList from './components/TaskList';

export function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
        Todo Tracker
      </h1>
      <TaskList />
    </div>
  );
}
