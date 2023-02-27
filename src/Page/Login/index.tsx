import React from 'react';
import { Button, Form, Input } from 'antd';
import {PageContainer, ContentContainer, FormContainer} from "./styles"
import {useNavigate} from "react-router-dom";

const Login = ( loginRequest: any ) => {
  const navigate = useNavigate();

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <PageContainer className="w-full bg-color-light-blue-2">
      <ContentContainer>
        <FormContainer>
          <Form
            name="basic"
            layout="vertical"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={loginRequest}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Введите ваш Email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true, message: 'Введите ваш пароль!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Войти
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center">
            <div className="link inline" onClick={() => navigate("/registration")}>
              Зарегистрироваться
            </div>
          </div>
        </FormContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default Login;
