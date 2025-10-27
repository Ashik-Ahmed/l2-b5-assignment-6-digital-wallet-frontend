/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetAllAgentsByAdminQuery, useGetAllTransactionsByAdminQuery, useGetAllUsersByAdminQuery } from "@/redux/features/admin/admin.api";

const AdminCardSection = ({ transactions }: { transactions: any }) => {

    const { data: userData } = useGetAllUsersByAdminQuery(undefined);
    const { data: agentData } = useGetAllAgentsByAdminQuery(undefined);
    const { data: transactionsData } = useGetAllTransactionsByAdminQuery(undefined);

    const totalTransactionAmount = () => {
        let total = 0;
        transactions?.map((transaction: any) => {
            total += transaction.amount;
        });
        return total;
    }

    return (
        <div className="flex flex-col gap-4 md:gap-6">
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription className="mx-auto text-md font-semibold text-violet-700">Total Users</CardDescription>
                        <CardTitle className="mx-auto text-violet-700 text-2xl font-semibold tabular-nums @[250px]/card:text-4xl">
                            {userData?.data?.length || 0}
                        </CardTitle>
                        {/* <CardAction>
                            <Badge variant="outline">
                                <TrendingUp />
                                +12.5%
                            </Badge>
                        </CardAction> */}
                    </CardHeader>

                </Card>
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription className="mx-auto text-md font-semibold text-violet-700">Registered Agents</CardDescription>
                        <CardTitle className="mx-auto text-violet-700 text-2xl font-semibold tabular-nums @[250px]/card:text-4xl">
                            {agentData?.data?.length || 0}
                        </CardTitle>
                        {/* <CardAction>
                            <Badge variant="outline">
                                <TrendingDown />
                                -20%
                            </Badge>
                        </CardAction> */}
                    </CardHeader>

                </Card>
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription className="mx-auto text-md font-semibold text-violet-700">Total Transaction Count</CardDescription>
                        <CardTitle className="mx-auto text-violet-700 text-2xl font-semibold tabular-nums @[250px]/card:text-4xl">
                            {transactionsData?.data?.length || 0.00}
                        </CardTitle>
                        {/* <CardAction>
                            <Badge variant="outline">
                                <TrendingUp />
                                +12.5%
                            </Badge>
                        </CardAction> */}
                    </CardHeader>

                </Card>
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription className="mx-auto text-md font-semibold text-violet-700">Total Amount Transfered</CardDescription>
                        <CardTitle className="mx-auto text-violet-700 text-2xl font-semibold tabular-nums @[250px]/card:text-4xl">
                            ${Math.floor(totalTransactionAmount()) || 0}
                        </CardTitle>
                        {/* <CardAction>
                            <Badge variant="outline">
                                <TrendingUp />
                                +4.5%
                            </Badge>
                        </CardAction> */}
                    </CardHeader>

                </Card>
            </div>
        </div>
    )
}

export default AdminCardSection