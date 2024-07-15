'use client';

import ClipLoader from 'react-spinners/ClipLoader';
import {Item, useUpdateStore} from '@/utils/state/update.state';
import {useEffect, useState} from 'react';
import {FormComponent} from '@/components/form/form-component';
import compareObjects from '@/utils/helpers/compareObjects';
import {UploadForm} from '@/components/form/upload';
import {DeleteItemById} from '@/components/form/delete-item-byId';

export default function Home() {
    const [itemsByGroup, setItemsByGroup] = useState<Item[]>([]);
    const [localItem, setLocalItem] = useState<Item>(new Item({}));

    const items = useUpdateStore((state) => state.items);
    const group = useUpdateStore((state) => state.group);
    const getAllItems = useUpdateStore((state) => state.getAllItems);
    const {
        setItemForUpdate,
        itemForUpdate,
        updateField,
        isSuccess,
        isLoading,
        triggerSuccess,
    } = useUpdateStore((state) => state);

    useEffect(() => {
        getAllItems();
    }, []);

    const onHandleSubmit = (data: Partial<Item>) => {
        const itemOnlyWithChangedFields = compareObjects(data, itemForUpdate);
        updateField({...itemOnlyWithChangedFields, _id: itemForUpdate._id});
    };
    return (
        <section className="h-screen relative">
            <h1 className="text-center text-4xl font-extrabold text-gray-900 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-6 shadow-lg">
                Update Product
            </h1>
            {isSuccess && (
                <div
                    className={
                        'z-10 top-0 left-0 fixed w-screen h-screen flex items-center justify-center bg-blackRBGA'
                    }
                >
                    <div
                        className={
                            'w-[250px] h-[100px] bg-amber-50 flex justify-center items-center border-2'
                        }
                    >
                        <button
                            onClick={() => {
                                triggerSuccess('');
                                setItemForUpdate(new Item({}));
                            }}
                            className={'p-2 bg-emerald-600 text-white border-0'}
                        >
                            {isSuccess === 'updated' ? 'Updated Product' : 'Error'}
                        </button>
                    </div>
                </div>
            )}
            {isLoading && (
                <div
                    className={
                        'fixed top-0 left-0 w-screen h-screen bg-blackRBGA flex justify-center items-center '
                    }
                >
                    <ClipLoader
                        color={'#ff0000'}
                        loading={isLoading}
                        size={200}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            )}
            <div className={'grid grid-cols-max1fr'}>
                <div className="w-64 bg-gray-900 text-white p-4">
                    {group.map((el) => (
                        <div key={el} className="mb-4">
                            <div
                                className="p-3 mb-2 cursor-pointer bg-gray-700 text-white hover:bg-gray-600 hover:text-white rounded-lg transition-colors duration-200 shadow-md"
                                onClick={() => {
                                    setItemsByGroup(items.filter((item) => item.group === el));
                                    setItemForUpdate(new Item({}));
                                    setLocalItem(new Item({}));
                                }}
                            >
                                {el}
                            </div>
                            {el === itemsByGroup[0]?.group && (
                                <div className="ml-4 mt-2">
                                    {itemsByGroup.map((subEl) => (
                                        <p
                                            key={subEl._id}
                                            onClick={() => {
                                                setLocalItem(subEl);
                                                setItemForUpdate(subEl);
                                                window.scrollTo({top: 0, behavior: 'smooth'});
                                            }}
                                            className={`cursor-pointer pb-2 pl-2 pr-2 rounded-md transition-all duration-200 ${
                                                subEl.name === localItem.name
                                                    ? 'text-pink-500 bg-gray-800'
                                                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                                            }`}
                                        >
                                            {subEl.name}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {itemForUpdate._id && (
                    <div>
                        <UploadForm fileName={itemForUpdate._id}/>
                        <DeleteItemById itemId={itemForUpdate._id}/>
                        <FormComponent
                            localItem={localItem}
                            setLocalItem={setLocalItem}
                            submit={onHandleSubmit}
                            subbmitButton={'Update'}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
