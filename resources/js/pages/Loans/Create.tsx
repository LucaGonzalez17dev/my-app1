import { Head, Link, useForm } from '@inertiajs/react';
import { Member } from '@/types/models/Member';


interface Props {
    members: Member[];
}



export default function Create({ members }: Props) {


    const { data, setData, post, processing } = useForm({

        member_id: '' as number | '',

        collection_address: '',

        item_name: '',

        quantity: 1,

        loan_date: '',

    });



    function submit(e: React.FormEvent) {

        e.preventDefault();

        post('/loans');

    }



    return (

        <>
            <Head title="Nuevo Préstamo" />


            <div className="p-6 max-w-xl">


                <h1 className="text-2xl font-bold mb-6">
                    Nuevo Préstamo
                </h1>



                <form
                    onSubmit={submit}
                    className="space-y-4"
                >



                    <select

                        value={data.member_id}

                        onChange={(e) =>
                            setData(
                                'member_id',
                                Number(e.target.value)
                            )
                        }

                        className="border p-2 w-full"

                    >

                        <option value="">
                            Seleccionar socio
                        </option>


                        {members.map(member => (

                            <option
                                key={member.id}
                                value={member.id}
                            >

                                {member.full_name}

                            </option>

                        ))}


                    </select>




                    <input

                        type="text"

                        placeholder="Dirección"

                        value={data.collection_address}

                        onChange={(e)=>
                            setData(
                                'collection_address',
                                e.target.value
                            )
                        }

                        className="border p-2 w-full"

                    />




                    <input

                        type="text"

                        placeholder="Elemento"

                        value={data.item_name}

                        onChange={(e)=>
                            setData(
                                'item_name',
                                e.target.value
                            )
                        }

                        className="border p-2 w-full"

                    />




                    <input

                        type="number"

                        placeholder="Cantidad"

                        value={data.quantity}

                        onChange={(e)=>
                            setData(
                                'quantity',
                                Number(e.target.value)
                            )
                        }

                        className="border p-2 w-full"

                    />




                    <input

                        type="date"

                        value={data.loan_date}

                        onChange={(e)=>
                            setData(
                                'loan_date',
                                e.target.value
                            )
                        }

                        className="border p-2 w-full"

                    />




                    <button

                        disabled={processing}

                        className="bg-black text-white px-4 py-2 rounded"

                    >

                        Guardar

                    </button>



                </form>



                <Link
                    href="/loans"
                    className="text-blue-600 block mt-4"
                >
                    Volver
                </Link>


            </div>

        </>

    );

}