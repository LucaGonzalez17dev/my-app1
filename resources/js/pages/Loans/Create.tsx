import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Member } from '@/types/models/Member';

export default function Create() {


    const { data, setData, post, processing } = useForm({

        member_id: '' as number | '',

        collection_address: '',

        item_name: '',

        quantity: 1,

        loan_date: '',

    });


    const [search, setSearch] = useState('');
    const [results, setResults] = useState<Member[]>([]);



    useEffect(() => {

        if (search.length < 2) {
            setResults([]);
            return;
        }

        fetch(`/members/search?query=${search}`)
            .then(res => res.json())
            .then(data => setResults(data));

    }, [search]);



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


                <form onSubmit={submit} className="space-y-4">


                    {/* BUSCADOR DE SOCIOS */}
                    <div>

                        <input
                            type="text"
                            placeholder="Buscar socio por nombre o cédula"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border p-2 w-full"
                        />


                        {results.length > 0 && (

                            <div className="border rounded mt-1 max-h-48 overflow-y-auto">

                                {results.map(member => (

                                    <button
                                        key={member.id}
                                        type="button"
                                        className="block w-full text-left p-2 hover:bg-gray-100"
                                        onClick={() => {

                                            setData('member_id', member.id);

                                            setSearch(
                                                `${member.full_name} - ${member.national_id}`
                                            );

                                            setResults([]);

                                        }}
                                    >

                                        {member.full_name}
                                        {' - '}
                                        {member.national_id}

                                    </button>

                                ))}

                            </div>

                        )}

                    </div>



                    {/* DIRECCIÓN */}
                    <input
                        type="text"
                        placeholder="Dirección de entrega"
                        value={data.collection_address}
                        onChange={(e) =>
                            setData(
                                'collection_address',
                                e.target.value
                            )
                        }
                        className="border p-2 w-full"
                    />



                    {/* ITEM */}
                    <input
                        type="text"
                        placeholder="Elemento prestado"
                        value={data.item_name}
                        onChange={(e) =>
                            setData(
                                'item_name',
                                e.target.value
                            )
                        }
                        className="border p-2 w-full"
                    />



                    {/* CANTIDAD */}
                    <input
                        type="number"
                        placeholder="Cantidad"
                        value={data.quantity}
                        onChange={(e) =>
                            setData(
                                'quantity',
                                Number(e.target.value)
                            )
                        }
                        className="border p-2 w-full"
                    />



                    {/* FECHA */}
                    <input
                        type="date"
                        value={data.loan_date}
                        onChange={(e) =>
                            setData(
                                'loan_date',
                                e.target.value
                            )
                        }
                        className="border p-2 w-full"
                    />



                    {/* SUBMIT */}
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