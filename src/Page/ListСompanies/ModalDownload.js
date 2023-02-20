import React, {useMemo, useState, useContext, useCallback} from 'react';
import {message, Modal, Radio, Upload} from "antd";
import {BiFile} from "react-icons/bi";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {ApiContext, UPLOAD_FILE} from "../../constants";
import employeeStatsSample from './samples/Шаблон добавления данных по персоналу.xlsx';
import energyDataSample from './samples/Шаблон добавления энергопотребления.xlsx';

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        callback(reader.result)
    })
    reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        || file.type === "application/vnd.ms-excel";

    // ошибка на формат
    if (!isJpgOrPng) {
        message.error('Вы можете загрузить только Excel файл!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
// ошибка на объем
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
};


const arraySamles = [
    {
        id: 3,
        title: "Данные по персоналу",
        hrefSample: employeeStatsSample,
        idState: "employee_stats"
    },
    {
        id: 4,
        title: "Данные энергопотребления",
        hrefSample: energyDataSample,
        idState: "energy_data"
    },
]


const ModalDownload = ({open, close}) => {
    const api = useContext(ApiContext)
    const [imageUrl, setImageUrl] = useState();
    const [loading, setLoading] = useState(false);
    const [nameFile, setNameFile] = useState(null)
    const [value, setValue] = useState("");
    const [file, setFile] = useState(null)

    const customRequest = async ({file}) => {
        try {
            const {name} = file
            setFile(file)
            setNameFile(name)
            setLoading(false)
        } catch (e) {
            console.log(e)
        }
    };
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const urlUpload = useMemo(() => {
        return `${UPLOAD_FILE}?filetype=${value}`
    }, [value])

    const disabledUpload = useMemo(() => {
        return value.length > 0
    }, [value])

    const downloadFile = (async () => {
        try {
            if (file) {
                const FData = new FormData()
                FData.append("file", file)
                setLoading(true)
                // const {data: {status}} = await api.post(urlUpload, FData)
                const status = "success"
                if (status === "success") {
                    message.success('Файл успешно загружен', 2);
                } else {
                    message.success('Файл не загружен', 2);
                }
                closeModal()
                setLoading(false)
            }
        } catch (e) {
            console.log(e)
        }
    })

    const closeModal = () => {
        close()
        setValue("")
        setNameFile(null)
    }


    return (
        <Modal
            title=""
            centered
            open={open}
            onOk={downloadFile}
            onCancel={closeModal}
            cancelText="Отмена"
            okText="Загрузить"
        >
            <h2 className="text-center">Загрузить данные</h2>
            <div className="mb-5">
                {arraySamles.map(({id, title, idState, hrefSample}) => (
                    <div key={id}>
                        <Radio
                            value={value}
                            checked={value === idState}
                            onChange={(e) => setValue(idState)}
                        >
                            {title}
                        </Radio>
                        <a
                            href={hrefSample}
                            download={title}
                            className="link"
                        >
                            Скачать шаблон
                        </a>
                    </div>
                ))}
            </div>
            {nameFile ? (
                <div className="flex items-center">
                    <BiFile size="20" className="mr-2"/>{nameFile}
                </div>
            ) : (
                <Upload
                    disabled={!disabledUpload}
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    name="file"
                    customRequest={customRequest}
                >
                    <div className="w-full">
                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                        <div
                            style={{marginTop: 8,}}
                        >
                            Загрузить
                        </div>
                    </div>
                </Upload>
            )}
        </Modal>
    );
};

export default ModalDownload;
