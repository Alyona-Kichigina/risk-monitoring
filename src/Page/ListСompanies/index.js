import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import Handsontable from 'handsontable';
import { HotTable, HotColumn } from "@handsontable/react";
import TextLink from "./Components/TextLink"
import debounce from "../../Utils/debounce";
import { registerAllModules } from 'handsontable/registry';
import {EXPORT_TABLE, LIST_COMPANIES, ApiContext} from "../../constants";
import ShowRiskGroupForCell from "./Components/ShowRiskGroupForCell";
import {settings} from "./fieldMap";
import ModalDownload from "./ModalDownload";
import ButtonsForListCompanies from "./ButtonsForListCompanies";
import {dataTable} from "./dataTable"

registerAllModules();


const ListСompanies = () => {
    const api = useContext(ApiContext)
  const setTableRef = useRef(null)
    const [hot, setHot] = useState(null)
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setHot(setTableRef.current.hotInstance)
        // getListCompanies()
        setData(dataTable)
    }, [])

    const getListCompanies = async () => {
        try {
            const {data} = await api.get(LIST_COMPANIES)
            setData(data)
        } catch (e) {
            console.log(e)
        }

    }

    const onSearch = (debounce(useCallback((value) => {
        (async () => {
            try {
                // const {data} = await api.get(LIST_COMPANIES, {
                //     params: {filter_value: value}
                // })
                const data = []
                setData(data)
            } catch (e) {
                console.log(e)
            }
        })()
    }, []), 250 ))

    const downloadData = useCallback(() => {
        setOpen(true)
    }, [])

    const exportTable = async () => {
        try {
            // const {data} = await api.get(EXPORT_TABLE)
            console.log(data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
    <div className="pt-5 flex-container">
        <ModalDownload
            open={open}
            close={() => setOpen(false)}
        />
        <ButtonsForListCompanies
            onSearch={onSearch}
            downloadData={downloadData}
            exportTable={exportTable}
        />
        <HotTable
            settings={settings}
            licenseKey='non-commercial-and-evaluation'
            data={data}
            // rowHeaders={true}
            width="100%"
            height="100%"
            ref={setTableRef}
            beforeColumnSort={async (currentSortConfig, destinationSortConfigs) => {
                if (destinationSortConfigs[0]?.column === 9) {
                    const columnSortPlugin = this.getPlugin('columnSorting');
                    columnSortPlugin.setSortConfig(destinationSortConfigs);
                    try {
                        const {data} = await api.get(LIST_COMPANIES, {
                            params: {
                                sort_col: "risk_group",
                                sort_asc: destinationSortConfigs[0]?.sortOrder === "asc"}
                        })
                        setData(data)
                    } catch (e) {
                        console.log(e)
                    }
                }
                return false;
            }}
        >
            <HotColumn
                data="id"
            />
            <HotColumn
                data="name_company"
                width="150%"
                title="Название"
            >
                <TextLink
                    hot-renderer
                    hot={hot}
                />
            </HotColumn>
            <HotColumn
                data="bankruptcy_liquidation"
                title="Банкротство<br>/Ликвидация"
            >
                <ShowRiskGroupForCell
                    id="bankruptcy_liquidation"
                    hot-renderer
                />
            </HotColumn>
            <HotColumn
                data="number_negative_news"
                title="Кол-во <br> негативных <br> новостей"
            >
                <ShowRiskGroupForCell
                    id="number_negative_news"
                    hot-renderer
                />
            </HotColumn>
            <HotColumn
                data="changing_power_consumption"
                title="Изменение<br>энергопотребления"
            >
                <ShowRiskGroupForCell
                    id="changing_power_consumption"
                    symbol="%"
                    hot-renderer/>
            </HotColumn>
            <HotColumn
                data="balance_departed_personnel"
                title="Сальдо <br>убывшего<br> персонала"
            >
                <ShowRiskGroupForCell
                    id="balance_departed_personnel"
                    hot-renderer/>
            </HotColumn>
            <HotColumn
                data="share_released_staff"
                title="Доля <br>высвободившегося<br> персонала"
            >
                <ShowRiskGroupForCell
                    id="share_released_staff"
                    symbol="%"
                    hot-renderer/>
            </HotColumn>
            <HotColumn
                data="employee_layoffs_expected"
                title="Количество<br> работников,<br> предполагаемых<br> к увольнению"
            >
                <ShowRiskGroupForCell
                    id="employee_layoffs_expected"
                    hot-renderer />
            </HotColumn>
            <HotColumn
                data="risk_group"
                width="110%"
                title="Группа <br>риска"
            >
                <ShowRiskGroupForCell
                    id="risk_group"
                    hot-renderer />
            </HotColumn>
            <HotColumn
                data="risk_comment"
                width="200%"
                title="Комментарий <br>по риску"
            />
        </HotTable>
    </div>
  );
};

export default ListСompanies;
