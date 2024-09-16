import React, { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Skeleton, Upload } from 'antd';



const UploadPage = ({setModal2Open, setIsLoaded, setMyReponse}) => {
    
    const props = {
        action: 'http://127.0.0.1:5000/getcsvtraversal',
        async onChange({ file, fileList }) {
            await setIsLoaded(false);
            await setModal2Open(true);
            await(setMyReponse([]))

            // if (file.status !== 'uploading') {
            //     console.log(file, fileList);
            // }
            if(file.status === 'done'){
                console.log(file.response)
                await setIsLoaded(true)
                await setMyReponse(file.response)
                
            }
        },
        
        defaultFileList: [
            // {
            //     uid: '1',
            //     name: 'xxx.png',
            //     status: 'uploading',
            //     url: 'http://www.baidu.com/xxx.png',
            //     percent: 33,
            // },
            // {
            //     uid: '2',
            //     name: 'yyy.png',
            //     status: 'done',
            //     url: 'http://www.baidu.com/yyy.png',
            // },
            // {
            //     uid: '3',
            //     name: 'zzz.png',
            //     status: 'error',
            //     response: 'Server Error 500',
            //     // custom error message to show
            //     url: 'http://www.baidu.com/zzz.png',
            // },
        ],
    };
   

    

    return (
        <div className=''>
            
            <h1 className=' p-10 font-bold text-lg'>Upload Section</h1>
            <Upload {...props} className='w-100 flex justify-center flex-col items-center gap-12'>
                <div className='flex gap-20 border-2 p-10 rounded-md border-dashed border-[#555]'>
                    <Button style={{width:"200px"}} className='h-[200px] w-[200px] font-bold border-[3px]' shape="circle" icon={<UploadOutlined style={{fontSize:"2em"}} className='text-[#555]'/>}></Button>
                    <div className='text-center h-auto text-lg pt-5 flex-col items-center justify-center flex'>
                        <h1>Upload your document</h1>
                        <p>Drag and drop your file here</p>
                        <p className='text-sm'>Available Formats: MySQL, CSV</p>
                    </div>

                </div>
            </Upload>

        </div>

    )
}

export default UploadPage