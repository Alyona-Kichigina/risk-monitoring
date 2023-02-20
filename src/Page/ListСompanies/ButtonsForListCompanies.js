import React from 'react';
import {Button, Input} from "antd";

const ButtonsForListCompanies = ({onSearch, downloadData, exportTable}) => {
    return (
        <div className="flex justify-between">
            <div>
                <Input.Search
                    enterButton
                    placeholder="Введите текст для поиска"
                    onChange={(e) => onSearch(e.target.value)}
                    className="flex"
                    style={{
                        width: 230, marginBottom: "15px"
                    }}
                />
                <Button
                    className="ml-4"
                    type="primary"
                    onClick={downloadData}
                >
                    Загрузить данные
                </Button>
            </div>
            <Button
                className="ml-4"
                type="primary"
                onClick={exportTable}
            >
                Экспортировать реестр в Excel
            </Button>
        </div>
    );
};

export default ButtonsForListCompanies;