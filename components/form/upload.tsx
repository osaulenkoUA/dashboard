"use client";

import React, {ChangeEvent, FormEvent, useState} from 'react';
import axios from "axios";

interface UploadFormProps {
    fileName:string
}

export const UploadForm: React.FC<UploadFormProps> = ({fileName}) => {

    const [file, setFile] = useState<File | null>(null);
    const [targetDir, setTargetDir] = useState<string>('/home/alex/web/himdecor/public/images/shop/');

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
            fileName,
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
        </div>
    );
};

