import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { ArrowRight } from 'lucide-react';
import { useCashOutMutation, useGetWalletBalanceQuery } from '@/redux/features/wallet/wallet.api';
import { toast } from 'sonner';
import { useGetAllTransactionsQuery } from '@/redux/features/transaction/transaction.api';
import { timeAgo } from '@/utils/timeDifference';


const Withdraw = () => {

    const form = useForm({ defaultValues: { phone: "", amount: "" } });
    const { data: walletData } = useGetWalletBalanceQuery(undefined);
    const { data: transactionData } = useGetAllTransactionsQuery({ type: "cash_out" });
    const [cashOut] = useCashOutMutation();
    console.log("wallet :", walletData);
    console.log("transactions :", transactionData);

    const handleCashout = async (data: { phone: string; amount: string }) => {
        console.log("Cash-out data:", data);
        try {
            const cashOutResult = await cashOut({ phone: data.phone, amount: parseFloat(data.amount) }).unwrap();

            console.log("Cash-out result:", cashOutResult);
            if (cashOutResult.success) {
                toast.success("Cash-out successful!");
            }
            else {
                toast.error("Cash-out failed!");
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || "Cash-out failed! Try again.");
        }

        return true;
    }


    return (
        <div className="min-h-[70vh] px-4 md:px-8">
            <div className="mx-auto w-full max-w-6xl">
                <h1 className="text-2xl md:text-3xl font-semibold mb-4">Cash-out to Agent</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Left: Form Card */}
                    <div className="bg-card/80 border rounded-lg p-6 shadow-sm">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <h2 className="text-lg font-medium">Send cash to an agent</h2>
                                <p className="text-sm text-muted-foreground mt-1">Enter the agent phone and amount to initiate a secure cash-out.</p>
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
                                            console.error("Cashout failed:", err);
                                        }
                                    })}
                                    className="grid gap-4"
                                >
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Agent Phone Number</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Enter agent phone (e.g. +1 555 555 5555)"
                                                        // keep as text or tel to avoid numeric controlled issues on some browsers
                                                        type="tel"
                                                        inputMode="tel"
                                                        value={field.value ?? ""}
                                                        className="w-full"
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
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2">
                                        <Button type="submit" className="flex-1 inline-flex items-center justify-center gap-2">
                                            <ArrowRight className="h-4 w-4" />
                                            Send Cash
                                        </Button>
                                        <Button variant="outline" onClick={() => form.reset()} className="w-full sm:w-auto">
                                            Reset
                                        </Button>
                                    </div>

                                    <p className="text-xs text-muted-foreground mt-3">
                                        Tip: double check the agent phone number. Transactions may be irreversible.
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
                                    <p className="text-2xl font-semibold mt-2 bg-primary text-accent w-fit px-2 rounded">$ {walletData?.data?.balance.toFixed(2)}</p>
                                    <p className="text-sm text-muted-foreground mt-1">Primary wallet • Updated just now</p>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-3">
                                <div className="bg-muted/60 rounded p-3 text-center">
                                    <div className="text-sm text-muted-foreground">Today</div>
                                    <div className="font-medium mt-1">${walletData?.data?.dailySpent}</div>
                                </div>
                                <div className="bg-muted/60 rounded p-3 text-center">
                                    <div className="text-sm text-muted-foreground">Week</div>
                                    <div className="font-medium mt-1">$4,520</div>
                                </div>
                                <div className="bg-muted/60 rounded p-3 text-center">
                                    <div className="text-sm text-muted-foreground">Month</div>
                                    <div className="font-medium mt-1">$18,200</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card/80 border rounded-lg p-4 shadow-sm">
                            <h4 className="font-medium mb-3">Recent Cash-outs</h4>
                            <ul className="space-y-3">
                                {
                                    transactionData?.data?.length ? transactionData?.data?.slice(0, 5)?.map((tx) => (
                                        <li key={tx.id} className="flex items-center justify-between text-sm">
                                            <div>
                                                <div className="font-medium">Agent : +88 {tx?.toWallet?.phone} <span className='text-muted-foreground italic text-xs'>({tx?.toWallet?.name})</span></div>
                                                <div className="text-muted-foreground text-xs">{timeAgo(tx.createdAt)}</div>
                                            </div>
                                            <div className="font-semibold">${tx?.amount?.toFixed(2)}</div>
                                        </li>
                                    )) : <li className="text-sm text-muted-foreground">No recent cash-outs found.</li>
                                }
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default Withdraw