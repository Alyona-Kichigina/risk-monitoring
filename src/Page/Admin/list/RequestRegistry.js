import React, {useCallback, useState} from 'react';
import AppList from "../../../Components/AppList";
import {RequestRegistryConfig} from "../tableConfig";
import {Input, Select, DatePicker, ConfigProvider} from 'antd'
import debounce from "../../../Utils/debounce";
import moment from "moment";
import ru_RU from 'antd/lib/locale-provider/ru_RU';
const { Option } = Select;

const dataTable = [
  {
    id: 1,
    name: "Иванов Иван Иванович",
    email: "aaa@mail.ru",
    status: "Активен",
    application_date: "10.10.2010",
    status_setting_date: "12.10.2010",
  },
  {
    id: 2,
    name: "Петров Петр Петрович",
    email: "bbb@mail.ru",
    status: "Одобрен",
    application_date: "10.10.2010",
    status_setting_date: "12.10.2010",
  },
  {
    id: 3,
    name: "Олегов Олег Олегович",
    email: "ccc@mail.ru",
    status: "Отклонен",
    application_date: "10.10.2010",
    status_setting_date: "12.10.2010",
  }
]

const week = [ 'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ]

const month = ['Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь']

const RequestRegistry = () => {
  const [data, setData] = useState(dataTable)

  const onSearch = (debounce(useCallback((value) => {
    if (value) {
      setData(dataTable.filter(({name, email}) => name.toLowerCase().includes(value) || email.toLowerCase().includes(value)))
    } else {
      setData(dataTable)
    }
  }, []), 250))

  const onSelect = (value) => {
    if (value !== undefined) {
      setData(dataTable.filter(({status}) => status === value ))
    } else {
      setData(dataTable)
    }
  };

  const onSelectDateSubmissionRequest = (value) => {
    console.log(value)
    const startDate = value[0]._d
    const endDate = value[1]._d
    console.log(startDate, endDate)
  };

  const onSelectDateApprovalRequest = (value) => {
    console.log(value)
    const startDate = value[0]._d
    const endDate = value[1]._d
    console.log(startDate, endDate)
  };
  return (
    <>
      <div className="flex mb-5 justify-between">
        <Input.Search
          enterButton
          allowClear
          placeholder="Введите текст для поиска"
          style={{width: 240, marginRight: "10px"}}
          onChange={(e) => onSearch(e.target.value)}
        />
        <Select
          style={{width: 230, marginRight: "10px"}}
          allowClear
          placeholder="Поиск по статусу"
          optionFilterProp="children"
          onChange={onSelect}
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        >
          <Option value="Активен">Активен</Option>
          <Option value="Одобрен">Одобрен</Option>
          <Option value="Отклонен">Отклонен</Option>
        </Select>
        <div>
          <span>Диапазон дат подачи запроса: </span>
          <ConfigProvider locale={ru_RU}>
            <DatePicker.RangePicker
              locale={{
                lang: {
                  locale: 'en',
                  dayFormat: moment.updateLocale('en', {
                    weekdaysMin: week,
                    monthsShort: month,
                    week: {dow: 1}
                  }),
                }
              }}
              placeholder={["Начало", "Конец"]}
              style={{width: 230,}}
              onChange={onSelectDateSubmissionRequest}
            />
          </ConfigProvider>
        </div>
        <div className="ml-5">
          <span>Диапазон дат согласования запроса: </span>
          <ConfigProvider locale={ru_RU}>
            <DatePicker.RangePicker
              locale={{
                lang: {
                  locale: 'en',
                  dayFormat: moment.updateLocale('en', {
                    weekdaysMin: week,
                    monthsShort: month,
                    week: {dow: 1}
                  }),
                }
              }}
              placeholder={["Начало", "Конец"]}
              style={{width: 230,}}
              onChange={onSelectDateApprovalRequest}
            />
          </ConfigProvider>
        </div>
      </div>
      <AppList
        settings={RequestRegistryConfig}
        data={data}
        nestedKey="data"
      />
    </>
  );
};

export default RequestRegistry;
