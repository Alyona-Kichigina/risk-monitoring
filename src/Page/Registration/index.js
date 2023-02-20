import React, {useState, useCallback} from 'react';
import {Button, Form, Input, message} from 'antd';
import {PageContainer, ContentContainer, FormContainer} from "../Login/styles"
import {useNavigate} from "react-router-dom";

const Registration = ({ onSubmit, initialRoute }) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const onFinish = async ({username, last_name, name, patronymic, email}) => {
    try {
      setLoading(true)
      message.success('Ваш запрос успешно отправлен', 1);
      navigate("/login")
      // вывести модальное окно с: Ваш запрос успешно отправлен
    } catch (e) {
      console.log("login error", e)
    } finally {
      setLoading(false)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <PageContainer className="w-full bg-color-light-blue-2">
      <ContentContainer>
        <FormContainer>
          <Form
            name="basic"
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Фамилия"
              name="last_name"
              rules={[{ required: true, message: 'Введите данные!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Имя"
              name="name"
              rules={[{ required: true, message: 'Введите данные!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Отчество"
              name="patronymic"
              rules={[{ required: true, message: 'Введите данные!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Почта"
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'Введите email!',
                },
                {
                  required: true,
                  message: 'Введите email!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/*<Form.Item*/}
            {/*  label="Пароль"*/}
            {/*  name="password"*/}
            {/*  rules={[{ required: true, message: 'Введите пароль!' }]}*/}
            {/*  hasFeedback*/}
            {/*>*/}
            {/*  <Input.Password />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item*/}
            {/*  label="Повторите пароль"*/}
            {/*  name="confirm"*/}
            {/*  dependencies={['password']}*/}
            {/*  hasFeedback*/}
            {/*  rules={[*/}
            {/*    {*/}
            {/*      required: true,*/}
            {/*      message: 'Введите пароль!',*/}
            {/*    },*/}
            {/*    ({ getFieldValue }) => ({*/}
            {/*      validator(_, value) {*/}
            {/*        if (!value || getFieldValue('password') === value) {*/}
            {/*          return Promise.resolve();*/}
            {/*        }*/}

            {/*        return Promise.reject(new Error('Два введенных вами пароля не совпадают'));*/}
            {/*      },*/}
            {/*    }),*/}
            {/*  ]}*/}
            {/*>*/}
            {/*  <Input.Password />*/}
            {/*</Form.Item>*/}

            <Form.Item wrapperCol={{ offset: 1, span: 1 }}>
              <Button type="primary" htmlType="submit">
                Отправить запрос на регистрацию
              </Button>
            </Form.Item>
          </Form>
        </FormContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default Registration;
