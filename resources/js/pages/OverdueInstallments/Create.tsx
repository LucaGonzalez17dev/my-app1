import { Head, Link, useForm } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import { Member } from '@/types/models/Member';

export default function Create() {

    const { data, setData, post, processing } = useForm({

        period: '',

        member_ids: [] as number[],

    });

    const [query, setQuery] = useState('');

    const [results, setResults] = useState<Member[]>([]);

    const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);

    async function searchMembers(value: string) {

        setQuery(value);

        if (value.length < 2) {

            setResults([]);

            return;

        }

        try {

            const response = await axios.get('/members/search', {

                params: {

                    query: value,

                },

            });

            setResults(response.data);

        } catch (error) {

            console.error(error);

        }

    }

    function addMember(member: Member) {

        if (selectedMembers.some(m => m.id === member.id)) {
            return;
        }

        const updatedMembers = [...selectedMembers, member];

        setSelectedMembers(updatedMembers);

        setData(
            'member_ids',
            updatedMembers.map(m => m.id)
        );

        setQuery('');

        setResults([]);

    }

    function removeMember(id: number) {

        const updatedMembers = selectedMembers.filter(
            member => member.id !== id
        );

        setSelectedMembers(updatedMembers);

        setData(
            'member_ids',
            updatedMembers.map(m => m.id)
        );

    }

    function submit(e: React.FormEvent) {

        e.preventDefault();

        post('/overdue-installments');

    }

    return (

        <>
            <Head title="Registrar cuotas no cobradas" />

            <div className="p-6 max-w-2xl">

                <h1 className="text-2xl font-bold mb-6">
                    Registrar cuotas no cobradas
                </h1>

                <form
                    onSubmit={submit}
                    className="space-y-6"
                >

                    <div>

                        <label className="block mb-2 font-semibold">
                            Período
                        </label>

                        <input
                            type="date"
                            value={data.period}
                            onChange={(e) =>
                                setData(
                                    'period',
                                    e.target.value
                                )
                            }
                            className="border p-2 w-full"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-semibold">
                            Buscar socio
                        </label>

                        <input
                            type="text"
                            placeholder="Nombre o cédula..."
                            value={query}
                            onChange={(e) =>
                                searchMembers(e.target.value)
                            }
                            className="border p-2 w-full"
                        />

                        {results.length > 0 && (

                            <div className="border rounded mt-1">

                                {results.map(member => (

                                    <button
                                        type="button"
                                        key={member.id}
                                        onClick={() =>
                                            addMember(member)
                                        }
                                        className="block w-full text-left px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                                    >

                                        {member.full_name}

                                        <span className="text-sm opacity-70 ml-2">
                                            {member.national_id}
                                        </span>

                                    </button>

                                ))}

                            </div>

                        )}

                    </div>

                    <div>

                        <h2 className="font-semibold mb-2">
                            Socios con cuota no cobrada
                        </h2>

                        {selectedMembers.length === 0 && (

                            <p className="opacity-70">
                                No hay socios seleccionados.
                            </p>

                        )}

                        {selectedMembers.map(member => (

                            <div
                                key={member.id}
                                className="flex justify-between items-center border rounded p-2 mb-2"
                            >

                                <div>

                                    <strong>
                                        {member.full_name}
                                    </strong>

                                    <br />

                                    <small>
                                        {member.national_id}
                                    </small>

                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        removeMember(member.id)
                                    }
                                    className="text-red-600"
                                >
                                    Quitar
                                </button>

                            </div>

                        ))}

                    </div>

                    <button
                        type="submit"
                        disabled={
                            processing ||
                            selectedMembers.length === 0
                        }
                        className="bg-black text-white px-4 py-2 rounded"
                    >
                        Registrar cuotas vencidas
                    </button>

                </form>

                <Link
                    href="/overdue-installments"
                    className="text-blue-600 block mt-6"
                >
                    Volver
                </Link>

            </div>

        </>

    );

}