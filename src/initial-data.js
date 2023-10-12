const initialData = {
  tasks: {
    'task-1': { id: 'task1', content: 'Take out the garbage' },
    'task-2': { id: 'task2', content: 'Play with ball with Martin' },
    'task-3': { id: 'task3', content: 'Eat Lunch' },
    'task-4': { id: 'task4', content: 'Go to food store' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1'],
}

export default initialData
