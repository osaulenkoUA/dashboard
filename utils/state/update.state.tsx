import {create} from 'zustand';
import {devtools, subscribeWithSelector} from 'zustand/middleware';
import axios, {AxiosResponse} from "axios";

interface ApiResponse {
    success: boolean;
    message?: string;
    data?: any;
}

interface ItemProduct {
    [key: string]: any;
}

export class Item {
    _id: string
    group: string
    name: string
    fasovka: string
    sklad: string
    time: string
    vutratu: string
    solvent: string
    vudurobit: string
    vlastuvosti: string
    pidgotovka: string
    nanesennya: string
    urlimage: string
    buyurl: string
    matchurl: string
    __v: number
    features: []

    constructor(item: Partial<ItemProduct> = {}) {
        this._id = item['_id']
        this.group = item['group']
        this.name = item['name']
        this.fasovka = item['fasovka']
        this.sklad = item['sklad']
        this.time = item['time']
        this.vutratu = item['vutratu']
        this.solvent = item['solvent']
        this.vudurobit = item['vudurobit']
        this.vlastuvosti = item['vlastuvosti']
        this.pidgotovka = item['pidgotovka']
        this.nanesennya = item['nanesennya']
        this.urlimage = item['urlimage']
        this.buyurl = item['buyurl']
        this.matchurl = item['matchurl']
        this.__v = item['__v']
        this.features = item['features']
    }
}


type UpdateState = {
    items: Item[],
    group: string[],
    itemForUpdate: Item,
    getAllItems: () => void,
    setItemForUpdate: (item: Item) => void,
    updateField: (data: Partial<Item>) => void,
    triggerSuccess: (value: string | undefined) => void,
    isSuccess: string | undefined,
    isLoading: boolean,
};

export const useUpdateStore = create(
    devtools(
        subscribeWithSelector<UpdateState>((set, getState) => ({
            items: [],
            group: [],
            isSuccess: '',
            itemForUpdate: new Item({}),
            isLoading: false,
            triggerSuccess: (value) => {
                set({isSuccess: value})
            },
            getAllItems: async () => {
                const response = await fetch('https://himdecor-back-new.vercel.app/product/get');
                const items: Item[] = await response.json()
                const array = items.map(el => el.group)
                set({items, group: [...new Set(array)]})
            },
            setItemForUpdate: (item) => set({itemForUpdate: item}),
            updateField: async (data) => {
                try {
                    set({isLoading: true})
                    const response: AxiosResponse<ApiResponse> = await axios({
                        method: 'put',
                        url: 'https://himdecor-back-new.vercel.app/product/update',
                        data,
                    });
                    set({isLoading: false})
                    if (response.data?.success) {
                        set({isSuccess: 'updated'})
                    } else {
                        set({isSuccess: 'error'})
                    }
                } catch (error) {
                    set({isLoading: false})
                    set({isSuccess: 'error'})

                }
            }
        })),
        {
            name: 'update-store'
        }
    )
);
