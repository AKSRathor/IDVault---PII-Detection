import React from 'react'
import { Input, Modal, Skeleton } from 'antd';
import { Button, Flex } from 'antd';
import { useState } from 'react';
import UrlModal from './UrlModal';


const GCPLoader = ({isLoaded, setModal2Open, setIsLoaded, setMyReponse, fetchInfo}) => {
  const [dbModal, setDbModal] = useState(false)
  const [loadings, setLoadings] = useState([]);
  const [textValue, setTextValue] = useState('127.0.0.1');
  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

  };
  const handleClick = async () => {
    setIsLoaded(false)
    setDbModal(true)
    console.log(textValue)
  }
  return (
    <div className='gap-10 flex-col flex'>
      <Modal
        title="MySQL Connection"
        centered
        open={dbModal}
        onOk={() => setDbModal(false)}
        width={"95vw"}
        maxheight={"95vh"}
        style={{ overflowX: "auto" }}
      >
        {!isLoaded ? (<div><UrlModal setModal2Open = {setModal2Open} setIsLoaded = {setIsLoaded} setMyReponse = {setMyReponse} fetchInfo = {fetchInfo} urlHost = {textValue}/></div>) : (
          <div className='flex flex-col gap-4'>
            <Skeleton active paragraph={{
              rows: 6,
            }}
            />
            <Skeleton active paragraph={{
              rows: 3,
            }}

            />
          </div>
        )}
      </Modal>
      <Input onChange={handleTextChange} placeholder="Enter Your Valid GCP URL" />
      <Button loading={loadings[2]}
        onClick={handleClick} className='w-40' type="primary">Search Database</Button>
    </div>
  )
}

export default GCPLoader