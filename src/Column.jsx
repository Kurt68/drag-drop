import styled from 'styled-components'
import { Task } from './Task'
import { Droppable, Draggable } from '@hello-pangea/dnd'

const Container = styled.div`
  margin: 12px;
  border: 1px solid #E4D00A;
  width:100%;
  display: flex;
  flex-direction: column;
  cursor: grab;
  background: rgb(255, 248, 220);
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
`
const Title = styled.h3`
  padding: 12px;
  color: black;
`
const TaskList = styled.div`
  padding: 12px;
  transition: background-color 0.5s ease;
  background-color: ${(props) =>
    props.$isDraggingOver ? '#F3E5AB' : 'inherit'};
  flex-grow: 1;
  min-height: 100px;
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

// Function could be more performat with React.memo
// As it was broken out to be the function InnnerList
function InnerList({ tasks }) {
  return tasks.map((task, index) => (
    <Task key={task.id} task={task} index={index} />
  ))
}

export function Column({ column, tasks, index }) {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{column.title}</Title>
          <Droppable droppableId={column.id} type="">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                $isDraggingOver={snapshot.isDraggingOver}
              >
                {/* {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))} */}
                <InnerList tasks={tasks} />
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  )
}
