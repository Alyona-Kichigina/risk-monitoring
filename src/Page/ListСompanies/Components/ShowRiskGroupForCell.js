import React, {useMemo} from 'react';
import {StyleCell} from "./style";
import {
    RiskGroup, BankruptcyLiquidation, ChangingPowerConsumption, EmployeeLayoffsExpected,
    NumberNegativeNews, BalanceDepartedPersonnel, ShareReleasedStaff
} from "./ConfigForRiskGroup"

const ShowRiskGroupForCell = ({value, id, symbol}) => {
    const Color = useMemo(() => {
        switch (id) {
            case "risk_group":
                return RiskGroup(value)
            break;
            case "bankruptcy_liquidation":
                return BankruptcyLiquidation(value)
            break;
            case "number_negative_news":
                return NumberNegativeNews(value)
            break;
            case "changing_power_consumption":
                return ChangingPowerConsumption(value)
            break;
            case "balance_departed_personnel":
                return BalanceDepartedPersonnel(value)
            break;
            case "share_released_staff":
                return ShareReleasedStaff(value)
            break;
            case "employee_layoffs_expected":
                return EmployeeLayoffsExpected(value)
            break;
        }
    }, [value, id])
    return (
        <div className={`color-${Color} font-bold`}>
            {value}{value ? symbol : ""}
        </div>
    );
};

export default ShowRiskGroupForCell;