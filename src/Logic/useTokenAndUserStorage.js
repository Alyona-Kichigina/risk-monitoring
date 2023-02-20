import { useCallback, useEffect, useState } from 'react'
import { atom, useRecoilState } from 'recoil'
import {useLocation, useNavigate} from "react-router-dom";
import composeOrError from "../Utils/Fp/composeOrError";
import {useWatch} from "../Utils/Hooks/useWatch";

// задаем атом-состояние для юзера
export const userAtom = atom({ key: 'userAtom', default: null })

// получаем адрес текущей страницы
const initLocation = window.location.pathname !== "/login" ? window.location.pathname : "/"

const useTokenAndUserStorage = ({
  tokenKey = 'Authorization',
  authorizationRequest,
  userObjectRequest,
  addTokenToAxiosInstance
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [token, storeToken] = useState(null)
  const [userState, setUserState] = useRecoilState(userAtom)
  const [userObjectLoading, setLoadingStatus] = useState(true)

  // очищаем токен
  const dropToken = useCallback(() => {
    storeToken(null)
  }, [])

  const getUser = useCallback(async () => {
    try {
      setLoadingStatus(true)
      const userState = await userObjectRequest()
      setUserState(userState)
    } catch (e) {
      storeToken(null)
    } finally {
      setLoadingStatus(false)
    }
  }, [setUserState, userObjectRequest])

  // далем вход и сохраняем токен
  const loginRequest = useCallback(
    async (args) => {
      const token = await authorizationRequest(args)
      addTokenToAxiosInstance(token)
      storeToken(token)
      localStorage.setItem(tokenKey, token)
      navigate(initLocation)
      return token
    },
    [authorizationRequest, navigate, addTokenToAxiosInstance, tokenKey],
  )

  useWatch(token, (token, prevToken) => {
    if (token !== null) {
      if (userState === null) {
        getUser()
      }
    } else if (prevToken !== undefined) {
      setUserState(null)
      localStorage.removeItem(tokenKey)
    }
  })

// вычитываем токен
  useEffect(() => {
    const token = localStorage.getItem(tokenKey)
    if (token !== null) {
      storeToken(token)
      addTokenToAxiosInstance(token)
    } else {
      ;(async () => {
        try {
          const loginResult = await composeOrError(
            () =>
              // проверка на сохраненный пароль в браузере
              window.PasswordCredential
                ? true
                : new Error('no window PasswordCredential manager'),
            () =>
              location.pathname !== '/login'
                ? true
                : new Error('user at login path'),
            // получаем учетные данные для использования при логировании
            async () => {
              const credential = await window.navigator.credentials.get({
                password: true,
                mediation: 'optional',
              })
              return credential || new Error('no use credentials')
            },
            async (credential) => {
              try {
                await loginRequest({
                  email: credential.id,
                  password: credential.password,
                })
              } catch (e) {
                return e
              }
            },
          )()
          if (loginResult instanceof Error) {
            // ничего не грузим. т.к. по умолчанию приложение пытается что-то грузить снимаем флаг
            setLoadingStatus(false)
          }
        } catch (e) {
          // обработка исключений работы с браузером
          console.log(e, 'системная ошибка')
        }
      })()
    }
  }, [])
  return {
    userState,
    token,
    loginRequest,
    userObjectLoading,
    dropToken,
  }
}

export default useTokenAndUserStorage
