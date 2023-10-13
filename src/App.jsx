import initialData from './initial-data.js'
import { Column } from './Column.jsx'
import { DragDropContext } from '@hello-pangea/dnd'
import { useState } from 'react'

function App() {
  const [state, setState] = useState(initialData)

  let onDragEnd = {}

  // result object
  // const result = {
  //   draggableId: 'task-1',
  //   type: 'TYPE',
  //   reason: 'DROP',
  //   source: {
  //     droppableId: 'column-1',
  //     index: 0,
  //   },
  //   destination: {
  //     droppableId: 'column-1',
  //     index: 1,
  //   }
  //   }

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const column = state.columns[source.droppableId]
    const newTaskIds = Array.from(column.taskIds)
    console.log(newTaskIds)

    newTaskIds.splice(source.index, 1)
    newTaskIds.splice(destination.index, 0, draggableId)

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    }
    console.log(newColumn)

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn,
      
      },
    }
    setState(newState)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state.columnOrder.map((columnId) => {
        const column = state.columns[columnId]
        const tasks = column.taskIds.map((taskId) => state.tasks[taskId])
        return <Column key={column.id} column={column} tasks={tasks} />
      })}
    </DragDropContext>
  )
}

export default App
