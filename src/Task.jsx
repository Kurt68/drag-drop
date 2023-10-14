import styled from 'styled-components'
import { Draggable } from '@hello-pangea/dnd'

const Container = styled.div`
  border: 3px solid lightgrey;
  border-radius: 50%;
  padding: 8px;
  margin-right: 8px;

  background-color: ${(props) => (props.$isDragging ? '#072541' : 'white')};
  color: ${(props) => (props.$isDragging ? 'white' : '#072541')};
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
  &:focus {
    outline: none;
    border-color: red !important;
  }
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
export function Task({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          $isDragging={snapshot.isDragging}
        >
          {task.content[0]}
        </Container>
      )}
    </Draggable>
  )
}
