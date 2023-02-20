import {PinkButton, GreenButton} from "../../Components/Buttons";
import Status from "./Components/Status";
import ButtonsEditStatus from "./Components/ButtonsEditStatus";
import {NavLink} from "react-router-dom";

export const UserRegistryConfig = [
  {
    id: 11,
    key: "number",
    name: "№",
    size: "50px"
  },
  {
    id: 2,
    name: "Сотрудник",
    key: "name",
    size: "30%",
    allData: true,
    component: ({data: { id, name}}) => {
      return (
        <NavLink
          to={`/user/${id}/${name}`}
        >
          {name}
        </NavLink>
      )
    }
  },
  {
    id: 3,
    name: "Почта",
    key: "email",
    size: "35%"
  },
  {
    id: 4,
    name: "Дата регистрации",
    key: "registration_date",
    size: "20%"
  }
]


export const RequestRegistryConfig = [
  {
    id: 11,
    key: "number",
    name: "№",
    size: "50px"
  },
  {
    id: 2,
    name: "Сотрудник",
    key: "name",
    size: "20%"
  },
  {
    id: 3,
    name: "Почта",
    key: "email",
    // size: "15%"
  },
  {
    id: 4,
    name: "Статус",
    key: "status",
    component: Status
  },
  {
    id: 5,
    name: "Дата подачи запроса на регистрацию",
    key: "application_date",
    size: "15%"
  },
  {
    id: 6,
    name: "Дата постановки статуса",
    key: "status_setting_date",
    size: "15%"
  },
  {
    id: 7,
    key: "status",
    name: "",
    size: "235px",
    component: ButtonsEditStatus
  }
]
