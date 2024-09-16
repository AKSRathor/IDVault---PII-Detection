import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingInlineEnd: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const CreateTable2 = ({fetchInfo, dyanmicCol, tableSource, setTableSource, setDyanmicCol, defaultCol2, setDefaultCol2, colSource, setColSource, modal2Open, setModal2Open, isLoaded, setIsLoaded, myReponse, setMyReponse}) => {
    useEffect(() => {
      console.log(dyanmicCol, tableSource, defaultCol2)
    
      return () => {
        
      }
    }, [])
    
  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      name: 'Edward King 0',
      age: '32',
      address: 'London, Park Lane no. 0',
    },
    {
      key: '1',
      name: 'Edward King 1',
      age: '32',
      address: 'London, Park Lane no. 1',
    },
  ]);
  const [count, setCount] = useState(1);
  const handleDelete = (key) => {
    const newData = tableSource.filter((item) => item.key !== key);
    setTableSource(newData);
  };
  const defaultColumns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
    },
    {
      title: 'address',
      dataIndex: 'address',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        tableSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleAdd = () => {

    let tempdata = {};
    for(let i=0; i<colSource.length; i++){
      tempdata[colSource[i].name] = `${colSource[i].name} ${count}`
    }
    tempdata.key = count
    tempdata.editable = true;
    const newData = tempdata;

    // const newData = {
    //   key: count,
    //   name: `Edward King ${count}`,
    //   age: '32',
    //   address: `London, Park Lane no. ${count}`,
    // };
    setTableSource([...tableSource, newData]);
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const newData = [...tableSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setTableSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultCol2.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

    const handleStartDetection = async() => {
        console.log(tableSource)
        await setModal2Open(true)
        await setIsLoaded(false)
        let tabSource = await tableSource
        for(let i=0; i<tabSource.length; i++){
            delete tabSource[i].key
            delete tabSource[i].editable
        }
        const myfinaleObj ={
            "document_content": await tabSource,
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
                // {
                //     "name": "IP_V6",
                //     "regex": "\\b(?:(?:[0-9a-fA-F]{1,4}:){7}(?:[0-9a-fA-F]{1,4}|:)|(?:(?:[0-9a-fA-F]{1,4}:){1,7}|(?:(?:[0-9a-fA-F]{1,4}:){1,6}|(?:(?:[0-9a-fA-F]{1,4}:){1,5}|(?:(?:[0-9a-fA-F]{1,4}:){1,4}|(?:(?:[0-9a-fA-F]{1,4}:){1,3}|(?:(?:[0-9a-fA-F]{1,4}:){1,2}|[0-9a-fA-F]{1,4})?)?)?)?)?)?([0-9a-fA-F]{1,4}|\\b))\\b",
                //     "score": 1
                // },
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
        console.log(myfinaleObj, "is the output")

    }

  return (
    <div>
      <Button
        onClick={handleAdd}
        
        style={{
          marginBottom: 16,
        }}
      >
        Add rows +
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={tableSource}
        columns={columns}
      />
      <div><Button type="primary" className='mt-4' onClick={handleStartDetection}>Start Detection</Button></div>
    </div>
  );
};
export default CreateTable2;