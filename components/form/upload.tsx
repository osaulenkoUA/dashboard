"use client";

import React, {ChangeEvent} from "react";
import axios from "axios";
import {useUpdateStore} from "@/utils/state/update.state";
import {BASE_URL} from "@/utils/constants/api";
import {Delete} from "@/components/icons/delete";

interface UploadFormProps {
    targetDir: string;
    files: File[];
    setFiles: (files: File[]) => void;
}

export const UploadForm: React.FC<UploadFormProps> = ({targetDir, files, setFiles}) => {

    const {itemForUpdate, triggerLoading, setFieldLocalItem} = useUpdateStore((state) => state);


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
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            const arrayFiles = Array.from(selectedFiles)
            if (arrayFiles.length <= 5) {
                setFiles(Array.from(arrayFiles))
            } else alert('Максимум до завантаження 5 файлів за 1 раз')

        }
    };
    const handleDeleteFile = async (fileName: string | undefined) => {
        // const image = (await resizeFile(file)) as Blob;
        const requestBody = {
            fileName,
            targetDir,
            body: {
                _id: itemForUpdate._id,
                images: itemForUpdate.images.filter(img => img.name !== fileName)
            }
        };
        triggerLoading(true)
        try {
            const response = await axios.post(`${BASE_URL}/file/deleteFile`, requestBody, {
                headers: {
                    "Content-Type": "application/json",
                },
            },);
            setFieldLocalItem({field: 'images', value: itemForUpdate.images.filter(img => img.name !== fileName)})
            triggerLoading(false);
        } catch (error) {
            console.error("Error uploading file:", error);
            triggerLoading(false);

        }
    };

    const onHandleDeleteFileLocal = (name: string) => {
        setFiles(files.filter(el => el.name !== name))
    }

    return (<div>
        <p className="mb-4 text-3xl text-pink-900 font-bold">Завантажені файли:</p>
        <div className={' grid grid-cols-5 gap-4 justify-items-center'}>
            {itemForUpdate.images.length > 0 && itemForUpdate.images.map((el, index) => (
                <div key={index} className="w-48">

                    <img
                        src={el.url}
                        alt="Resized"
                        className="w-full h-auto object-cover rounded-md shadow-lg"
                    />
                    <div
                        onClick={() => handleDeleteFile(el.name)}
                        className={'w-10 h-10 m-auto mt-3  cursor-pointer'}
                    >
                        <Delete/>
                    </div>
                </div>
            ))}
        </div>

        <div className="flex flex-col items-start p-4 box-content">
            <label
                className="text-lg font-semibold mb-2 cursor-pointer block border-orange w-max text-white rounded-2xl bg-orange p-2">
                Вибрати зображення
                <input
                    className="hidden"
                    type="file"
                    multiple
                    max={5}
                    onChange={handleFileChange}
                />
            </label>
        </div>
        <div className={' grid grid-cols-5 gap-4 justify-items-center'}>
            {files.length > 0 && files.map(el => <div className={'w-48 h-auto'}>
                <img
                    src={URL.createObjectURL(el)}
                    alt="Resized"/>
                <div
                    onClick={() => onHandleDeleteFileLocal(el.name)}
                    className={'w-10 h-10 m-auto mt-3  cursor-pointer'}
                >
                    <Delete/>
                </div>
            </div>)}
        </div>
        {files.length > 0 &&
            <p className={'mt-4 text-red font-bold underline'}>Завантаження зображень відбудеться під час оновлення
                карточки
                товару</p>}
    </div>);
};
