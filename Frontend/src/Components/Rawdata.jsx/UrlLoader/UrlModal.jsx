import React, { useState } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from '@ant-design/icons';
import { Button, message, Steps, theme, Input, Space, Select, Table } from 'antd';

const Step1 = ({ Username, setUsername, password, setPassword }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const handleUserChange = (e) => {
        setUsername(e.target.value);
    };
    const handlePassChange = (e) => {
        setPassword(e.target.value);
    };
    return (
        <div>
            <Space direction="horizontal" className='flex p-4 gap-2'>
                <Input onChange={handleUserChange} placeholder="Username" prefix={<UserOutlined />} />
                <Input.Password
                    onChange={handlePassChange}
                    placeholder="password"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Space>
        </div>

    );
}

const Step2 = ({ dbList, dbName, setDbName }) => {
    return (
        <div>
            <Select
                showSearch
                placeholder="Select Database"
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={dbList.map((db) => ({ label: db, value: db }))}
                onChange={(value) => {setDbName(value);console.log(value)}}
                value = {dbName}
            />
        </div>
    )
}

const Step3 = ({ tableList, setTableList, tableName, setTableName }) => {
    return (
        <div>
            <Select
                showSearch
                placeholder="Select Database"
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={tableList.map((db) => ({ label: db, value: db }))}
                onChange={(value) => {setTableName(value);console.log(value)}}
                value = {tableName}
            />
        </div>
    )
}

const Step4 = ({tableContent}) => {
    const columns = Object.keys(tableContent[0]).map((key) => {
        return {
            title: key,
            dataIndex: key,
            key: key
        }
    })
    const data =tableContent 
    // tableContent.map((item, index) => {
    //     return {
    //         ...item,
    //         key: index.toString()
    //     }
    // })

    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}


const UrlModal = ({ urlHost, setModal2Open, setIsLoaded, setMyReponse, fetchInfo }) => {
    const [username, setUsername] = useState("root")
    const [password, setPassword] = useState("password")
    const [dbName, setDbName] = useState("db_name")
    const [dbList, setDbList] = useState([])
    const [tableList, setTableList] = useState([])
    const [tableName, setTableName] = useState("table_name")
    const [tableContent, setTableContent] = useState([{"name" : "John Brown", "age" : 32, "address" : "New York No. 1 Lake Park"}])
    const steps = [
        {
            title: 'Connect Database',
            content: (<Step1 username={username} setUsername={setUsername} password={password} setPassword={setPassword} />),
        },
        {
            title: 'Select Database',
            content: (<Step2 dbName = {dbName} setDbName = {setDbName} dbList={dbList} />),
        },
        {
            title: 'Select Table',
            content: (<Step3 tableList={tableList} setTableList={setTableList} tableName = {tableName} setTableName = {setTableName}/>),
        },
        {
            title: 'View Table',
            content: (<Step4 tableContent = {tableContent} />),
        },
    ];
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);

    const next = async () => {
        const dbfetch = {
            host: urlHost,
            user: username,
            password: password
        }
        const response = await fetch(`http://127.0.0.1:5000/getalldatabases`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dbfetch)
        })
        let xr = await response.json()
        setDbList(xr)
        console.log(xr)
        await setCurrent(current + 1);
    };
    const next2 = async () => {
        const dbfetch = {
            host: urlHost,
            user: username,
            password: password,
            database:dbName
        }
        const response = await fetch(`http://127.0.0.1:5000/showalltables`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dbfetch)
        })
        let xr = await response.json()
        setTableList(xr)
        await setCurrent(current + 1);
    };
    const StartDetect = async () => {
        await setModal2Open(true)
        await setIsLoaded(false)
        const myfinaleObj ={
            "document_content": await tableContent,
            "add_pattern":[
                {
                    "name": "AADHAAR_ID",
                    "regex": "[2-9][0-9]{3}\\s[0-9]{4}\\s[0-9]{4}",
                    "score": 1
                },
                {
                    "name": "CVV",
                    "regex": "\\b\\d{3}\\b",
                    "score": 1
                },
                {
                    "name": "IP_V4",
                    "regex": "\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b",
                    "score": 1
                },
                {
                    "name": "DRIVING_LISCENCE",
                    "regex": "^((([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7})$",
                    "score": 1
                }
            ]
        }
        const myouput = await fetchInfo(myfinaleObj);
        await setMyReponse(myouput)
        await setIsLoaded(true)
    }
    const showTable = async () => {
        const dbfetch = {
            host: urlHost,
            user: username,
            password: password,
            database:dbName,
            table:tableName
        }
        const response = await fetch(`http://127.0.0.1:5000/showtable`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dbfetch)
        })
        let xr = await response.json()
        setTableContent(xr)
        console.log(xr)
        await setCurrent(current + 1);
    }
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));
    const contentStyle = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    return (
        <div><>
            <Steps current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
            <div
                style={{
                    marginTop: 24,
                }}
            >
                {current === 0 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )
                }
                {current === 1 && (
                    <Button type="primary" onClick={() => next2()}>
                        Next
                    </Button>
                )}
                {current === 3 && (
                    <Button type="primary" className = "mr-2"onClick={() => StartDetect()}>
                        Start Detection
                    </Button>
                )}
                {current === 2 && (
                    <Button onClick={() => showTable()}>
                        View Table
                    </Button>
                )}
            
                {current > 0 && (
                    <Button
                        style={{
                            margin: '0 8px',
                        }}
                        onClick={() => prev()}
                    >
                        Previous
                    </Button>
                )}
            </div>
        </></div>
    )
}

export default UrlModal