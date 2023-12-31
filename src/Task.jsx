import styled from 'styled-components'
import { Draggable } from '@hello-pangea/dnd'

const Container = styled.div`
  border: 1px solid #e4d00a;
  padding: 8px;
  margin-bottom: 8px;

  background-color: ${(props) => (props.$isDragging ? '#FFFFE0' : 'white')};
  color: ${(props) => (props.$isDragging ? 'black' : 'black')};

  cursor: grab;
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
          {task.content}
        </Container>
      )}
    </Draggable>
  )
}
