import React from 'react';
import {Wrapper} from "./style"
import {Button} from "antd";
import {useNavigate} from "react-router-dom";

const Card = ({data}) => {
  const {name, id} = data
  const navigate = useNavigate();
  return (
    <Wrapper>
      {name}
      <Button
        type="primary"
        onClick={() => navigate("/tab/analysis")}
      >
        Открыть
      </Button>
    </Wrapper>
  );
};

export default Card;
