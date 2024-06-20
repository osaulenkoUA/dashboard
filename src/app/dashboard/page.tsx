import Link from 'next/link'

export default function Home() {
    return (
        <main className="flex min-h-screen p-24">


            <div className="w-full min-h-screen bg-gray-100 p-8">
                <div className="mx-auto bg-white shadow-lg rounded-lg">
                    <h1 className="text-2xl font-bold text-center p-4 border-b">Dashboard</h1>
                    <ul className="p-4 flex justify-between">
                        <li className="p-4 border-b hover:bg-gray-50">
                            <Link href={{
                                pathname: '/dashboard/addProduct',

                            }}>
                                Add Product
                            </Link>
                        </li>
                        <li className="p-4 border-b hover:bg-gray-50">
                            <Link href={{
                                pathname: '/dashboard/update',

                            }}>
                                Update Product
                            </Link>
                        </li>
                        <li className="p-4 hover:bg-gray-50">
                            <Link href={{
                                pathname: '/dashboard/update',

                            }}>
                                Add Category
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    );
}
