import initialData from './initial-data.js'
import { Column } from './Column.jsx'
import { DragDropContext } from '@hello-pangea/dnd'

function App() {
  const state = initialData

  // onDragEnd = (result) => {
  //   // TODO: reorder our column
  // }

  return (
    <DragDropContext /*onDragEnd={onDragEnd}*/>
      {state.columnOrder.map((columnId) => {
        const column = state.columns[columnId]
        const tasks = column.taskIds.map((taskId) => state.tasks[taskId])
        return <Column key={column.id} column={column} tasks={tasks} />
      })}
    </DragDropContext>
  )
}

export default App
