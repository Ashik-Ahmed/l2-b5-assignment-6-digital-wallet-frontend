import CardSection from "@/components/modules/dashboard/CardSection"
import { DataTableDemo } from "@/components/modules/dashboard/DataTable"
import { useGetAllTransactionsQuery } from "@/redux/features/transaction/transaction.api"


const UserDashboard = () => {
    const { data: transactions } = useGetAllTransactionsQuery(undefined)
    return (
        <div>
            <CardSection transactions={transactions} />
            <DataTableDemo transactions={transactions} />
        </div>
    )
}

export default UserDashboard