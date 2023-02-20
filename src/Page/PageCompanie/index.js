import React, {useContext, useState, useEffect, useCallback, useMemo} from 'react';
import { useParams, NavLink } from "react-router-dom"
import {
    ApiContext,
    CHECK_COMPANY,
    COMPANY,
    LIST_COMMENTS,
    UserIdContext,
} from "../../constants";
import {Button, Input, Breadcrumb } from 'antd';

const { TextArea } = Input;

const PageCompanie = () => {
    const api = useContext(ApiContext)
    const [data, setData] = useState([])
    const [showTextarea, setShowTextarea] = useState(false)
    const [comment, setComment] = useState("")
    const [listComment, setListComment] = useState([])
    const [loading, setLoading] = useState(false)
    const userId = useContext(UserIdContext)

    const {idCompany} = useParams()

    useEffect(() => {
        // getListCompanies()
        // getListComments()
    }, [])

    useEffect(() => {
        const {risk_comment} = data
        setComment(risk_comment)
    }, [data])

    const getListCompanies = async () => {
        try {
            const {data} = await api.get(COMPANY,
                {params: {company_id: idCompany}})
            setData(data)
        } catch (e) {
            console.log(e)
        }
    }

    const getListComments = async () => {
        try {
            const {data} = await api.get(LIST_COMMENTS,
                {params: {company_id: idCompany}})
            setListComment(data)
        } catch (e) {
            console.log(e)
        }
    }

    const editComment = useCallback(() => {
        setShowTextarea(true)
    }, [])

        // добавить перезагрузку страницы после изменения комментария
    const sendComment = useCallback(async () => {
        try {
            setLoading(true)
            // await api.post(CHECK_COMPANY,
            // {
            //         company_id: idCompany,
            //         check_comment: comment,
            //         author_id: userId
            //     })
            setLoading(false)
            getListCompanies()
        } catch (e) {
            console.log(e)
        }
        }, [comment])

    const closeTextarea = useCallback(() => {
        setShowTextarea(false)
    }, [])

  return (
      <>
          <div className="mt-5 ml-5 mr-5">
              <Breadcrumb>
                  <Breadcrumb.Item>
                      <NavLink to="/tab/">
                          Главная
                      </NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>{data?.name_company}</Breadcrumb.Item>
              </Breadcrumb>
          </div>
          <div className="pr-5 pl-5 pb-5 flex-container">
              <div className="bg-white pr-5 pl-5 pb-5 pt-5 mt-5">
                  <div className="pb-2">
                      <span className="color-light-blue-2 pr-1">
                          ИНН:
                      </span>
                       {data?.inn_company}
                  </div>
                  <div className="pb-2">
                      <span className="color-light-blue-2 pr-1">
                          Название:
                      </span>
                       {data?.name_company}
                  </div>
                  <div className="pb-2">
                      <span className="color-light-blue-2 pr-1">
                          ОПК:
                      </span>
                      {data?.is_opk}
                  </div>
                  <div className="pb-2">
                      <span className="color-light-blue-2 pr-1">
                          Телефон:
                      </span>
                      {data?.phone}
                  </div>
                  <div className="pb-4">
                      <span className="color-light-blue-2 pr-1">
                          Email:
                      </span>
                      {data?.email}
                  </div>
                  <div className="pb-2">
                      <span className="color-light-blue-2 pr-1">
                      Банкротство/Ликвидация:
                  </span>
                      {data?.bankruptcy_liquidation}
                  </div>
                  <div className="pb-2">
                      <span className="color-light-blue-2 pr-1">
                          Кол-во негативных новостей:
                      </span>
                      {data?.number_negative_news}</div>
                  <div className="pb-2">
                      <span className="color-light-blue-2 pr-1">
                          Изменение энергопотребления:
                      </span>
                      {data?.changing_power_consumption}%</div>
                  <div className="pb-2">
                      <span className="color-light-blue-2 pr-1">
                          Сальдо убывшего персонала:
                      </span>
                      {data?.balance_departed_personnel}</div>
                  <div className="pb-2">
                      <span className="color-light-blue-2 pr-1">
                          Доля высвободившегося персонала:
                      </span>
                      {data?.share_released_staff}%</div>
                  <div className="pb-2">
                      <span className="color-light-blue-2 pr-1">
                          Количество работников, предполагаемых к увольнению:
                      </span>
                      {data?.employee_layoffs_expected}</div>
                  <div className="pb-2">
                      <span className="color-light-blue-2 pr-1">
                          Группа риска:
                      </span>
                      {data?.risk_group}</div>
                  <div className="pb-2">
                      <span className="color-light-blue-2 pr-1">
                          Проверка риска:
                      </span>
                      {data?.risk_check}</div>
                  <div className="">
                      <span className="color-light-blue-2 pr-1">
                          Комментарий по риску:
                      </span>
                      {data?.risk_comment}
                  </div>
                  <div>
                      {!showTextarea && (
                          <div
                              className="link inline-block"
                              onClick={editComment}
                          >
                              {comment?.length > 0 ? "Изменить" : "Добавить"} комментарий
                          </div>
                      )}
                  </div>
                  {/*!comment?.length*/}
                  {(showTextarea) && (
                      <div className="mt-4">
                          <TextArea
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Введите текст комментария"
                              autoSize
                          />
                          <div className="flex mt-5">
                              <Button
                                  type="primary"
                                  className="mr-2"
                                  onClick={sendComment}
                                  loading={loading}
                              >
                                  Отправить
                              </Button>
                              <Button
                                  onClick={closeTextarea}
                              >
                                  Отменить
                              </Button>
                          </div>
                      </div>
                  )}
              </div>
          </div>
      </>
  );
};

export default PageCompanie;
