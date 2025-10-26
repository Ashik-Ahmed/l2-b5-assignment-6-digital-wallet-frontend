import * as React from "react"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import type {
    ColumnFiltersState,
    SortingState,
    ColumnDef,
} from "@tanstack/react-table"
import { ChevronDown, SearchIcon, } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useGetAllTransactionsQuery } from "@/redux/features/transaction/transaction.api"


export type Payment = {
    date: string
    amount: number
    status: "pending" | "completed" | "failed" | "reversed"
    transactionId: string
    type: "add_money" | "withdraw" | "send_money" | "cash_in" | "cash_out" | "commission" | "cashout_fee" | "send_money_fee"
}

export const columns: ColumnDef<Payment>[] = [

    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => (
            <div>{row.getValue("createdAt")?.split("T")[0]}</div>
        ),
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("type").split("_").join(" ")}</div>
        ),
    },
    {
        accessorKey: "amount",
        header: () => <div>Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button variant="ghost">
                    Status
                </Button>
            )
        },
        cell: ({ row }) => <div className={`capitalize w-fit px-1 py-[0.5px] rounded text-white font-medium ${row.getValue("status") === "completed" ? "bg-violet-500" : "bg-red-400"}`}>{row.getValue("status")}</div>,
    },
    {
        accessorKey: "transactionId",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost">
                    Trx. Id
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("transactionId")}</div>,
    },
]

export function DataTableDemo() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [typeFilter, setTypeFilter] = React.useState<string | null>(null)

    // available payment types (keep in sync with Payment.type)
    const PAYMENT_TYPES: string[] = [
        "all",
        "add_money",
        "withdraw",
        "send_money",
        "cash_in",
        "cash_out",
        "commission",
        "cashout_fee",
        "send_money_fee",
    ]

    const { data: apiResponse } = useGetAllTransactionsQuery(undefined)
    const tableData: Payment[] = React.useMemo(() => {
        if (Array.isArray(apiResponse)) return apiResponse
        if (apiResponse && Array.isArray((apiResponse as any).data)) return (apiResponse as any).data
        return []
    }, [apiResponse])

    // memoize the visible rows so the reference is stable unless tableData changes
    const visibleData = React.useMemo(() => tableData.slice(0, 10), [tableData])



    const table = useReactTable({
        data: visibleData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })

    return (
        <div className="w-full">
            <div>
                <h2 className="text-violet-700 text-2xl font-bold mt-6">Recent Transactions</h2>
            </div>
            <div className="flex items-center py-2">
                <div className="relative inline-block">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                        <SearchIcon className="h-4 w-4" />
                    </span>

                    <Input
                        placeholder="Search with transaction id..."
                        value={(table.getColumn("transactionId")?.getFilterValue() as string) ?? ""}
                        onChange={(event) => table.getColumn("transactionId")?.setFilterValue(event.target.value)}
                        className="max-w-sm pl-10" // add left padding so text doesn't overlap the icon
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Filter type {typeFilter ? `: ${typeFilter}` : ""}
                            <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-auto min-w-[12rem]">
                        <div className="flex flex-col">
                            {PAYMENT_TYPES.map((t) => (
                                <DropdownMenuItem
                                    key={t}
                                    className={`text-left px-3 py-2 hover:bg-muted/50 capitalize ${t === typeFilter ? "font-medium" : "font-normal"}`}
                                    onSelect={() => {
                                        const value = t === "all" ? undefined : t
                                        setTypeFilter(t === "all" ? null : t)
                                        table.getColumn("type")?.setFilterValue(value)
                                        table.setPageIndex(0)
                                    }}
                                >
                                    {t === "all" ? "All types" : t.replaceAll("_", " ")}
                                </DropdownMenuItem>
                            ))}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div> */}
        </div >
    )
}
