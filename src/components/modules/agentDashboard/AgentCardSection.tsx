/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetWalletBalanceQuery } from "@/redux/features/wallet/wallet.api"
import { TrendingDown, TrendingUp } from "lucide-react"

const AgentCardSection = ({ transactions }: { transactions: any }) => {

    const { data } = useGetWalletBalanceQuery(undefined);

    const dailyCashInTotal = () => {
        let total = 0;
        transactions?.map((transaction: any) => {
            if (transaction.type === "cash_in" && transaction.createdAt.split('T')[0] === new Date().toISOString().split('T')[0]) {
                total += transaction.amount;
            }
        });
        return total;
    }
    const dailyCashOutTotal = () => {
        let total = 0;
        transactions?.map((transaction: any) => {
            if (transaction.type === "cash_out" && transaction.createdAt.split('T')[0] === new Date().toISOString().split('T')[0]) {
                total += transaction.amount;
            }
        });
        return total;
    }
    const dailyCommissionTotal = () => {
        let total = 0;
        transactions?.map((transaction: any) => {
            if (transaction.type === "commission" && transaction.createdAt.split('T')[0] === new Date().toISOString().split('T')[0]) {
                total += transaction.amount;
            }
        });
        return total;
    }

    return (
        <div className="flex flex-col gap-4 md:gap-6">
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription className="text-violet-700">Current Balance</CardDescription>
                        <CardTitle className="text-violet-700 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            ${data?.data?.balance.toFixed(2) || 0.00}
                        </CardTitle>
                        {/* <CardAction>
                            <Badge variant="outline">
                                <TrendingUp />
                                +12.5%
                            </Badge>
                        </CardAction> */}
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="text-muted-foreground flex  gap-2">
                            Keep your balance up <TrendingUp className="size-4" />
                        </div>
                    </CardFooter>
                </Card>
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription className="text-violet-700">Today's Cash-in</CardDescription>
                        <CardTitle className="text-violet-700 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            ${dailyCashInTotal()?.toFixed(2) || 0.00}
                        </CardTitle>
                        {/* <CardAction>
                            <Badge variant="outline">
                                <TrendingDown />
                                -20%
                            </Badge>
                        </CardAction> */}
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="text-muted-foreground">
                            Cash-in to keep your balance up
                        </div>
                    </CardFooter>
                </Card>
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription className="text-violet-700">Today's Cash-out</CardDescription>
                        <CardTitle className="text-violet-700 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            ${dailyCashOutTotal()?.toFixed(2) || 0.00}
                        </CardTitle>
                        {/* <CardAction>
                            <Badge variant="outline">
                                <TrendingUp />
                                +12.5%
                            </Badge>
                        </CardAction> */}
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="text-muted-foreground flex gap-2">
                            Meet your daily target <TrendingUp className="size-4" />
                        </div>
                    </CardFooter>
                </Card>
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription className="text-violet-700">Daily Commission</CardDescription>
                        <CardTitle className="text-violet-700 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            ${dailyCommissionTotal()?.toFixed(2) || 0.00}
                        </CardTitle>
                        {/* <CardAction>
                            <Badge variant="outline">
                                <TrendingUp />
                                +4.5%
                            </Badge>
                        </CardAction> */}
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="text-muted-foreground flex gap-2">
                            Make transactions to earn more <TrendingUp className="size-4" />
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default AgentCardSection