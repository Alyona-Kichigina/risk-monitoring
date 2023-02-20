export const Red = "red"
export const Orange = "orange"
export const Yellow = "yellow"
export const Green = "green"

export const RiskGroup = (value) => {
    switch (value) {
        case "Высокий":
            return Red
            break;
        case "Средний":
            return Orange
            break;
        case "Низкий":
            return Green
            break;
    }
}
export const BankruptcyLiquidation = (value) => {
    if (value === "Ликвидация" || value === "Банкротство") {
        return Red
    }
}

export const NumberNegativeNews = (value) => {
    if (value >= 1) {
        return Orange
    }
}
export const ChangingPowerConsumption = (value) => {
    if (value < -10) {
        return Red
    } else if (value <= -5 && value >= -10) {
        return Orange
    } else if (value > -5 && value < 0) {
        return Green
    }
}

export const BalanceDepartedPersonnel = (value) => {
    if (value < -20) {
        return Red
    } else if (value <= -10 && value >= -20) {
        return Orange
    } else if (value > -10 && value < 0 ) {
        return Green
    }
}

export const EmployeeLayoffsExpected = (value) => {
    if (value > 20) {
        return Red
    } else if (value >= 10 && value <= 20) {
        return Orange
    } else if (value < 10 && value > 0) {
        return Green
    }
}

export const ShareReleasedStaff = (value) => {
    if (value > 10) {
        return Red
    } else if (value <= 10 && value >= 5) {
        return Orange
    } else if (value >= 0 ) {
        return Green
    }
}