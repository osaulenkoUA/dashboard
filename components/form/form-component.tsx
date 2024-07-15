import {IFeature, Item, useUpdateStore} from '@/utils/state/update.state';
import {v4 as uuidv4} from 'uuid';

interface IProps {
    localItem: Item;
    subbmitButton: string;
    setLocalItem: (
        item: (prevState: Item) => {
            vudurobit: string;
            buyurl: string;
            vlastuvosti: string;
            sklad: string;
            features: IFeature[];
            pidgotovka: string;
            nanesennya: string;
            name: string;
            matchurl: string;
            urlimage: string;
            solvent: string;
            _id: string;
            time: string;
            vutratu: string;
            group: string;
            fasovka: string;
        }
    ) => void;
    submit: (item: {
        vudurobit?: string;
        buyurl?: string;
        vlastuvosti?: string;
        sklad?: string;
        features: IFeature[];
        pidgotovka?: string;
        nanesennya?: string;
        name?: string;
        matchurl?: string;
        urlimage?: string;
        solvent?: string;
        _id?: string;
        time?: string;
        vutratu?: string;
        group?: string;
        fasovka?: string;
    }) => void;
}

export const FormComponent = ({
                                  localItem,
                                  setLocalItem,
                                  submit,
                                  subbmitButton,
                              }: IProps) => {
    const group = useUpdateStore((state) => state.group);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const formObject = Object.fromEntries(data.entries());
        const payload = {...formObject, features: localItem.features};
        submit(payload);
    };

    const handleChange = (event: any, id?: string) => {
        const {name, value} = event.target;
        if (id && (name === 'weight' || name === 'price')) {
            setLocalItem((prevState: Item) => ({
                ...prevState,
                features:
                    prevState.features.map((el) =>
                        el._id === id ? {...el, [name]: value} : el
                    ) ?? [],
            }));
        } else
            setLocalItem((prevState) => ({
                ...prevState,
                [name]: value,
            }));
    };

    const onHandleDeleteFeature = (id: string) => {
        const filteredItem = localItem.features.filter((el) => el._id !== id);
        setLocalItem((prevState) => ({
            ...prevState,
            features: filteredItem,
        }));
    };

    const onHandleAddFeature = (id: string) => {
        setLocalItem((prevState) => ({
            ...prevState,
            features: [
                ...prevState.features,
                {_id: id, price: '', weight: '', isNew: true},
            ],
        }));
    };
    return (
        <form
            onSubmit={handleSubmit}
            className={'bg-white rounded-lg shadow-md p-4 block mt-8'}
        >
            <div className="mb-4">
                <label htmlFor="name" className={'block text-pink-900 font-bold'}>
                    Назва продукта
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={localItem.name}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="group" className="block text-pink-900 font-bold">
                    Група
                </label>
                <select
                    name="group"
                    id="group"
                    value={localItem.group}
                    onChange={handleChange}
                    className="mt-1 p-2 w-64 border border-gray-500 rounded"
                    required
                >
                    <option value="" disabled>
                        Select a category
                    </option>
                    {group.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <p className={'text-pink-900 text-2xl'}>Характеристика: Вага-Ціна</p>
            {localItem.features.map((item, idx) => (
                <div key={item._id ?? idx} className={'flex gap-x-2 items-end'}>
                    <label className={'pr-2 w-24 block text-pink-900 font-bold'}>
                        Вага:
                        <input
                            type="text"
                            name="weight"
                            className="mt-1 p-2 w-24 border rounded"
                            value={item.weight}
                            onChange={(e) => handleChange(e, item._id)}
                        />
                    </label>
                    <label className={'block w-24 text-pink-900 font-bold'}>
                        Ціна:
                        <input
                            type="text"
                            name="price"
                            className="mt-1 p-2 w-24 border rounded"
                            value={item.price}
                            onChange={(e) => handleChange(e, item._id)}
                        />
                    </label>
                    <button
                        type={'button'}
                        onClick={() => {
                            onHandleDeleteFeature(item._id);
                        }}
                        className={'block px-4 h-8 bg-red text-white rounded mb-1'}
                    >
                        DELETE
                    </button>
                </div>
            ))}
            <button
                type={'button'}
                onClick={() => {
                    onHandleAddFeature(uuidv4());
                }}
                className={'block px-4 h-8 bg-green text-white rounded mb-1 mt-2'}
            >
                Добавити +
            </button>

            <div className="mb-4">
                <label htmlFor="sklad" className="block text-pink-900 font-bold">
                    Склад
                </label>
                <input
                    name="sklad"
                    id="sklad"
                    value={localItem.sklad}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="time" className="block text-pink-900 font-bold">
                    Час висихання
                </label>
                <input
                    name="time"
                    id="time"
                    value={localItem.time}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="vutratu" className="block text-pink-900 font-bold">
                    Витрати
                </label>
                <input
                    name="vutratu"
                    id="vutratu"
                    value={localItem.vutratu}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="solvent" className="block text-pink-900 font-bold">
                    Розчинник
                </label>
                <input
                    name="solvent"
                    id="solvent"
                    value={localItem.solvent}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="vudurobit" className="block text-pink-900 font-bold">
                    Види робіт
                </label>
                <input
                    name="vudurobit"
                    id="vudurobit"
                    value={localItem.vudurobit}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="urlimage" className="block text-pink-900 font-bold">
                    File name for Image
                </label>
                <input
                    name="urlimage"
                    disabled
                    id="urlimage"
                    value={localItem.urlimage}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                />
            </div>

            {/*------------------*/}
            <div className="mb-4">
                <label htmlFor="vlastuvosti" className="block text-pink-900 font-bold">
                    Властивості
                </label>
                <textarea
                    name="vlastuvosti"
                    id="vlastuvosti"
                    value={localItem.vlastuvosti}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                    rows={5}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="nanesennya" className="block text-pink-900 font-bold">
                    Нанесення
                </label>
                <textarea
                    name="nanesennya"
                    id="nanesennya"
                    value={localItem.nanesennya}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                    rows={5}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="pidgotovka" className="block text-pink-900 font-bold">
                    Підготовка
                </label>
                <textarea
                    name="pidgotovka"
                    id="pidgotovka"
                    value={localItem.pidgotovka}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                    rows={5}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="buyurl" className="block text-pink-900 font-bold">
                    URL на PROM UA
                </label>
                <input
                    name="buyurl"
                    id="buyurl"
                    value={localItem.buyurl}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                />
            </div>
            <div className={'flex justify-center items-center w-full gap-3'}>
                <button
                    type="submit"
                    className="block px-4 py-2 bg-blue-600 text-white rounded"
                >
                    {subbmitButton}
                </button>
            </div>
        </form>
    );
};
