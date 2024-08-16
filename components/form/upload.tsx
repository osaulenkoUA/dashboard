"use client";

import React, {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {useUpdateStore} from "@/utils/state/update.state";

interface UploadFormProps {
    fileName: string;
    targetDir: string;
}

export const UploadForm: React.FC<UploadFormProps> = ({fileName, targetDir}) => {
    const [file, setFile] = useState<File | null>(null);

    const itemForUpdate = useUpdateStore((state) => state.itemForUpdate);

    console.log(fileName)
    console.log(itemForUpdate)

    // const resizeFile = (file: Blob) =>
    //     new Promise((resolve) => {
    //         Resizer.imageFileResizer(
    //             file,
    //             300,
    //             300,
    //             "JPEG",
    //             80,
    //             0,
    //             (uri) => {
    //                 resolve(uri);
    //             },
    //             "file",
    //         );
    //     });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };
    const handleDeleteFile = async () => {
        // const image = (await resizeFile(file)) as Blob;
        const requestBody = {
            fileName: itemForUpdate.images[0].name,
            targetDir
        };
        try {
            const response = await axios.post(
                "https://himdecor-back-new.vercel.app/file/deleteFile",
                requestBody,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
            console.log(response);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const onHandleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!file || !targetDir) return;
        console.log(file)
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('targetDir', targetDir);

        try {
            const response = await axios.post(
                "https://himdecor-back-new.vercel.app/file/uploadFile",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );
            console.log(response);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div>
            <form onSubmit={onHandleSubmit}>
                <div>
                    <label>
                        Select File:
                        <input type="file" onChange={handleFileChange}/>
                    </label>
                </div>
                <button type="submit">Upload</button>
            </form>
            {!file && itemForUpdate.images.map(el => <img
                src={file ? URL.createObjectURL(file) : el.url}
                alt="Resized"/>)
            }
            <div onClick={handleDeleteFile}
                 className={'w-32 h-8 border-2 border-gray-500 bg-red cursor-pointer text-white'}>DELETE Image
            </div>
        </div>
    );
};
