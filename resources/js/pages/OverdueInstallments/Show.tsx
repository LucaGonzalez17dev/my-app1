import { Head, Link, router } from '@inertiajs/react';


interface Props {

    member: any;

    overdueInstallments: any[];

}



export default function Show({
    member,
    overdueInstallments
}: Props) {


    function deleteInstallment(id:number) {


        if(confirm('¿Marcar esta cuota como pagada?')) {

            router.delete(
                `/overdue-installments/${id}`
            );

        }

    }



    function formatPeriod(period:string) {

        const date = new Date(period);


        return date.toLocaleDateString(
            'es-UY',
            {
                month: 'long',
                year: 'numeric'
            }
        );

    }




    return (

        <>

        <Head title="Detalle cuotas impagas" />


        <div className="p-6">


            <div className="flex justify-between items-center mb-6">


                <div>

                    <h1 className="text-2xl font-bold">

                        {member.full_name}

                    </h1>


                    <p className="opacity-70">

                        Cobrador:
                        {' '}
                        {member.collector?.name ?? '-'}

                    </p>


                </div>



                <Link

                    href="/overdue-installments"

                    className="text-blue-600"

                >

                    Volver

                </Link>


            </div>





            <table className="w-full border">


                <thead>


                    <tr className="border-b">


                        <th className="text-left p-2">

                            Período impago

                        </th>


                        <th className="text-left p-2">

                            Acción

                        </th>


                    </tr>


                </thead>



                <tbody>


                {overdueInstallments.map(item => (


                    <tr

                        key={item.id}

                        className="border-b"

                    >


                        <td className="p-2 capitalize">


                            {formatPeriod(item.period)}


                        </td>



                        <td className="p-2">


                            <button

                                onClick={() =>
                                    deleteInstallment(item.id)
                                }

                                className="text-green-600"

                            >

                                Pagar cuota

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