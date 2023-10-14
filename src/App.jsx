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
    console.log(`Start:`, start)

    const finish = state.columns[destination.droppableId]
    console.log(`Finish:`, finish)

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      console.log(`New Tasks:`, newTaskIds)

      newTaskIds.splice(source.index, 1)
      console.log(`Source index`, source.index)

      newTaskIds.splice(destination.index, 0, draggableId)
      console.log(`Destination index`, destination.index)

      console.log(`Draggable`, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }
      console.log(`New Column:`, newColumn)

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
    // Moving form one list to another
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)

    const newStart = {
      ...start,
      taskIds: startTaskIds,
    }
    console.log(`New Start New Column:`, newStart)
    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    }
    console.log(`New Finish New Column:`, newFinish)

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }
    console.log(`New Start Id:`, newStart.id)
    console.log(`New Finish Id:`, newFinish.id)
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
