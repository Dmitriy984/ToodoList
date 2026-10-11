import { useState } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  const addTask = () => {
    const trimmed = newTaskText.trim();
    if (!trimmed) return;
    const newTask: Task = {
      id: Date.now(), 
      text: trimmed,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };


  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="todo-list">
      <h2>Список задач</h2>

      <div className="todo-input">
        <input
          type="text"
          value={newTaskText}
          onChange={e => setNewTaskText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Введите новую задачу"
        />
        <button onClick={addTask}>Добавить</button>
      </div>

      {totalCount === 0 ? (
        <p className="empty-message">Нет задач</p>
      ) : (
        <>
          <p className="counter">
            Выполнено {completedCount} из {totalCount}
          </p>

          <ul className="task-list">
            {tasks.map(task => (
              <li key={task.id} className={task.completed ? 'completed' : ''}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span className="task-text">{task.text}</span>
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TodoList;
