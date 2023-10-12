import styled from "styled-components"

const Container = styled.div`
border: 1px solid lightgrey;
border-radius: 2px;
padding: 8px;
margin-bottom: 8px;`

export function Task({ task }) {
  return <Container>{task.content}</Container>
}
