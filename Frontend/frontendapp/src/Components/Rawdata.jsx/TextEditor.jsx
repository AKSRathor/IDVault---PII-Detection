import React from 'react'
import { Input } from 'antd';
import { Button, Flex } from 'antd';
import { useState } from 'react';
import Loadedview from '../Afterview/Loadedview';
const { TextArea } = Input;

const fetchInof = async (data) => {
    // const myobj = {
    //     "document_content": data,
    //     "add_pattern":[]
    // }
    // console.log(myobj)
    const response = await fetch(`http://127.0.0.1:5000/traversedocall`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      let xr = await response.json()
      return xr
    
}
const TextEditor = () => {
    const [loadings, setLoadings] = useState([]);
    const [textValue, setTextValue] = useState(''); 
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
    const handleClick = async() => {
        enterLoading(2);
        let myval = await JSON.parse(textValue)
        // for(let i = 0; i<myval["document_content"].length; i++){
        //     let myobj = myval["document_content"][i]
        //     for(let key in myobj){
        //         myobj[key] = {"real_text":myobj[key], "pii": await fetchInof(key+" "+myobj[key])}
        //         myval["document_content"][i] = myobj
        //     }
        // }
        let mtext = await fetchInof(myval)
        console.log(mtext)
    }
  return (
    <div className='gap-10 flex-col flex'>
      {/* <Loadedview/> */}
        <TextArea rows={15} value={textValue} onChange={handleTextChange} />
        <Button loading={loadings[2]}
          onClick={handleClick } className='w-40' type="primary">Start Detection</Button>
    </div>
  )
}

export default TextEditor