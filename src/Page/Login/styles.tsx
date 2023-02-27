import styled from "styled-components"

export const PageContainer = styled.div`
  position: relative;
  height: 100vh;
`

export const ContentContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 404px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const FormContainer = styled.div`
  background: var(--color-white);
  padding: 40px 62px;
  color: var(--color-black-darken-1);
`
