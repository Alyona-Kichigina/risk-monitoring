import React, {useCallback, useState} from 'react';
import Card from "../../Components/Card/Card";
import UserRegistry from "./list/UserRegistry";
import RequestRegistry from "./list/RequestRegistry";
import {Button, ButtonsContainer} from "../../Components/ButtonsTabBar";
import {Breadcrumb} from "antd";

const user_registry = "Реестр пользователей"
const requestRegistry = "Реестр запросов на регистрацию"

const attributesButtons = [
  {
    id: 1,
    label: user_registry,
  },
  {
    id: 2,
    label: requestRegistry
  },
]

const ListComponents = {
  [user_registry]: (props) =>
      <UserRegistry/>,
  [requestRegistry]: (props) =>
      <RequestRegistry/>,
}

const AdminPage = () => {
  const [activeButton, setActiveButton] = useState(user_registry)

  const openAttributes = useCallback((label) =>
    () => setActiveButton(label), [setActiveButton])

  const DictionaryComponent = ListComponents[activeButton]
  return (
    <>
      <div className="pr-5 pl-5 pb-5 flex-container bg-color-light-grey">
        <div className="pt-5 pb-5">
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/tab">Главная</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Список</Breadcrumb.Item>
          </Breadcrumb>
        </div>
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
      </div>
    </>
  );
};

export default AdminPage;
