import axios from 'axios';
import {BASE_URL} from '@/utils/constants/api';
import {useState} from 'react';
import {ModalComponent} from '@/components/modal-container/modal-component';
import {Item, useUpdateStore} from "@/utils/state/update.state";

export const DeleteItemById = ({itemId}: { itemId: string }) => {
    const [confirmationForDeleteItem, setConfirmationForDeleteItem] =
        useState(false);
    const {removeItemFromLocalStore, setItemForUpdate} = useUpdateStore((state) => state);

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${BASE_URL}/product/delete`, {
                params: {id: itemId},
            });
            removeItemFromLocalStore(itemId)
            setItemForUpdate(new Item({}));
            setConfirmationForDeleteItem(false)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div>
                <div
                    className="block px-4 py-2 bg-red text-white rounded cursor-pointer"
                    onClick={() => {
                        setConfirmationForDeleteItem(true);
                    }}
                >
                    Delete Item
                </div>
            </div>
            {confirmationForDeleteItem && (
                <ModalComponent
                    text={'Ви дійсно хочете видалити ?'}
                    actions={[
                        {
                            text: 'Yes',
                            type: 'main',
                            action: () => handleDelete(),
                        },
                        {
                            text: 'No',
                            type: 'secondary',
                            action: () => setConfirmationForDeleteItem(false),
                        },
                    ]}
                />
            )}
        </div>
    );
};
