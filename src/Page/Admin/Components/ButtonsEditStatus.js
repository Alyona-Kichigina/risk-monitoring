import React, {useCallback} from 'react';
import {GreenButton, PinkButton} from "../../../Components/Buttons";
import {message} from "antd";

// надо получить айди и фио, чтобы формировать запрос
const ButtonsEditStatus = ({data}) => {
  // уходит запрос, в ответе приходит статус и список обновленный
  const approveStatus = useCallback(() => {
    message.success('Вы одобрили запрос', 1);
  }, [])

  const rejectStatus = useCallback(() => {
    message.success('Вы отклонили запрос', 1);
  }, [])
  return (
    <div>
      {data === "Активен" && (
          <div className="flex">
            <GreenButton
              className="mr-3"
              onClick={approveStatus}
            >
              Одобрить
            </GreenButton>
            <PinkButton
              onClick={rejectStatus}
            >
              Отклонить
            </PinkButton>
          </div>
        )}
    </div>
  );
};

export default ButtonsEditStatus;
