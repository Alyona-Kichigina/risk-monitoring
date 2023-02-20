import React, {useMemo} from 'react';

const Status = ({data}) => {
  const colorStatus = useMemo(() => {
    switch (data) {
      case "Активен":
        return "color-blue"
        break;
      case "Одобрен":
        return "color-green"
        break;
      case "Отклонен":
        return "color-red"
        break;
    }
  }, [data])
  return (
    <div className={colorStatus}>
      {data}
    </div>
  );
};

export default Status;
