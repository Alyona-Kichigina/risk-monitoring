import React, {useCallback, useState} from 'react';
import AppList from "../../../Components/AppList";
import {UserRegistryConfig} from "../tableConfig"
import {Input} from "antd";
import debounce from "../../../Utils/debounce";

const dataTable = [
  {
    id: "1",
    name: "Иванов Иван Иванович",
    email: "aaa@mail.ru",
    registration_date: "10.10.20"
  },
  {
    id: "1",
    name: "Петров Петр Петрович",
    email: "bbb@mail.ru",
    registration_date: "10.10.20"
  },
  {
    id: "1",
    name: "Олегов Олег Олегович",
    email: "ccc@mail.ru",
    registration_date: "10.10.20"
  }
]

const UserRegistry = () => {
  const [data, setData] = useState(dataTable)

  const onSearch = (debounce(useCallback((value) => {
    if (value) {
      setData(dataTable.filter(({name, email}) => name.toLowerCase().includes(value) || email.toLowerCase().includes(value)))
    } else {
      setData(dataTable)
    }
  }, []), 250))
  return (
    <>
      <div className="flex mb-5">
        <Input.Search
          enterButton
          allowClear
          placeholder="Введите текст для поиска"
          style={{width: 240, marginRight: "10px"}}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <AppList
        settings={UserRegistryConfig}
        data={data}
        nestedKey="data"
      />
    </>
  );
};

export default UserRegistry;
