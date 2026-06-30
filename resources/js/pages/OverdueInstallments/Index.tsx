import { Head, Link } from '@inertiajs/react';
import { OverdueInstallmentSummary } from '@/types/models/OverdueInstallment';


interface Props {

    overdueInstallments: OverdueInstallmentSummary[];

}



export default function Index({
    overdueInstallments
}: Props) {


return (

<>

<Head title="Cuotas impagas"/>


<div className="p-6">


<div className="flex justify-between items-center mb-6">


<h1 className="text-2xl font-bold">
Cuotas impagas
</h1>


<Link

href="/overdue-installments/create"

className="px-4 py-2 bg-black text-white rounded"

>

Registrar cuota impaga

</Link>


</div>





<table className="w-full border">


<thead>

<tr className="border-b">


<th className="text-left p-2">
Socio
</th>


<th className="text-left p-2">
Cobrador
</th>


<th className="text-left p-2">
Cuotas impagas
</th>


<th className="text-left p-2">
Acciones
</th>


</tr>

</thead>



<tbody>


{overdueInstallments.map(item=>(


<tr

key={item.member.id}

className="border-b"

>


<td className="p-2">

{item.member.full_name}

</td>



<td className="p-2">

{item.member.collector?.name ?? '-'}

</td>



<td className="p-2">

{item.total}

</td>



<td className="p-2">


<Link

href={`/overdue-installments/member/${item.member.id}`}

className="text-blue-600"

>

Ver detalle

</Link>


</td>



</tr>


))}


</tbody>


</table>



</div>


</>


)

}