import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { Button, Modal, Tooltip, Typography, List, Skeleton } from 'antd';
import { PieChart, Pie, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

const { Title } = Typography;
const tableDiv = (mytext, mypii) => {
    return (<Tooltip title={mypii}>
        <span className='text-red-700 font-bold underline'>{mytext}</span>
    </Tooltip>)
}

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        showSorterTooltip: {
            target: 'full-header',
        },
        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'Jim',
                value: 'Jim',
            },
            {
                text: 'Submenu',
                value: 'Submenu',
                children: [
                    {
                        text: 'Green',
                        value: 'Green',
                    },
                    {
                        text: 'Black',
                        value: 'Black',
                    },
                ],
            },
        ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Age',
        dataIndex: 'age',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        filters: [
            {
                text: 'London',
                value: 'London',
            },
            {
                text: 'New York',
                value: 'New York',
            },
        ],
        onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: (tableDiv()),
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];
const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};


const Getload = ({myReponse}) => {

    const [colVal, setColVal] = useState(columns)
    const [rowVal, setRowVal] = useState(data)
    const [uniquePii, setUniquePii] = useState(new Map([]))
    const [countValPie, setCountValPie] = useState([{ "name": "", value: 40 }])
    useEffect(() => {

        const start_insertion_row = () => {
            let tempcol = []
            for (let i = 0; i < Object.keys(myReponse[0]).length; i++) {

                tempcol.push({ title: Object.keys(myReponse[0])[i], dataIndex: Object.keys(myReponse[0])[i] })
            }
            setColVal(tempcol)
            console.log(tempcol)
        }
        const start_insert_column = () => {
            let tempdata = []
            for (let i = 0; i < myReponse.length; i++) {
                let tempobj = {}
                for (let j = 0; j < Object.keys(myReponse[i]).length; j++) {
                    let key = Object.keys(myReponse[i])[j]
                    if (myReponse[i][key]["pii"] != "NAP") {
                        tempobj[key] = tableDiv(myReponse[i][key]["real_text"], myReponse[i][key]["pii"])
                    }
                    else {

                        tempobj[key] = myReponse[i][key]["real_text"]
                    }
                }
                tempdata.push(tempobj)
            }
            setRowVal(tempdata)
            console.log(tempdata)
        }
        start_insertion_row()
        start_insert_column()
        let alluniquepii = new Map();

        for (let i = 0; i < myReponse.length; i++) {
            for (let j = 0; j < Object.keys(myReponse[i]).length; j++) {
                let key = Object.keys(myReponse[i])[j];
                let piiValue = myReponse[i][key]["pii"];
                let realText = myReponse[i][key]["real_text"];

                if (piiValue != "NAP") {
                    if (!alluniquepii.has(piiValue)) {
                        alluniquepii.set(piiValue, []);
                    }
                    alluniquepii.get(piiValue).push(realText);
                }
            }
        }
        console.log(Array.from(alluniquepii.values()))
        setUniquePii(alluniquepii)

        let countValTemp = []

        for (let i = 0; i < Array.from(alluniquepii.keys()).length; i++) {
            countValTemp.push({ name: Array.from(alluniquepii.keys())[i], value: Array.from(alluniquepii.values())[i].length })
        }
        setCountValPie(countValTemp)

        return () => {

        }
    }, [])


    return (
        <div>
            <><Table
                columns={colVal}
                dataSource={rowVal}
                onChange={onChange}
                showSorterTooltip={{
                    target: 'sorter-icon',
                }}
            />
                <Title level={5}>Unique Personally Identifiable Information List</Title>
                <div>
                    <ol className='flex flex-col gap-3'>
                        {/* {Array.from(uniquePii).map((item, index) => {
                            return <li key={index}>{item}</li>
                        })} */}
                        <List
                            itemLayout="horizontal"
                            dataSource={Array.from(uniquePii.keys())}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        // avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                        title={<a>{item}</a>}
                                        description={uniquePii.get(item).join(", ")}
                                    />
                                </List.Item>
                            )}
                        />
                    </ol>
                </div>
                <div className='flex flex-col pt-5'>
                    <Title level={5}>PII Pie Chart Visualisation</Title>
                    <PieChart width={730} height={250}>

                        <Pie data={countValPie} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                        <RechartsTooltip />
                    </PieChart>
                </div>
            </>
        </div>
    )
}

export default Getload