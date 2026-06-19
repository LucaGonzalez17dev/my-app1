import { Head, Link, useForm } from '@inertiajs/react';
import { Collector } from '@/types/models/Collector';


interface Props {
    collector: Collector;
}


export default function Edit({ collector }: Props) {


    const { data, setData, put, processing, errors } = useForm({
        name: collector.name,
        phone: collector.phone ?? '',
    });


    function submit(e: React.FormEvent) {
        e.preventDefault();


        put(`/collectors/${collector.id}`);
    }



    return (
        <>
            <Head title="Edit Collector" />


            <div className="p-6 max-w-xl">


                <div className="flex justify-between items-center mb-6">

                    <h1 className="text-2xl font-bold">
                        Edit Collector
                    </h1>


                    <Link
                        href="/collectors"
                        className="text-blue-600"
                    >
                        Back
                    </Link>

                </div>



                <form
                    onSubmit={submit}
                    className="space-y-4"
                >


                    <div>

                        <label className="block">
                            Name
                        </label>


                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) =>
                                setData('name', e.target.value)
                            }
                            className="border p-2 w-full"
                        />


                        {errors.name && (
                            <div className="text-red-500">
                                {errors.name}
                            </div>
                        )}

                    </div>



                    <div>

                        <label className="block">
                            Phone
                        </label>


                        <input
                            type="text"
                            value={data.phone}
                            onChange={(e) =>
                                setData('phone', e.target.value)
                            }
                            className="border p-2 w-full"
                        />


                        {errors.phone && (
                            <div className="text-red-500">
                                {errors.phone}
                            </div>
                        )}

                    </div>



                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-black text-white px-4 py-2 rounded"
                    >
                        Update
                    </button>


                </form>


            </div>
        </>
    );
}