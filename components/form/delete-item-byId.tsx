import {useState} from 'react';
import {ModalComponent} from '@/components/modal-container/modal-component';
import {useUpdateStore} from "@/utils/state/update.state";

export const DeleteItemById = ({itemId}: { itemId: string }) => {
    const [confirmationForDeleteItem, setConfirmationForDeleteItem] =
        useState(false);
    const {deleteItemProduct} = useUpdateStore((state) => state);

    const handleDelete = async () => {
        try {

            const isSuccessful = await deleteItemProduct(itemId)
            isSuccessful ? setConfirmationForDeleteItem(false) : null
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className={'flex justify-end pr-8'}>
                <div
                    className="block w-max px-4 py-2 bg-red text-white rounded cursor-pointer"
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
