import React from 'react'

export const DEFAULT_URL = "http://172.16.65.106:5000"

export const URL_LOGIN = "login"
export const URL_USER = "user"
export const LIST_COMPANIES = "list_companies"
export const COMPANY = "get_company"
export const CHECK_COMPANY = "check_company"
export const UPLOAD_FILE = "upload_file"
export const LIST_COMMENTS = "get_comments"
export const EXPORT_TABLE = "export_risks"

export const UserIsAdminContext = React.createContext(false)
export const UserIdContext = React.createContext(0)

export const TokenContext = React.createContext({
    token: "",
    dropToken: () => null
})

export const ApiContext = React.createContext(() => null)
