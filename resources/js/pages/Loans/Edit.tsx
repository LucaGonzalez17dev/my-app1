import { Head, Link, useForm } from '@inertiajs/react';
import { Loan } from '@/types/models/Loan';
import { Member } from '@/types/models/Member';


interface Props {

    loan: Loan;

    members: Member[];

}



export default function Edit({
    loan,
    members
}: Props) {


    const { data, setData, put, processing } = useForm({

        member_id: loan.member_id,

        collection_address: loan.collection_address,

        item_name: loan.item_name,

        quantity: loan.quantity,

        loan_date: loan.loan_date,

    });



    function submit(e: React.FormEvent){

        e.preventDefault();

        put(`/loans/${loan.id}`);

    }



    return (

        <>

        <Head title="Editar Préstamo"/>


        <div className="p-6 max-w-xl">


            <h1 className="text-2xl font-bold mb-6">
                Editar Préstamo
            </h1>


            <form
                onSubmit={submit}
                className="space-y-4"
            >


                <select

                    value={data.member_id}

                    onChange={(e)=>
                        setData(
                            'member_id',
                            Number(e.target.value)
                        )
                    }

                    className="border p-2 w-full"

                >

                    {members.map(member=>(

                        <option
                            key={member.id}
                            value={member.id}
                        >
                            {member.full_name}
                        </option>

                    ))}


                </select>




                <input

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
                    Actualizar
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