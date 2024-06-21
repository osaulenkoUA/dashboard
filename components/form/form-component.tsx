import {Item, useUpdateStore} from "@/utils/state/update.state";

interface IProps {
    localItem: Item;
    setLocalItem: (item: Item) => void;
    submit: (item:Partial<Item>) => void;
}

export const FormComponent = ({localItem, setLocalItem, submit}:IProps) => {


    const group = useUpdateStore((state) => state.group)


    const handleSubmit = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const formObject = Object.fromEntries(data.entries());
        submit(formObject)
    };

    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setLocalItem({
            ...localItem,
            [name]: value
        });
    };


    return (
        <form onSubmit={handleSubmit} className={"bg-white rounded-lg shadow-md p-4 block mt-8"}>
            <div className="mb-4">
                <label htmlFor="name" className={"block text-pink-900 font-bold"}>Назва продукта</label>
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
                <label htmlFor="group" className="block text-pink-900 font-bold">Група</label>
                <select
                    name="group"
                    id="group"
                    value={localItem.group}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                    required
                >
                    <option value="" disabled>Select a category</option>
                    {group.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="sklad" className="block text-pink-900 font-bold">Склад</label>
                <input
                    name="sklad"
                    id="sklad"
                    value={localItem.sklad}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="time" className="block text-pink-900 font-bold">Час висихання</label>
                <input
                    name="time"
                    id="time"
                    value={localItem.time}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="vutratu" className="block text-pink-900 font-bold">Витрати</label>
                <input
                    name="vutratu"
                    id="vutratu"
                    value={localItem.vutratu}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="solvent" className="block text-pink-900 font-bold">Розчинник</label>
                <input
                    name="solvent"
                    id="solvent"
                    value={localItem.solvent}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="vudurobit" className="block text-pink-900 font-bold">Види робіт</label>
                <input
                    name="vudurobit"
                    id="vudurobit"
                    value={localItem.vudurobit}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="urlimage" className="block text-pink-900 font-bold">File name for Image</label>
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
                <label htmlFor="vlastuvosti" className="block text-pink-900 font-bold">Властивості</label>
                <textarea
                    name="vlastuvosti"
                    id="vlastuvosti"
                    value={localItem.vlastuvosti}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                    required
                    rows={5}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="nanesennya" className="block text-pink-900 font-bold">Нанесення</label>
                <textarea
                    name="nanesennya"
                    id="nanesennya"
                    value={localItem.nanesennya}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                    required
                    rows={5}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="pidgotovka" className="block text-pink-900 font-bold">Підготовка</label>
                <textarea
                    name="pidgotovka"
                    id="pidgotovka"
                    value={localItem.pidgotovka}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                    required
                    rows={5}

                />
            </div>
            <div className="mb-4">
                <label htmlFor="buyurl" className="block text-pink-900 font-bold">URL на PROM UA</label>
                <input
                    name="buyurl"
                    id="buyurl"
                    value={localItem.buyurl}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                />
            </div>
            <button type="submit" className="block px-4 py-2 bg-blue-600 text-white rounded">
                Submit
            </button>
        </form>


    );
}
