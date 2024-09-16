import React, { useEffect, useState } from 'react';
import Loadedview from '../Afterview/Loadedview';
import { useNavigate } from 'react-router-dom'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    FileTextOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import UploadPage from '../UploadPage/Upload';
import TextEditor from '../Rawdata.jsx/TextEditor';
import AWSLoader from '../Rawdata.jsx/UrlLoader/AWSLoader';
import CreateTable from '../Rawdata.jsx/TableCreator/CreateTable';
import { Outlet } from 'react-router-dom';
const { Header, Sider, Content } = Layout;





const Upload = ({currentPage, setCurrentPage, fetchInfo, myReponse, setMyReponse, isLoaded, setIsLoaded, modal2Open, setModal2Open}) => {
    
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    useEffect(() => {
      console.log(currentPage)
    
      return () => {
   
      }
    }, [])
    
    
    
    return (
        <div className='h-screen'>
            <Loadedview isLoaded = {isLoaded} setIsLoaded = {setIsLoaded} myReponse = {myReponse} modal2Open = {modal2Open} setModal2Open = {setModal2Open}/>
            <Layout className='h-screen'>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[currentPage]}
                        items={[
                            {
                                key: '1',
                                icon: <UserOutlined />,
                                label: 'Account',
                                onClick: () => {setCurrentPage('1');navigate("../")}
                            },
                            {
                                key: '2',
                                icon: <FileTextOutlined />,
                                label: 'Raw Data',
                                color:'red',
                                onClick: () => {setCurrentPage('2'); navigate("rawhandler")}
                            },
                            {
                                key: '3',
                                icon: <UploadOutlined />,
                                label: 'Upload Doc',
                                onClick: () => {setCurrentPage('3'); navigate("handleupload")}
                            },
                        ]}
                    />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >
                        <Button
                            type="text"
                            
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet/>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default Upload
