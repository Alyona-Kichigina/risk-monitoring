import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types"

const TextLink = ({value, row, col, hot}) => {
    const navigate = useNavigate();

    const idCompany = useMemo(() => {
        return hot?.getDataAtRow(row, col)[0]
    }, [hot, row, col])


    return (
        <span
            className="link"
            onClick={() => navigate(`/tab/company/${idCompany}`)}
        >
            {value}
        </span>
    );
};

TextLink.propTypes = {
    value: PropTypes.string,
    row: PropTypes.number,
    col: PropTypes.number,
    hot: PropTypes.object,
}

TextLink.defaultProps = {
    hot: {}
}

export default TextLink;
