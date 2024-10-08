import {create} from 'zustand';
import {devtools, subscribeWithSelector} from 'zustand/middleware';
import axios, {AxiosResponse} from 'axios';
import {BASE_URL} from "@/utils/constants/api";

interface ApiResponse {
    isSuccessful: boolean;
    message?: string;
    data?: any;
}

interface ItemProduct {
    [key: string]: any;
}

export interface IFeature {
    weight: string;
    price: string;
    _id: string;
    isNew?: boolean;
}

export interface IImage {
    name?: string;
    url?: string;
    isMain?: boolean;
    _id?: string;
}

export class Item {
    _id: string;
    group: string;
    name: string;
    fasovka: string;
    sklad: string;
    time: string;
    vutratu: string;
    solvent: string;
    vudurobit: string;
    vlastuvosti: string;
    pidgotovka: string;
    nanesennya: string;
    urlimage: string;
    buyurl: string;
    matchurl: string;
    features: IFeature[];
    images: IImage[];

    constructor(item: Partial<ItemProduct> = {}) {
        this._id = item['_id'];
        this.group = item['group'];
        this.name = item['name'];
        this.fasovka = item['fasovka'];
        this.sklad = item['sklad'];
        this.time = item['time'];
        this.vutratu = item['vutratu'];
        this.solvent = item['solvent'];
        this.vudurobit = item['vudurobit'];
        this.vlastuvosti = item['vlastuvosti'];
        this.pidgotovka = item['pidgotovka'];
        this.nanesennya = item['nanesennya'];
        this.urlimage = item['urlimage'];
        this.buyurl = item['buyurl'];
        this.matchurl = item['matchurl'];
        this.features = item['features']?.map((el: IFeature) => ({
            price: el.price,
            weight: el.weight,
            ...(el.isNew ? {} : {_id: el._id}),
        }));
        this.images = item['images'];
    }
}

type UpdateState = {
    items: Item[];
    group: string[];
    itemForUpdate: Item;
    getAllItems: () => void;
    setItemForUpdate: (item: Item) => void;
    setFieldLocalItem: ({field, value}: { field: string; value: any }) => void;
    updateField: (data: Partial<Item>) => void;
    triggerSuccess: (value: boolean) => void;
    triggerLoading: (value: boolean) => void;
    deleteItemProduct: (id: string) => Promise<any>;
    uploadFlesToServer: (files: File[], targetDir: string) => Promise<any>;
    isSuccess: boolean;
    isLoading: boolean;
};

export const useUpdateStore = create(
    devtools(
        subscribeWithSelector<UpdateState>((set, get) => ({
            items: [],
            group: [],
            isSuccess: false,
            itemForUpdate: new Item({}),
            isLoading: false,
            triggerSuccess: (value) => {
                set({isSuccess: value});
            },
            triggerLoading: (value: boolean) => {
                set({isLoading: value});
            },
            setFieldLocalItem: ({field, value}) => {
                const {itemForUpdate} = get();
                set({itemForUpdate: {...itemForUpdate, [field]: value}})
            },
            getAllItems: async () => {
                set({isLoading: true})
                try {
                    const response = await fetch(
                        `${BASE_URL}/product/get`);
                    const items: Item[] = await response.json();
                    const array = items.map((el) => el.group);
                    set({items, group: [...new Set(array)]});
                    set({isLoading: false})
                } catch (err) {
                    set({isLoading: false})

                }
            },
            uploadFlesToServer: async (files: File[], targetDir: string) => {
                if (!files || !targetDir) return;
                set({isLoading: true})

                const formData = new FormData();

                files.forEach(f => {
                    formData.append('pictures', f);
                });
                formData.append('targetDir', targetDir);
                try {
                    const response = await axios.post(`${BASE_URL}/file/uploadFile`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                    set({isLoading: false})
                    return response.data.uploadedFiles
                } catch (error) {
                    console.error("Error uploading file:", error);
                    set({isLoading: false})
                    return []
                }
            },
            deleteItemProduct: async (itemId: string) => {
                try {
                    set({isLoading: true})
                    const response = await axios.delete(`${BASE_URL}/product/delete`, {
                        params: {id: itemId},
                    });
                    if (response.data.isSuccessful) {
                        const {items} = get();
                        const updatedItems = items.filter(item => item._id !== itemId);
                        set({items: updatedItems, isLoading: false, itemForUpdate: new Item({})});
                    }
                    return response.data.isSuccessful
                } catch (err) {
                    set({isLoading: false})
                    return false
                }
            },
            setItemForUpdate: (item) => set({itemForUpdate: item}),
            updateField: async (data) => {
                const {items} = get();
                try {
                    set({isLoading: true});
                    const response: AxiosResponse<ApiResponse> = await axios({
                        method: 'put',
                        url: `${BASE_URL}/product/update`,
                        data: new Item(data),
                    });
                    set({isLoading: false});
                    if (response.data?.isSuccessful) {
                        const updatedItems = items.map(el => el._id === response.data.data._id ? response.data.data : el)

                        set({items: updatedItems, isSuccess: true});
                    } else {
                        set({isSuccess: false});
                    }
                } catch (error) {
                    set({isLoading: false, isSuccess: false});
                }
            }
        })),
        {
            name: 'update-store',
        }
    )
);
