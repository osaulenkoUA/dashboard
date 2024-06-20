'use client';

import ClipLoader from "react-spinners/ClipLoader";
import {Item, useUpdateStore} from "@/utils/state/update.state";
import {useEffect, useState} from "react";
import {FormComponent} from "@/components/form/form-component";
import compareObjects from "@/utils/helpers/compareObjects";
import classNames from "classnames";


export default function Home() {


    const [itemsByGroup, setItemsByGroup] = useState<Item[]>([])
    const [localItem, setLocalItem] = useState<Item>(new Item({}))

    const items = useUpdateStore((state) => state.items)
    const group = useUpdateStore((state) => state.group)
    const getAllItems = useUpdateStore((state) => state.getAllItems)
    const {
        setItemForUpdate,
        itemForUpdate,
        updateField,
        isSuccess,
        isLoading,
        triggerSuccess
    } = useUpdateStore((state) => state)

    useEffect(() => {
        getAllItems();
    }, [])


    const onHandleSubmit = (data: Partial<Item>) => {
        const itemOnlyWithChangedFields = compareObjects(data, itemForUpdate)
        updateField({...itemOnlyWithChangedFields, _id: itemForUpdate._id})

    }
    return (
        <section className="p-16 h-screen relative">
            {isSuccess && <div
                className={'z-10 top-0 left-0 fixed w-screen h-screen flex items-center justify-center bg-black opacity-60 '}>
                <div className={'w-[250px] h-[100px] bg-amber-50 flex justify-center items-center border-2'}>

                    <button onClick={() => {
                        triggerSuccess('');
                        setItemForUpdate(new Item({}))
                    }}
                            className={'p-2 bg-emerald-600 text-white border-0'}>{isSuccess === 'updated' ? 'Updated Product' : 'Error'}
                    </button>
                </div>
            </div>}
            <div className={'flex'}>
                {group.map(el => (
                    <div className={'p-2 cursor-pointer bg-amber-50'} onClick={() => {
                        setItemsByGroup(items.filter(item => item.group === el))
                        setItemForUpdate(new Item({}))
                        setLocalItem(new Item({}))
                    }} key={el}>
                        {el}
                    </div>
                ))}
            </div>

            {itemsByGroup.map(el => (
                <p onClick={() => {
                    setLocalItem(el)
                    setItemForUpdate(el)
                }} className={classNames('cursor-pointer pb-2', {
                    ['text-pink-900 text-[20px] font-bold']: el.name === localItem.name
                })} key={el._id}>{el.name}</p>
            ))}

            {itemForUpdate._id &&
                <FormComponent localItem={localItem} setLocalItem={setLocalItem} submit={onHandleSubmit}/>}
            {isLoading && <div
                className={'fixed top-0 left-0 w-screen h-screen bg-gray-300 opacity-60 flex justify-center items-center '}>
                <ClipLoader
                    color={'#ff0000'}
                    loading={isLoading}
                    size={200}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
            }


        </section>
    );
}
