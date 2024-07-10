"use client";

import React, {ChangeEvent, FormEvent, useState} from 'react';
import axios from "axios";

interface UploadFormProps {
}

const UploadForm: React.FC<UploadFormProps> = () => {

    const [file, setFile] = useState<File | null>(null);
    const [targetDir, setTargetDir] = useState<string>('/home/alex/web/');

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };
    const handleTargetDirChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTargetDir(e.target.value);
    };
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!file || !targetDir) return;

        const fileBuffer = await file.arrayBuffer();
        const decoder = new TextDecoder();
        const str = decoder.decode(fileBuffer);
        const requestBody = {
            file: str,
            fileName: file.name,
            targetDir,
        };
        try {
            const response = await axios.post('/api/image', requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response)
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };


    const onHandleShowList = async ()=>{
        try{
           const list=  await axios.get('/api/getList')
            console.log(list)
        }
        catch (err){
            console.log(err)
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Select File:
                        <input type="file" onChange={handleFileChange}/>
                    </label>
                </div>
                <div>
                    <label>
                        Target Directory:
                        <input type="text" value={targetDir} onChange={handleTargetDirChange}/>
                    </label>
                </div>
                <button type="submit">Upload</button>
            </form>


            <button className={'border-gray-500 border m-8 cursor-pointer p-2'} type="button" onClick={onHandleShowList}>Show files list</button>

        </div>
    );
};

export default UploadForm;