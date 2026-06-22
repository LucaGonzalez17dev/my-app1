import { Head, Link, useForm } from '@inertiajs/react';
import { Collector } from '@/types/models/Collector';

interface Props {
    collectors: Collector[];
}

export default function Create({ collectors }: Props) {

    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        national_id: '',
        phone: '',
        collection_address: '',
        membership_frequency: 'MONTHLY',
        collector_id: '' as number | '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/members');
    }

    return (
        <>
            <Head title="Crear Miembro" />

            <div className="p-6 max-w-xl">

                <h1 className="text-2xl font-bold mb-6">
                    Crear Miembro
                </h1>

                <form
                    onSubmit={submit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        placeholder="Nombre completo"
                        value={data.full_name}
                        onChange={(e) =>
                            setData('full_name', e.target.value)
                        }
                        className="border p-2 w-full"
                    />

                    <input
                        type="text"
                        placeholder="Cédula"
                        value={data.national_id}
                        onChange={(e) =>
                            setData('national_id', e.target.value)
                        }
                        className="border p-2 w-full"
                    />

                    <input
                        type="text"
                        placeholder="Teléfono"
                        value={data.phone}
                        onChange={(e) =>
                            setData('phone', e.target.value)
                        }
                        className="border p-2 w-full"
                    />

                    <input
                        type="text"
                        placeholder="Dirección de cobro"
                        value={data.collection_address}
                        onChange={(e) =>
                            setData('collection_address', e.target.value)
                        }
                        className="border p-2 w-full"
                    />

                    <select
                        value={data.membership_frequency}
                        onChange={(e) =>
                            setData(
                                'membership_frequency',
                                e.target.value as any
                            )
                        }
                        className="border p-2 w-full"
                    >
                        <option value="MONTHLY">Mensual</option>
                        <option value="SEMIANNUAL">Semestral</option>
                        <option value="ANNUAL">Anual</option>
                    </select>

                    <select
                        value={data.collector_id}
                        onChange={(e) =>
                            setData(
                                'collector_id',
                                Number(e.target.value)
                            )
                        }
                        className="border p-2 w-full"
                    >

                        <option value="">
                            Seleccionar cobrador
                        </option>

                        {collectors.map((collector) => (
                            <option
                                key={collector.id}
                                value={collector.id}
                            >
                                {collector.name}
                            </option>
                        ))}

                    </select>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-black text-white px-4 py-2 rounded"
                    >
                        Guardar
                    </button>

                </form>

                <Link
                    href="/members"
                    className="text-blue-600 mt-4 block"
                >
                    Atrás
                </Link>

            </div>
        </>
    );
}