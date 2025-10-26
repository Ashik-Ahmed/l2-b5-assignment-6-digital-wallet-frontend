import AgentCardSection from '@/components/modules/agentDashboard/AgentCardSection'
import { AgentDataTable } from '@/components/modules/agentDashboard/AgentDataTable'
import { useGetAllTransactionsQuery } from '@/redux/features/transaction/transaction.api'

const AgentDashboard = () => {

    const { data: transactions } = useGetAllTransactionsQuery(undefined)

    return (
        <div>
            <AgentCardSection transactions={transactions?.data} />
            <AgentDataTable transactions={transactions?.data} />
        </div>
    )
}

export default AgentDashboard