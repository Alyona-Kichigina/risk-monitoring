import {Navigate, Route, Routes, useNavigate} from "react-router-dom"
import {useCallback, useEffect, useLayoutEffect, useState, useMemo} from "react";
import Login from "./Page/Login";
import Main from "./Page/Main";
import Registration from "./Page/Registration";
import ListСompanies from "./Page/ListСompanies";
import PageCompanie from "./Page/PageCompanie";
import {authHeader, setHeader} from "./api";
import AdminPage from "./Page/Admin";
import useTokenStorage from "./Logic/useTokenAndUserStorage";
import createAxiosInstance from "./api";

import axios from "axios";
import {
  DEFAULT_URL,
  TokenContext,
  URL_LOGIN,
  URL_USER,
  UserIdContext,
  UserIsAdminContext,
  ApiContext
} from "./constants";
import UserPage from "./Page/Admin/item/UserPage";

const authorizationRequest = async (data) => {
  // const {data: {access_token}} = await axios.post(`${DEFAULT_URL}/${URL_LOGIN}`,
  //     data)
  const access_token = "45646sdafas"
  return access_token
}

function App() {
  const [axiosInstanceParams, updateAxiosInstanceParams] = useState({})

  const apiInstance = useMemo(
      () => createAxiosInstance(axiosInstanceParams)
  , [axiosInstanceParams])

  const userObjectRequest = useCallback(async () => {
    // const {data} = await apiInstance.get(URL_USER)
    const data = {
      is_admin: true,
      id: 1
    }
    return data
  }, [apiInstance])

  const {userState, loginRequest, userObjectLoading, token, dropToken} =
    useTokenStorage({
    authorizationRequest,
    userObjectRequest,
    addTokenToAxiosInstance: useCallback((token) =>
        updateAxiosInstanceParams({token}), [])
  })
  return (
    <div className="flex-container">
      <ApiContext.Provider value={apiInstance}>
        <UserIsAdminContext.Provider value={
          useMemo(() => (userState?.is_admin), [userState])
        }>
          <UserIdContext.Provider value={
            useMemo(() => (userState?.id), [userState])
          }>
            <TokenContext.Provider value={
              useMemo(() => ({token, dropToken}), [dropToken, token])
            }>
              <Routes>
                {userState === null ? (
                        <>
                          <Route
                              path='/login'
                              element={<Login loginRequest={loginRequest}/>}
                          />
                          <Route
                              path="/registration"
                              element={<Registration />}
                          />
                          {!userObjectLoading && (
                              <Route
                                  path="*"
                                  element={<Navigate to="/login" />}
                              />
                          )}
                        </>
                    )
                    : (
                        <Route element={<Main />}>
                          <Route
                              path="/tab/"
                              element={<ListСompanies />}
                          />
                          <Route
                              path="/tab/company/:idCompany"
                              element={<PageCompanie  />}
                          />
                          <Route
                              path="/admin"
                              element={<AdminPage />}
                          />
                          <Route
                              path="/user/:userId/:userName"
                              element={<UserPage />}
                          />

                          <Route
                              path="*"
                              element={<Navigate to="/tab" replace />}
                          />
                        </Route>
                    )}
              </Routes>
            </TokenContext.Provider>
          </UserIdContext.Provider>
        </UserIsAdminContext.Provider>
      </ApiContext.Provider>
    </div>
  );
}

export default App;
