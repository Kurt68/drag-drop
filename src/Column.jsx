import styled from 'styled-components'
import { Task } from './Task'
import { Droppable } from '@hello-pangea/dnd'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`
const Title = styled.h3`
  padding: 8px;
`
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.5s ease;
  background-color: ${(props) => (props.$isDraggingOver ? '#FBECB2' : 'white')};
`

// snapshot object has properties to style component on drag
// Draggable
// const draggableSnapshot = {
//   isDragging: true,
//   draggingOver: 'column-1',
// }
// Droppable
// const droppableSnaphot = {
//   isDraggingOver: true,
//   draggingOverWith: 'task-1',
// }

export function Column({ column, tasks }) {
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            $isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  )
}
