import { Head, Link, router } from '@inertiajs/react';
import { Member } from '@/types/models/Member';
import { Collector } from '@/types/models/Collector';
import { useState } from 'react';

interface Props {
    members: Member[];
    collectors: Collector[];
}

export default function Index({
    members,
    collectors,
}: Props) {

    const [search, setSearch] = useState('');
    const [collectorId, setCollectorId] = useState('');

    function deleteMember(id: number) {

        if (confirm('¿Está seguro que desea eliminar este socio?')) {
            router.delete(`/members/${id}`);
        }

    }

    function searchByName() {

        router.get('/members/search', {
            name: search,
        });

    }

    function findByCollector(id: string) {

        setCollectorId(id);

        if (id === '') {

            router.get('/members');

            return;

        }

        router.get('/members/collector', {
            collector_id: id,
        });

    }

    function translateFrequency(
        frequency: Member['membership_frequency']
    ) {

        switch (frequency) {

            case 'MONTHLY':
                return 'Mensual';

            case 'SEMIANNUAL':
                return 'Semestral';

            case 'ANNUAL':
                return 'Anual';

            default:
                return frequency;

        }

    }

    return (
        <>
            <Head title="Socios" />

            <div className="p-6">

                <div className="flex justify-between items-center mb-6">

                    <h1 className="text-2xl font-bold">
                        Socios
                    </h1>

                    <Link
                        href="/members/create"
                        className="px-4 py-2 bg-black text-white rounded"
                    >
                        Nuevo Socio
                    </Link>

                </div>

                <div className="flex gap-4 mb-6">

                    <div className="flex gap-2">

                        <input
                            type="text"
                            placeholder="Buscar por nombre..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="border p-2"
                        />

                        <button
                            onClick={searchByName}
                            className="bg-black text-white px-4 rounded"
                        >
                            Buscar
                        </button>

                    </div>

                    <select
                        value={collectorId}
                        onChange={(e) =>
                            findByCollector(e.target.value)
                        }
                        className="border p-2"
                    >

                        <option value="">
                            Todos los cobradores
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

                </div>

                <table className="w-full border">

                    <thead>

                        <tr className="border-b">

                            <th className="text-left p-2">
                                Nombre
                            </th>

                            <th className="text-left p-2">
                                Cédula
                            </th>

                            <th className="text-left p-2">
                                Teléfono
                            </th>

                            <th className="text-left p-2">
                                Lugar de cobro
                            </th>

                            <th className="text-left p-2">
                                Cobrador
                            </th>

                            <th className="text-left p-2">
                                Cuota
                            </th>

                            <th className="text-left p-2">
                                Fecha de registro
                            </th>

                            <th className="text-left p-2">
                                Acciones
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {members.map((member) => (

                            <tr
                                key={member.id}
                                className="border-b"
                            >

                                <td className="p-2">
                                    {member.full_name}
                                </td>

                                <td className="p-2">
                                    {member.national_id}
                                </td>

                                <td className="p-2">
                                    {member.phone ?? '-'}
                                </td>

                                <td className="p-2">
                                    {member.collection_address}
                                </td>

                                <td className="p-2">
                                    {member.collector?.name ?? '-'}
                                </td>

                                <td className="p-2">
                                    {translateFrequency(
                                        member.membership_frequency
                                    )}
                                </td>

                                <td className="p-2">
                                    {member.created_at
                                        ? new Date(
                                            member.created_at
                                        ).toLocaleDateString('es-UY')
                                        : '-'}
                                </td>

                                <td className="p-2 flex gap-3">

                                    <Link
                                        href={`/members/${member.id}/edit`}
                                        className="text-blue-600"
                                    >
                                        Editar
                                    </Link>

                                    <button
                                        onClick={() =>
                                            deleteMember(member.id)
                                        }
                                        className="text-red-600"
                                    >
                                        Eliminar
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