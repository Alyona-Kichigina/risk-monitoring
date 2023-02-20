import React, {useState, useCallback} from 'react';
import {Button, ButtonsContainer} from "../../../Components/ButtonsTabBar";
import Card from "../../../Components/Card/Card"

const data = [
  {
    id:1,
    name: "Название 1"
  },
  {
    id:2,
    name: "Название 2"
  },
  {
    id:3,
    name: "Название 3"
  },
  {
    id:4,
    name: "Название 4"
  },
]

const list_1 = "Список 1"
const list_2 = "Список 2"
const list_3 = "Список 3"

const attributesButtons = [
  {
    id: 1,
    label: list_1,
  },
  {
    id: 2,
    label: list_2
  },
  {
    id: 3,
    label: list_3
  }
]

const ListComponents = {
  [list_1]: (props) =>
    <div className="flex-container">
      {data.map((item) => (
        <Card key={item.id} data={item}/>
        ))}
    </div>,
  [list_2]: (props) =>
    <div className="flex-container">list_2</div>,
  [list_3]: (props) =>
    <div className="flex-container">list_3</div>,
}

const List = () => {
  const [activeButton, setActiveButton] = useState(list_1)

  const openAttributes = useCallback((label) =>
    () => setActiveButton(label), [setActiveButton])

  const DictionaryComponent = ListComponents[activeButton]
  return (
    <>
      <ButtonsContainer className="mt-2.5">
        {attributesButtons.map(({id, label}) => (
          <Button
            className={`${label === activeButton ? 'current' : ''}`}
            onClick={openAttributes(label)}
            key={id}
          >
            {label}
          </Button>
        ))}
      </ButtonsContainer>
      {<DictionaryComponent/>}

    </>
  );
};

export default List;
