import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import CreateTable2 from './CreateTable2';
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



const EditableCell2 = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  hsave,
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
      hsave({
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


const CreateTable = ({fetchInfo, modal2Open, setModal2Open, isLoaded, setIsLoaded, myReponse, setMyReponse}) => {

  const processStep2 = () => {
    // let dynamicTableCol = []

    const dynamicTableCol = defaultCol2.map((col) => {
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
          hsave: (row) => {
            const newData = [...tableSource];
            console.log(newData)
            const index = newData.findIndex((item) => row.key === item.key);
            const item = newData[index];
            newData.splice(index, 1, {
              ...item,
              ...row,
            });
            setTableSource(newData);
          },
          // handleSave : (row) => {
          //   const newData = [...colSource];
          //   const index = newData.findIndex((item) => row.key === item.key);
          //   const item = newData[index];
          //   newData.splice(index, 1, {
          //     ...item,
          //     ...row,
          //   });
          //   setColSource(newData);
          // }
        
        }),
      };
    });

    // colSource.map((item) => {
    //   dynamicTableCol.push({
    //     title: item.name,
    //     dataIndex: item.name,
    //     width: '10%',
    //     editable: true,
    //     hsave: (row) => {
    //       const newData = [...tableSource];
    //       const index = newData.findIndex((item) => row.key === item.key);
    //       const item = newData[index];
    //       newData.splice(index, 1, {
    //         ...item,
    //         ...row,
    //       });
    //       setTableSource(newData);
    //     }
    //   })
    // })
    setDyanmicCol(dynamicTableCol)
    setTableStep(2)
    console.log(dynamicTableCol, columns)
  }

  const [colSource, setColSource] = useState([

  ]);
  const [defaultCol2, setDefaultCol2] = useState([

  ]);
  const [tableSource, setTableSource] = useState([

  ]);
  const [countCol, setCountCol] = useState(1);
  const [countTable, setCountTable] = useState(1);
  const [dyanmicCol, setDyanmicCol] = useState([{title:"", dataIndex:"", width:"", editable:true}])
  const handleDelete = (key) => {
    const newData = colSource.filter((item) => item.key !== key);
    setColSource(newData);
  };
  const defaultColumns = [
    {
      title: 'Column Names',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },

  ];
  const handleColumn = () => {
    console.log(colSource, columns)
    const newData = {
      key: countCol,
      name: `PII Column ${countCol}`,
      editable:true
    };
    const newData2 = {
      title: `PII Column ${countCol}`,
      dataIndex: `PII Column ${countCol}`,
      width: '10%',
      editable: true,
    };
    setDefaultCol2([...defaultCol2, newData2]);
    setColSource([...colSource, newData]);
    setCountCol(countCol + 1);
  };
  const handleTable = () => {
    console.log(tableSource)
    let tempdata = {};
    for(let i=0; i<colSource.length; i++){
      tempdata[colSource[i].name] = `${colSource[i].name} ${countTable}`
    }
    tempdata.key = countTable
    tempdata.editable = true;
    const newData = tempdata;
    // const newData = {
    //   key: countTable,
    //   "PII Column 1": `PII Column ${countTable}`,
    //   editable: true
    // };
    setTableSource([...tableSource, newData]);
    setCountTable(countTable + 1);
    // console.log(tableSource, colSource)
    console.log(dyanmicCol)
  };
  const handleSave = (row) => {
    const newData = [...colSource];
    console.log(newData)
    const newData2 = [...defaultCol2];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    newData2.splice(index, 1, {
      title: row.name,
      dataIndex: row.name,
      width: '10%',
      editable: true,
    });
    setColSource(newData);
    setDefaultCol2(newData2);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const components2 = {
    body: {
      row: EditableRow,
      cell: EditableCell2,
    },
  };
  const columns = defaultColumns.map((col) => {
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
  // const dyanmicCol = defaultColumns.map((col) => {
  //   if (!col.editable) {
  //     return col;
  //   }
  //   return {
  //     ...col,
  //     onCell: (record) => ({
  //       record,
  //       editable: col.editable,
  //       dataIndex: col.dataIndex,
  //       title: col.title,
  //       handleSave,
  //     }),
  //   };
  // });


  const [tableStep, setTableStep] = useState(1)
  return (
    <>{tableStep === 1 && (
   
    <div>
      <div>
        <Button
          onClick={handleColumn}
          style={{
            marginBottom: 16,
          }}
        >
          Add Columns
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={colSource}
          columns={columns}
        />
      </div>
      <div><Button type="primary" className='mt-4' onClick={processStep2}>Create Table</Button></div>
    </div>)}

    {tableStep === 2 && (
       <div><CreateTable2 myReponse = {myReponse} setMyReponse = {setMyReponse} isLoaded = {isLoaded} setIsLoaded = {setIsLoaded} modal2Open = {modal2Open} setModal2Open = {setModal2Open} fetchInfo = {fetchInfo} dyanmicCol = {dyanmicCol} tableSource = {tableSource} setTableSource = {setTableSource} setDyanmicCol = {setDyanmicCol} defaultCol2 = {defaultCol2} setDefaultCol2 = {setDefaultCol2} colSource = {colSource} setColSource = {setColSource}/></div>
    
  
  )}
    </>
  )
}

export default CreateTable