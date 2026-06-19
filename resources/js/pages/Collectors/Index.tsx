import { Head, Link, router } from '@inertiajs/react';
import { Collector } from '@/types/models/Collector';

interface Props {
    collectors: Collector[];
}

export default function Index({ collectors }: Props) {


    function deleteCollector(id: number) {

        if (confirm('Are you sure you want to delete this collector?')) {

            router.delete(`/collectors/${id}`);

        }

    }


    return (
        <>
            <Head title="Collectors" />

            <div className="p-6">


                <div className="flex justify-between items-center mb-6">

                    <h1 className="text-2xl font-bold">
                        Collectors
                    </h1>


                    <Link
                        href="/collectors/create"
                        className="px-4 py-2 bg-black text-white rounded"
                    >
                        New Collector
                    </Link>

                </div>



                <table className="w-full border">


                    <thead>

                        <tr className="border-b">

                            <th className="text-left p-2">
                                Name
                            </th>


                            <th className="text-left p-2">
                                Phone
                            </th>


                            <th className="text-left p-2">
                                Actions
                            </th>

                        </tr>

                    </thead>



                    <tbody>


                    {collectors.map((collector) => (

                        <tr
                            key={collector.id}
                            className="border-b"
                        >


                            <td className="p-2">
                                {collector.name}
                            </td>



                            <td className="p-2">
                                {collector.phone ?? '-'}
                            </td>



                            <td className="p-2 flex gap-3">


                                <Link
                                    href={`/collectors/${collector.id}/edit`}
                                    className="text-blue-600"
                                >
                                    Edit
                                </Link>



                                <button
                                    onClick={() => deleteCollector(collector.id)}
                                    className="text-red-600"
                                >
                                    Delete
                                </button>


                            </td>


                        </tr>

                    ))}


                    </tbody>


                </table>


            </div>
        </>
    );
}