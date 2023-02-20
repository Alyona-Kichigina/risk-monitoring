import React, {useEffect, useContext} from "react"
import PropTypes from "prop-types"
import { TabBarContainer, NameUser, TabButton, AlertAndUserInfoContainer } from "./styles"
import { FiLogOut } from "react-icons/fi";
import {useLocation, useNavigate} from "react-router-dom";
import {TokenContext, UserIsAdminContext} from "../../constants";

const TabBar = ({ className, children, userName }) => {
  const navigate = useNavigate();
    const userIsAdmin = useContext(UserIsAdminContext)
    let location = useLocation();
    const {dropToken} = useContext(TokenContext)

  return (
    <TabBarContainer className={`flex flex-min-with pl-1.5 pr-2.5 w-full ${className} justify-between items-center`}>
        <div className="flex items-center">
            {userIsAdmin && location.pathname !== "/admin" &&
                <div
                    className="ml-5 link"
                    onClick={() => navigate("/admin")}
                >
                    Админ. панель
                </div>
            }
        </div>
      {children}
      <div className="ml-auto flex items-center">
        <NameUser className="pr-4">
            {userName}
        </NameUser>
        <FiLogOut
            className="ml-4 color-light-blue-2"
          size={18}
          onClick={dropToken}
        />
      </div>
    </TabBarContainer>
  )
}

TabBar.propTypes = {
  className: PropTypes.string,
    userName: PropTypes.string,
}

TabBar.defaultProps = {
  className: "",
    userName: "",
};

export default React.memo(TabBar)
