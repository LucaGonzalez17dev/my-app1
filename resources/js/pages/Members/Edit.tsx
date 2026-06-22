import { Head, Link, useForm } from '@inertiajs/react';
import { Member } from '@/types/models/Member';
import { Collector } from '@/types/models/Collector';

interface Props {
    member: Member;
    collectors: Collector[];
}

export default function Edit({
    member,
    collectors,
}: Props) {

    const { data, setData, put, processing } = useForm({
        full_name: member.full_name,
        national_id: member.national_id,
        phone: member.phone ?? '',
        collection_address: member.collection_address,
        membership_frequency: member.membership_frequency,
        collector_id: member.collector_id,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();

        put(`/members/${member.id}`);
    }

    return (
        <>
            <Head title="Edit Member" />

            <div className="p-6 max-w-xl">

                <h1 className="text-2xl font-bold mb-6">
                    Edit Member
                </h1>

                <form
                    onSubmit={submit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        value={data.full_name}
                        onChange={(e) =>
                            setData('full_name', e.target.value)
                        }
                        className="border p-2 w-full"
                    />

                    <input
                        type="text"
                        value={data.national_id}
                        onChange={(e) =>
                            setData('national_id', e.target.value)
                        }
                        className="border p-2 w-full"
                    />

                    <input
                        type="text"
                        value={data.phone}
                        onChange={(e) =>
                            setData('phone', e.target.value)
                        }
                        className="border p-2 w-full"
                    />

                    <input
                        type="text"
                        value={data.collection_address}
                        onChange={(e) =>
                            setData(
                                'collection_address',
                                e.target.value
                            )
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
                        <option value="MONTHLY">Monthly</option>
                        <option value="SEMIANNUAL">Semiannual</option>
                        <option value="ANNUAL">Annual</option>
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
                        Update
                    </button>

                </form>

                <Link
                    href="/members"
                    className="text-blue-600 mt-4 block"
                >
                    Back
                </Link>

            </div>
        </>
    );
}