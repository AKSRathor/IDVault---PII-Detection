import React, { useEffect, useState } from 'react'
import { Segmented } from 'antd';
import {GoogleOutlined} from '@ant-design/icons';
import GCPLoader from './UrlLoader/GCPLoader';
import AWSLoader from './UrlLoader/AWSLoader';
import TextEditor from './TextEditor';
import CreateTable from './TableCreator/CreateTable';
const GcpLogo = ()=>{
  return <svg height="15" preserveAspectRatio="xMidYMid" viewBox="0 0 256 206" width="15" xmlns="http://www.w3.org/2000/svg"><path d="m170.2517 56.8186 22.253-22.253 1.483-9.37c-40.551-36.873-105.012-32.692-141.567 8.724-10.154 11.503-17.687 25.844-21.704 40.653l7.97-1.123 44.505-7.339 3.436-3.514c19.797-21.742 53.27-24.667 76.128-6.168z" /><path d="m224.2048 73.9182c-5.115-18.836-15.616-35.769-30.217-48.722l-31.232 31.232c13.188 10.776 20.701 27.01 20.379 44.037v5.544c15.351 0 27.797 12.445 27.797 27.796 0 15.352-12.446 27.485-27.797 27.485h-55.671l-5.466 5.934v33.34l5.466 5.231h55.671c39.93.311 72.552-31.494 72.863-71.424.188-24.203-11.745-46.893-31.793-60.453"/><path d="m71.8704 205.7957h55.593v-44.506h-55.593c-3.961-.001-7.797-.852-11.399-2.498l-7.887 2.42-22.409 22.253-1.952 7.574c12.567 9.489 27.9 14.825 43.647 14.757"/><path d="m71.8704 61.4255c-39.931.238-72.107 32.802-71.869 72.732.133 22.298 10.547 43.288 28.222 56.881l32.248-32.247c-13.991-6.321-20.208-22.786-13.887-36.776 6.32-13.99 22.786-20.207 36.775-13.887 6.165 2.785 11.102 7.723 13.887 13.887l32.248-32.247c-13.721-17.937-35.041-28.424-57.624-28.343"/></svg>
}
const AWSLogo = ()=>{
  return <svg height="25" preserveAspectRatio="xMidYMid" width="25"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M180.4 203c-.7 22.7 10.6 32.7 10.9 39.1a8.2 8.2 0 0 1 -4.1 6.3l-12.8 9a10.7 10.7 0 0 1 -5.6 1.9c-.4 0-8.2 1.8-20.5-25.6a78.6 78.6 0 0 1 -62.6 29.5c-16.3 .9-60.4-9.2-58.1-56.2-1.6-38.3 34.1-62.1 70.9-60.1 7.1 0 21.6 .4 47 6.3v-15.6c2.7-26.5-14.7-47-44.8-43.9-2.4 0-19.4-.5-45.8 10.1-7.4 3.4-8.3 2.8-10.8 2.8-7.4 0-4.4-21.5-2.9-24.2 5.2-6.4 35.9-18.4 65.9-18.2a76.9 76.9 0 0 1 55.7 17.3 70.3 70.3 0 0 1 17.7 52.4l0 69.3zM94 235.4c32.4-.5 46.2-20 49.3-30.5 2.5-10.1 2.1-16.4 2.1-27.4-9.7-2.3-23.6-4.9-39.6-4.9-15.2-1.1-42.8 5.6-41.7 32.3-1.2 16.8 11.1 31.4 30 30.5zm170.9 23.1c-7.9 .7-11.5-4.9-12.7-10.4l-49.8-164.7c-1-2.8-1.6-5.7-1.9-8.6a4.6 4.6 0 0 1 3.9-5.3c.2 0-2.1 0 22.3 0 8.8-.9 11.6 6 12.6 10.4l35.7 140.8 33.2-140.8c.5-3.2 2.9-11.1 12.8-10.2h17.2c2.2-.2 11.1-.5 12.7 10.4l33.4 142.6L421 80.1c.5-2.2 2.7-11.4 12.7-10.4h19.7c.9-.1 6.2-.8 5.3 8.6-.4 1.9 3.4-10.7-52.8 169.9-1.2 5.5-4.8 11.1-12.7 10.4h-18.7c-10.9 1.2-12.5-9.7-12.7-10.8L328.7 110.7l-32.8 137c-.2 1.1-1.7 11.9-12.7 10.8h-18.3zm273.5 5.6c-5.9 0-33.9-.3-57.4-12.3a12.8 12.8 0 0 1 -7.8-11.9v-10.8c0-8.5 6.2-6.9 8.8-5.9 10 4.1 16.5 7.1 28.8 9.6 36.7 7.5 52.8-2.3 56.7-4.5 13.2-7.8 14.2-25.7 5.3-35-10.5-8.8-15.5-9.1-53.1-21-4.6-1.3-43.7-13.6-43.8-52.4-.6-28.2 25.1-56.2 69.5-56 12.7 0 46.4 4.1 55.6 15.6 1.4 2.1 2 4.6 1.9 7v10.1c0 4.4-1.6 6.7-4.9 6.7-7.7-.9-21.4-11.2-49.2-10.8-6.9-.4-39.9 .9-38.4 25-.4 19 26.6 26.1 29.7 26.9 36.5 11 48.7 12.8 63.1 29.6 17.1 22.3 7.9 48.3 4.4 55.4-19.1 37.5-68.4 34.4-69.3 34.4zm40.2 104.9c-70 51.7-171.7 79.3-258.5 79.3A469.1 469.1 0 0 1 2.8 327.5c-6.5-5.9-.8-14 7.2-9.5a637.4 637.4 0 0 0 316.9 84.1 630.2 630.2 0 0 0 241.6-49.6c11.8-5 21.8 7.8 10.1 16.4zm29.2-33.3c-9-11.5-59.3-5.4-81.8-2.7-6.8 .8-7.9-5.1-1.8-9.5 40.1-28.2 105.9-20.1 113.4-10.6 7.6 9.5-2.1 75.4-39.6 106.9-5.8 4.9-11.3 2.3-8.7-4.1 8.4-21.3 27.4-68.5 18.4-80z"/></svg>
}

const RawHandler = ({fetchInfo, modal2Open, setModal2Open, isLoaded, setIsLoaded, myReponse, setMyReponse}) => {
  const [getValue, setGetValue] = useState("GCP")


  return (
    <div className='flex-col gap-5 flex'>
      <Segmented
        options={[
          { label:  <div className='flex justify-center items-center gap-2'><span>GCP</span> <GcpLogo/></div>, value: 'GCP' },
          { label: <div className='flex justify-center items-center gap-2 pt-1'><span></span> <AWSLogo/></div>, value: 'AWS' },
          { label: 'Raw JSON', value: 'Raw JSON' },
          { label: 'Create Table', value: 'Create Table' },
        ]}
        onChange={(value) => {
          setGetValue(value);
          console.log(value);
        }}
      />
      {getValue === "GCP" && <GCPLoader myReponse = {myReponse} setMyReponse = {setMyReponse} isLoaded = {isLoaded} setIsLoaded = {setIsLoaded} fetchInfo = {fetchInfo} modal2Open = {modal2Open} setModal2Open = {setModal2Open} />}
      {getValue === "AWS" && <AWSLoader myReponse = {myReponse} setMyReponse = {setMyReponse} isLoaded = {isLoaded} setIsLoaded = {setIsLoaded} fetchInfo = {fetchInfo} modal2Open = {modal2Open} setModal2Open = {setModal2Open} />}
      {getValue === "Raw JSON" && <TextEditor myReponse = {myReponse} setMyReponse = {setMyReponse} isLoaded = {isLoaded} setIsLoaded = {setIsLoaded} fetchInfo = {fetchInfo} modal2Open = {modal2Open} setModal2Open = {setModal2Open} />}
      {getValue === "Create Table" && <CreateTable myReponse = {myReponse} setMyReponse = {setMyReponse} isLoaded = {isLoaded} setIsLoaded = {setIsLoaded} fetchInfo = {fetchInfo} modal2Open = {modal2Open} setModal2Open = {setModal2Open} />}
    </div>

  )
}

export default RawHandler