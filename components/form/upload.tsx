"use client";

import React, {ChangeEvent, FormEvent, useState} from 'react';
import axios from "axios";
import Resizer from "react-image-file-resizer";

interface UploadFormProps {
    fileName:string
}

export const UploadForm: React.FC<UploadFormProps> = ({fileName}) => {

    const [file, setFile] = useState<any>(null);
    const [targetDir, setTargetDir] = useState<string>('/home/alex/web/himdecor/public/images/shop/');

    const resizeFile = (file: Blob) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                300,
                300,
                "JPEG",
                80,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
            );
        });

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
        const image = await resizeFile(file) as Blob;
        const fileBuffer = await image.arrayBuffer();
        const decoder = new TextDecoder();
        const str = decoder.decode(fileBuffer);
        const requestBody = {
            file: str,
            fileName: file.name,
            targetDir,
        };
        try {
            const response = await axios.post('https://himdecor-back-new.vercel.app/file/uploadFile', requestBody, {
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
            {file && <img src={URL.createObjectURL(file)} alt="Resized" />}
        </div>
    );
};

