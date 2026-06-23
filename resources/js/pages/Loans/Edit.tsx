import { Head, Link, useForm } from '@inertiajs/react';
import { Loan } from '@/types/models/Loan';



interface Props {

    loan: Loan;

}



export default function Edit({
    loan
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





                <label className="block font-semibold">

                    Socio

                </label>



                <input className="block font-semibold"


                    type="text"


                    value={loan.member?.full_name ?? ''}


                    readOnly



                />






                <label className="block font-semibold">

                    Dirección

                </label>



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







                <label className="block font-semibold">

                    Elemento

                </label>



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







                <label className="block font-semibold">

                    Cantidad

                </label>



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







                <label className="block font-semibold">

                    Fecha

                </label>



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