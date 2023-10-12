import initialData from './initial-data.js'
import { Column } from './Column.jsx'

function App() {
  const state = initialData

  return state.columnOrder.map((columnId) => {
    const column = state.columns[columnId]
    const tasks = column.taskIds.map((taskId) => state.tasks[taskId])

    return <Column key={column.id} column={column} tasks={tasks} />
  })
}

export default App
