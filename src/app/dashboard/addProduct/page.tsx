"use client";

import React from 'react';
import {UploadForm} from "@/components/form/upload";

interface UploadFormProps {
}


const AddProduct: React.FC<UploadFormProps> = () => {

     return (
        <div>
           <UploadForm fileName={'wqe'}/>
        </div>
    );
};

export default AddProduct;