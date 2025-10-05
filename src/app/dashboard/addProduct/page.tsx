"use client";

import React, {useState} from 'react';
import {IImage, Item, useUpdateStore} from "@/utils/state/update.state"
import {FormComponent} from "@/components/form/form-component"
import {UploadForm} from "@/components/form/upload"
import {PRODUCTS_IMAGES} from "@/utils/constants/dir"


interface UploadFormProps {
}

const AddProduct: React.FC<UploadFormProps> = () => {
    const [localItem, setLocalItem] = useState<Item>(new Item({}));
    const [files, setFiles] = useState<File[]>([]);

    const {
       createProduct,
        uploadFlesToServer
    } = useUpdateStore((state) => state);

    const createImagesObj = (listName: string[]): IImage[] => {
        const fileSet = new Set(listName);

        return files.map(file => {
            const fileName = file.name;
            const matched = Array.from(fileSet).find(str => str.includes(fileName));
            return matched ? {
                name: fileName,
                url: `https://www.himdecor.ua/shares/images/products/${fileName}`,
                isMain: false
            } : {};
        });
    };
    const onHandleSubmit = async (data: Partial<Item>) => {
        const response = files.length > 0 ? await uploadFlesToServer(files, PRODUCTS_IMAGES) : []
        const payload = {
            ...data,
            images: [...createImagesObj(response)],
        }
        createProduct(payload)
    }

    return (
        <div>
            <h1 className="text-center text-4xl font-extrabold text-gray-900 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-6 shadow-lg">
                Добавити Продукт
            </h1>
           <div className={'m-auto'}> <UploadForm files={files} setFiles={setFiles} targetDir={PRODUCTS_IMAGES}/></div>
            <FormComponent
                localItem={localItem}
                setLocalItem={setLocalItem}
                submit={onHandleSubmit}
                subbmitButton={"create"}
            />
        </div>
    );
};

export default AddProduct;
