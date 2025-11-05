/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
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
import { ArrowUpDown, ChevronDown, Eye, SearchIcon, } from "lucide-react"

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
import { useGetAllTransactionsByAdminQuery } from '@/redux/features/admin/admin.api'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

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
            return <div> {typeValue?.split("_").join(" ")}</div>
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
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button variant="ghost">
                    Status
                </Button>
            )
        },
        cell: ({ row }) => <div className={`capitalize w-fit px-1 py-[0.5px] rounded font-medium ${row.getValue("status") === "completed" ? "bg-green-100 text-green-700" : "bg-red-400"}`}>{row.getValue("status")}</div>,
    },
    {
        accessorKey: "_id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost">
                    Trx. Id
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("_id")}</div>,
    },
    {
        accessorKey: "action",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost">
                    Action
                </Button>
            )
        },
        cell: ({ row }) => <div><TransactionDetailsCell row={row.original} /></div>,
    },
]

const AdminTransactionHistory = () => {
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

    const { data: apiResponse } = useGetAllTransactionsByAdminQuery(undefined)
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
                        value={(table.getColumn("_id")?.getFilterValue() as string) ?? ""}
                        onChange={(event) => table.getColumn("_id")?.setFilterValue(event.target.value)}
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

function TransactionDetailsCell({ row: transaction }: { row: any }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" onClick={() => { setOpen(true); }}>
                    {/* <Edit className="h-4 w-4" /> */}
                    <Eye className="h-4 w-4" />
                    Details
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[450px] rounded-lg border border-gray-200 shadow-lg bg-white dark:bg-neutral-900 dark:border-neutral-800">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        Transaction details
                    </DialogTitle>
                    <DialogDescription>
                        View details about this transaction
                    </DialogDescription>
                </DialogHeader>

                {/* Transaction details */}
                <div className="mt-4 space-y-3 text-sm">
                    <div className="grid grid-cols-3 gap-3">
                        <span className="text-gray-500 dark:text-gray-400 font-medium">Transaction ID:</span>
                        <span className="col-span-2 text-gray-900 dark:text-gray-100 break-all">
                            {transaction?._id ?? "N/A"}
                        </span>

                        <span className="text-gray-500 dark:text-gray-400 font-medium">Amount:</span>
                        <span className="col-span-2 text-gray-900 dark:text-gray-100">
                            $ {transaction?.amount?.toFixed(2) ?? "N/A"}
                        </span>

                        <span className="text-gray-500 dark:text-gray-400 font-medium">Type:</span>
                        <span className="col-span-2">
                            <span className="capitalize inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100">
                                {transaction?.type.split("_").join(" ") ?? "N/A"}
                            </span>
                        </span>

                        <span className="text-gray-500 dark:text-gray-400 font-medium">Status:</span>
                        <span className="col-span-2">
                            <span
                                className={`capitalize inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${transaction?.status === "completed"
                                    ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
                                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100"
                                    }`}
                            >
                                {transaction?.status ?? "N/A"}
                            </span>
                        </span>

                        <span className="text-gray-500 dark:text-gray-400 font-medium">From:</span>
                        <span className="col-span-2 text-gray-900 dark:text-gray-100">
                            {transaction?.fromWallet?.name ?? "N/A"}<br />
                            <span className="text-gray-500 text-xs">{transaction?.fromWallet?.phone ?? ""}</span>
                        </span>

                        <span className="text-gray-500 dark:text-gray-400 font-medium">To:</span>
                        <span className="col-span-2 text-gray-900 dark:text-gray-100">
                            {transaction?.toWallet
                                ? (
                                    <>
                                        {transaction.toWallet.name}<br />
                                        <span className="text-gray-500 text-xs">{transaction.toWallet.phone}</span>
                                    </>
                                )
                                : "N/A"}
                        </span>

                        <span className="text-gray-500 dark:text-gray-400 font-medium">Initiated By:</span>
                        <span className="col-span-2 text-gray-900 dark:text-gray-100">
                            {transaction?.initiatedBy?.name ?? "N/A"}<br />
                            <span className="text-gray-500 text-xs">{transaction?.initiatedBy?.phone ?? ""}</span>
                        </span>

                        <span className="text-gray-500 dark:text-gray-400 font-medium">Initiator Role:</span>
                        <span className="col-span-2 text-gray-900 dark:text-gray-100 capitalize">
                            {transaction?.initiatorRole ?? "N/A"}
                        </span>

                        <span className="text-gray-500 dark:text-gray-400 font-medium">Date:</span>
                        <span className="col-span-2 text-gray-900 dark:text-gray-100">
                            {transaction?.createdAt
                                ? new Date(transaction.createdAt).toLocaleString()
                                : "N/A"}
                        </span>

                        {/* <span className="text-gray-500 dark:text-gray-400 font-medium">Updated At:</span>
                        <span className="col-span-2 text-gray-900 dark:text-gray-100">
                            {transaction?.updatedAt
                                ? new Date(transaction.updatedAt).toLocaleString()
                                : "N/A"}
                        </span> */}
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="text-sm"
                    >
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AdminTransactionHistory