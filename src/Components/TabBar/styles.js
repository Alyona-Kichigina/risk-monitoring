import styled, {css} from "styled-components"

export const TabBarContainer = styled.div`
  height: 60px;
  background: var(--white);
  border-bottom: 1px solid var(--color-light-grey-2);
`
export const TabButton = styled.button`
  width: 160px;
  min-width: 100px;
  padding-left: 15px;
  padding-right: 13px;
  color: var(--color-white);
  transition-property: color, background-color;
  transition-timing-function: ease-in-out;
  transition-duration: 250ms;
  margin-right: ${props => props.notLast ? "2px" : "0px"};
  ${({ active }) => active
          ? css`
      background: var(--color-light-gold-1);
    `
          : css`
      background: var(--color-grey-darken-0);
      &:hover {
        color: var(--color-black-darken-1);
      }
  `};
`

export const AlertAndUserInfoContainer = styled.div`
  min-width: 366px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const NameUser = styled.div`
  color: var(--color-black-darken-4);
  border-right: 1px solid var(--color-light-grey-2);
`
