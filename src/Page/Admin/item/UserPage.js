import React, {useCallback, useState} from 'react';
import {Breadcrumb, Button, Form, Input, message, Modal} from "antd";
import {useNavigate, useParams, NavLink} from "react-router-dom";
import {PinkButton} from "../../../Components/Buttons";

const UserPage = () => {
  const {userId, userName} = useParams()
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate();

  const onFinish = async ({username, password, email}) => {
console.log(username, password, email)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const showModal = useCallback(() => {
    setOpenModal(true)
  }, [])

  const deleteUser = useCallback(() => {
    setOpenModal(false)
    message.success('Вы удалили пользователя', 1);
    navigate("admin")
  }, [])
  return (
    <>
      <Modal
        title=""
        centered
        open={openModal}
        onOk={() => deleteUser()}
        onCancel={() => setOpenModal(false)}
        cancelText="Закрыть"
        width={400}
      >
        Удалить пользователя?
      </Modal>
      <div className="pr-5 pl-5 pb-5 flex-container bg-color-light-grey">
        <div className="pt-5 pb-5 flex justify-between items-center">
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to="/tab/">
                Главная
              </NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <NavLink to="/admin/">
                Список пользователей
              </NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{userName}</Breadcrumb.Item>
          </Breadcrumb>
          <PinkButton
            onClick={showModal}
          >
            Удалить пользователя
          </PinkButton>
        </div>
        <div className="bg-white pr-5 pl-5 pb-5 pt-5">
          <Form
            name="basic"
            layout="vertical"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="ФИО"
              name="username"
            >
              <Input  defaultValue={userName}/>
            </Form.Item>
            <Form.Item
              label="E-mail"
              name="email"
              value={userName}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Пароль"
              name="password"
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UserPage;
