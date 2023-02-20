import styled from "styled-components"

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding: 4px;
`

export const Button = styled.button`
  font-size: 14px;
  display: flex;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  color: var(--color-grey-darken-6);
  padding: 4px 10px;
  margin-right: 2px;
  cursor: pointer;
  will-change: width;
  transition: background 0.2s ease 0s, width 0.3s ease-in-out;
  position: relative;
  &:before {
    content: "";
    height: 1px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: none;
    background: var(--red);
  }
  &:last-child {
    margin-right: 0;
  }
  &.current {
    color: var(--color-black-darken-1);
    justify-content: center;
    font-weight: 700;
    &:before {
      display: block;
    }
  }
  &:hover {
    color: var(--color-black-darken-1);
  }
`
