import initialData from './initial-data.js'
import { Column } from './Column.jsx'
import { DragDropContext } from '@hello-pangea/dnd'
import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
`

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

    const start = state.columns[source.droppableId]

    const finish = state.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)

      newTaskIds.splice(source.index, 1)

      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      }
      setState(newState)
      return
    }
    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)

    const newStart = {
      ...start,
      taskIds: startTaskIds,
    }
    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    }

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }
    setState(newState)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId]
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId])
          return <Column key={column.id} column={column} tasks={tasks} />
        })}
      </Container>
    </DragDropContext>
  )
}

export default App
