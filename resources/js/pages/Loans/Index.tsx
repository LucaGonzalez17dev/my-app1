import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Loan } from '@/types/models/Loan';
import { Member } from '@/types/models/Member';


interface Props {
    loans: Loan[];
}



export default function Index({ loans }: Props) {


    const [search, setSearch] = useState('');

    const [members, setMembers] = useState<Member[]>([]);



    useEffect(() => {


        if (search.length < 2) {

            setMembers([]);

            return;
        }



        fetch(`/members/search?query=${search}`)

            .then(res => res.json())

            .then(data => {

                setMembers(data);

            });


    }, [search]);





    function searchLoans(memberId: number) {


        router.get(
            `/loans/search`,
            {
                member_id: memberId
            }
        );


        setMembers([]);

    }





    function deleteLoan(id: number) {


        if (confirm('¿Está seguro que desea eliminar este préstamo?')) {

            router.delete(`/loans/${id}`);

        }

    }





    return (

        <>

            <Head title="Préstamos" />



            <div className="p-6">



                <div className="flex justify-between items-center mb-6">


                    <h1 className="text-2xl font-bold">
                        Préstamos
                    </h1>



                    <Link

                        href="/loans/create"

                        className="px-4 py-2 bg-black text-white rounded"

                    >

                        Nuevo Préstamo

                    </Link>


                </div>





                {/* BUSCADOR */}

                <div className="mb-6 max-w-xl">


                    <input

                        type="text"

                        placeholder="Buscar préstamos por socio..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                        className="border p-2 w-full"

                    />



                    {members.length > 0 && (


                        <div className="border rounded mt-1">


                            {members.map(member => (


                                <button


                                    key={member.id}


                                    type="button"


                                    onClick={() =>
                                        searchLoans(member.id)
                                    }


                                    className="block w-full text-left p-2 hover:bg-gray-100"


                                >


                                    {member.full_name}

                                    {' - '}

                                    {member.national_id}


                                </button>


                            ))}


                        </div>


                    )}



                </div>





                <table className="w-full border">



                    <thead>


                        <tr className="border-b">


                            <th className="text-left p-2">
                                Socio
                            </th>



                            <th className="text-left p-2">
                                Elemento
                            </th>



                            <th className="text-left p-2">
                                Cantidad
                            </th>



                            <th className="text-left p-2">
                                Dirección
                            </th>



                            <th className="text-left p-2">
                                Fecha
                            </th>



                            <th className="text-left p-2">
                                Acciones
                            </th>


                        </tr>


                    </thead>





                    <tbody>



                    {loans.map((loan) => (



                        <tr

                            key={loan.id}

                            className="border-b"

                        >



                            <td className="p-2">

                                {loan.member?.full_name ?? '-'}

                            </td>




                            <td className="p-2">

                                {loan.item_name}

                            </td>




                            <td className="p-2">

                                {loan.quantity}

                            </td>




                            <td className="p-2">

                                {loan.collection_address}

                            </td>




                            <td className="p-2">


                                {new Date(

                                    loan.loan_date

                                ).toLocaleDateString('es-UY')}


                            </td>





                            <td className="p-2 flex gap-3">



                                <Link

                                    href={`/loans/${loan.id}/edit`}

                                    className="text-blue-600"

                                >

                                    Editar

                                </Link>





                                <button

                                    onClick={() =>
                                        deleteLoan(loan.id)
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