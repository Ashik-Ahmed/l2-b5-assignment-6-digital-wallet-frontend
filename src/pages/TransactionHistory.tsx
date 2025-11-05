/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
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
import { ArrowUpDown, ChevronDown, SearchIcon, } from "lucide-react"

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
import type { Transaction } from '@/components/modules/dashboard/DataTable'
import { useGetAllTransactionsQuery } from '@/redux/features/transaction/transaction.api'

const columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const dateValue = row.getValue("createdAt") as string
            return <div>{dateValue?.split("T")[0]}</div>
        },
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
            const typeValue = row.getValue("type") as string
            return <div className="capitalize">{typeValue.split("_").join(" ")}</div>
        },
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Amount
                    <ArrowUpDown />
                </Button>
            )
        },
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
        accessorKey: "fromWallet",
        header: () => {
            return (
                <Button
                    variant="ghost">
                    From Wallet
                </Button>
            )
        },
        cell: ({ row }: any) => <div>{row.getValue("fromWallet")?.phone || 'N/A'}</div>,
    },
    {
        accessorKey: "toWallet",
        header: () => {
            return (
                <Button
                    variant="ghost">
                    To Wallet
                </Button>
            )
        },
        cell: ({ row }: any) => <div>{row.getValue("toWallet")?.phone || 'N/A'}</div>,
    },
    {
        accessorKey: "status",
        header: () => {
            return (
                <Button variant="ghost">
                    Status
                </Button>
            )
        },
        cell: ({ row }) => <div className={`capitalize w-fit px-1 py-[0.5px] rounded font-medium ${row.getValue("status") === "completed" ? "bg-green-100 text-green-700" : "bg-red-400"}`}>{row.getValue("status")}</div>,
    },
    {
        accessorKey: "transactionId",
        header: () => {
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

const TransactionHistory = () => {
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
    const tableData: Transaction[] = React.useMemo(() => {
        if (Array.isArray(apiResponse)) return apiResponse
        if (apiResponse && Array.isArray((apiResponse as any).data)) return (apiResponse as any).data
        return []
    }, [apiResponse])


    const table = useReactTable({
        data: tableData,
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
                <h2 className="text-2xl font-bold text-violet-700">Transaction List</h2>
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
            <div className="flex items-center justify-end space-x-2 py-4">
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
            </div>
        </div >
    )
}

export default TransactionHistory