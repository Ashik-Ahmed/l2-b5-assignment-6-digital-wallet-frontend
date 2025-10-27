/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetWalletBalanceQuery } from "@/redux/features/wallet/wallet.api"
import { TrendingDown, TrendingUp } from "lucide-react"

const CardSection = ({ transactions }: { transactions: any }) => {

    const { data } = useGetWalletBalanceQuery(undefined);

    const dailyTransactionsTotal = transactions?.data?.reduce((acc: number, tx: any) => {
        if (new Date(tx.createdAt).toDateString() === new Date().toDateString()) {
            return acc + tx.amount;
        }
        return acc;
    }, 0) || 0;


    return (
        <div className="flex flex-col gap-4 md:gap-6">
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription className="text-violet-700">Current Balance</CardDescription>
                        <CardTitle className="text-violet-700 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            ${data?.data?.balance.toFixed(2)}
                        </CardTitle>
                        {/* <CardAction>
                            <Badge variant="outline">
                                <TrendingUp />
                                +12.5%
                            </Badge>
                        </CardAction> */}
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Trending up this month <TrendingUp className="size-4" />
                        </div>
                        <div className="text-muted-foreground">
                            Your wallet is performing well
                        </div>
                    </CardFooter>
                </Card>
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription className="text-violet-700">Today's Transaction</CardDescription>
                        <CardTitle className="text-violet-700 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            ${dailyTransactionsTotal?.toFixed(2)}
                        </CardTitle>
                        {/* <CardAction>
                            <Badge variant="outline">
                                <TrendingDown />
                                -20%
                            </Badge>
                        </CardAction> */}
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Down 20% this period <TrendingDown className="size-4" />
                        </div>
                        <div className="text-muted-foreground">
                            Good job! Keep your spending in check
                        </div>
                    </CardFooter>
                </Card>
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription className="text-violet-700">Daily Limit</CardDescription>
                        <CardTitle className="text-violet-700 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            ${data?.data?.dailyLimit}
                        </CardTitle>
                        {/* <CardAction>
                            <Badge variant="outline">
                                <TrendingUp />
                                +12.5%
                            </Badge>
                        </CardAction> */}
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Meets your daily limit <TrendingUp className="size-4" />
                        </div>
                        <div className="text-muted-foreground">You can spend up to ${data?.data?.dailyLimit - data?.data?.dailySpent} today</div>
                    </CardFooter>
                </Card>
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription className="text-violet-700">Monthly Limit</CardDescription>
                        <CardTitle className="text-violet-700 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            ${data?.data?.monthlyLimit}
                        </CardTitle>
                        {/* <CardAction>
                            <Badge variant="outline">
                                <TrendingUp />
                                +4.5%
                            </Badge>
                        </CardAction> */}
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Meets your monthly limit <TrendingUp className="size-4" />
                        </div>
                        <div className="text-muted-foreground">You can spend up to ${data?.data?.monthlyLimit - data?.data?.dailySpent} this month</div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default CardSection