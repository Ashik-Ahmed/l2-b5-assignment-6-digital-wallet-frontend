/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { ArrowRight } from 'lucide-react';
import { useGetWalletBalanceQuery } from '@/redux/features/wallet/wallet.api';
import { toast } from 'sonner';
import { useGetAllTransactionsQuery } from '@/redux/features/transaction/transaction.api';
import { timeAgo } from '@/utils/timeDifference';
import { useCashOutByAgentMutation } from '@/redux/features/agent/agent.api';
import type { Transaction } from '@/components/modules/dashboard/DataTable';


const AgentCashOut = () => {

    const form = useForm({ defaultValues: { phone: "", amount: "" } });
    const { data: walletData } = useGetWalletBalanceQuery(undefined);
    const { data: transactionData } = useGetAllTransactionsQuery({ type: "cash_out" });
    const [cashOut] = useCashOutByAgentMutation();

    // start of today (midnight)
    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)

    // 7 days ago (midnight)
    const sevenDaysAgo = new Date(startOfToday)
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    // 30 days ago (midnight)
    const thirtyDaysAgo = new Date(startOfToday)
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const todaysCashoutTotal =
        transactionData?.data?.reduce((total = 0, tx: Transaction) => {
            const txDate = new Date(tx.createdAt)
            if (txDate >= startOfToday) total += tx.amount
            return total
        }, 0) ?? 0

    const weeklyCashoutTotal =
        transactionData?.data?.reduce((total = 0, tx: Transaction) => {
            const txDate = new Date(tx.createdAt)
            if (txDate >= sevenDaysAgo) total += tx.amount
            return total
        }, 0) ?? 0

    const monthlyCashoutTotal =
        transactionData?.data?.reduce((total = 0, tx: Transaction) => {
            const txDate = new Date(tx.createdAt)
            if (txDate >= thirtyDaysAgo) total += tx.amount
            return total
        }, 0) ?? 0

    const handleCashout = async (data: { phone: string; amount: string }) => {

        try {
            const cashOutResult = await cashOut({ phone: data.phone, amount: parseFloat(data.amount) }).unwrap();

            if (cashOutResult.success) {
                toast.success("Cash-out successful!");
            }
            else {
                toast.error("Cash-out failed!");
            }
        } catch (error: any) {

            toast.error(error?.data?.message || "Cash-out failed! Try again.");
        }

        return true;
    }


    return (
        <div className="min-h-[70vh] px-4 md:px-8">
            <div className="mx-auto w-full max-w-6xl">
                <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-violet-700"><span className='bg-violet-500 text-white px-2 rounded'>Cash-out</span> by Agent</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Left: Form Card */}
                    <div className="bg-card/80 border rounded-lg p-6 shadow-sm">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <h2 className="text-lg font-medium">Cash-out from Wallet</h2>
                                <p className="text-sm text-muted-foreground mt-1">Enter the wallet and amount to initiate a secure cash-out.</p>
                            </div>
                            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="text-xs bg-muted rounded px-2 py-1">Instant</span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(async (values) => {
                                        try {
                                            const ok = await handleCashout(values);
                                            if (ok) {
                                                form.reset();
                                            }
                                        } catch (err) {
                                            console.error("Cash-out failed:", err);
                                        }
                                    })}
                                    className="grid gap-4"
                                >
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Wallet Number</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Enter user wallet number (e.g. 017XXXXXXXX)"
                                                        // keep as text or tel to avoid numeric controlled issues on some browsers
                                                        type="tel"
                                                        inputMode="tel"
                                                        value={field.value ?? ""}
                                                        className="w-full"
                                                        required
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="amount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Amount</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                                                        <Input
                                                            {...field}
                                                            placeholder="0.00"
                                                            type="number"
                                                            step="0.01"
                                                            min="0"
                                                            value={field.value ?? ""}
                                                            className="pl-7 w-full"
                                                            required
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2">
                                        <Button type="submit" className="flex-1 inline-flex items-center justify-center gap-2 bg-violet-500 hover:bg-violet-600">
                                            <ArrowRight className="h-4 w-4" />
                                            Cash Out
                                        </Button>
                                        <Button variant="outline" onClick={() => form.reset()} className="w-full sm:w-auto">
                                            Reset
                                        </Button>
                                    </div>

                                    <p className="text-xs text-muted-foreground mt-3">
                                        Tip: double check the wallet number. Transactions may be irreversible.
                                    </p>
                                </form>
                            </Form>
                        </div>
                    </div>

                    {/* Right: Info / Illustration Card */}
                    <aside className="space-y-6">
                        <div className="bg-card/80 border rounded-lg p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-base font-medium">Available Balance</h3>
                                    <p className="text-2xl font-semibold mt-2 bg-violet-500 text-accent w-fit px-2 rounded">$ {walletData?.data?.balance.toFixed(2)}</p>
                                    <p className="text-sm text-muted-foreground mt-1">Primary wallet • Updated just now</p>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-3">
                                <div className="bg-muted/60 rounded p-3 text-center">
                                    <div className="text-sm text-muted-foreground">Today</div>
                                    {/* <div className="font-medium mt-1">${walletData?.data?.dailySpent}</div> */}
                                    <div className="font-medium mt-1">${todaysCashoutTotal}</div>
                                </div>
                                <div className="bg-muted/60 rounded p-3 text-center">
                                    <div className="text-sm text-muted-foreground">Week</div>
                                    <div className="font-medium mt-1">${weeklyCashoutTotal}</div>
                                </div>
                                <div className="bg-muted/60 rounded p-3 text-center">
                                    <div className="text-sm text-muted-foreground">Month</div>
                                    <div className="font-medium mt-1">${monthlyCashoutTotal}</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card/80 border rounded-lg p-4 shadow-sm">
                            <h4 className="font-medium mb-3">Recent Cash-outs</h4>
                            <ul className="space-y-3">
                                {
                                    transactionData?.data?.length ? transactionData?.data?.slice(0, 5)?.map((tx: Transaction) => (
                                        <li key={tx?._id} className="flex items-center justify-between text-sm">
                                            <div>
                                                <div className="font-medium">Wallet : +88 {tx?.fromWallet?.phone} <span className='text-muted-foreground italic text-xs'>({tx?.fromWallet?.name})</span></div>
                                                <div className="text-muted-foreground text-xs">{timeAgo(tx.createdAt)}</div>
                                            </div>
                                            <div className="font-semibold">${tx?.amount?.toFixed(2)}</div>
                                        </li>
                                    )) : <li key="empty" className="text-sm text-muted-foreground">No recent cash-out found.</li>
                                }
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default AgentCashOut;