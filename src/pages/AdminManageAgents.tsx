/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAgentApprovalByAdminMutation, useGetAllAgentsByAdminQuery } from "@/redux/features/admin/admin.api"
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import type {
    SortingState,
    ColumnDef,
} from "@tanstack/react-table"
import { SearchIcon, } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useMemo, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export type User = {
    name: string
    email: string
    phone: string
    role: string
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div>{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <div>{row.getValue("email")}</div>
        ),
    },
    {
        accessorKey: "phone",
        header: () => <div>Phone</div>,
        cell: ({ row }) => {
            return <div className="font-medium">{row.getValue("phone")}</div>
        },
    },
    {
        accessorKey: "role",
        header: ({ column }) => {
            return (
                <Button variant="ghost">
                    Role
                </Button>
            )
        },
        cell: ({ row }) => <div className={`capitalize w-fit px-1 py-[0.5px] rounded text-white font-medium ${row.getValue("role") === "user" ? "bg-gray-500" : (row.getValue("role") === "admin" ? "bg-violet-500" : "bg-blue-400")}`}>{row.getValue("role")}</div>,
    },
    {
        accessorKey: "isApproved",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost">
                    Agent Approval
                </Button>
            )
        },
        cell: ({ row }) => <div>
            <AgentIsApprovedCell row={row} />
        </div>,
    },
    {
        accessorKey: "isActive",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost">
                    Status
                </Button>
            )
        },
        cell: ({ row }) => <div className={`w-fit px-1 py-[0.5px] rounded text-white font-medium ${row.getValue("isActive") ? "bg-green-500" : "bg-red-500"} capitalize`}>{row.getValue("isActive") ? "active" : "inactive"}</div>,
    },

]

const AdminManageAgents = () => {
    const [sorting, setSorting] = useState<SortingState>([])
    const { data: userData } = useGetAllAgentsByAdminQuery(undefined)

    const tableData: User[] = useMemo(() => {
        if (Array.isArray(userData)) return userData
        if (userData && Array.isArray((userData as any).data)) return (userData as any).data
        return []
    }, [userData])



    const table = useReactTable({
        data: tableData,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    })

    return (
        <div className="w-full">
            <div>
                <h2 className="text-2xl font-bold text-violet-700">Agent List</h2>
            </div>
            <div className="flex items-center py-2">
                <div className="relative inline-block">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                        <SearchIcon className="h-4 w-4" />
                    </span>

                    <Input
                        placeholder="Search with phone..."
                        value={(table.getColumn("phone")?.getFilterValue() as string) ?? ""}
                        onChange={(event) => table.getColumn("phone")?.setFilterValue(event.target.value)}
                        className="max-w-sm pl-10" // add left padding so text doesn't overlap the icon
                    />
                </div>
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

export default AdminManageAgents


function AgentIsApprovedCell({ row }: { row: any }) {
    const [agentApprovalByAdmin] = useAgentApprovalByAdminMutation();

    const handleAgentApproval = async (id: any, isApproved: boolean) => {

        try {
            const result = await agentApprovalByAdmin({ id, isApproved }).unwrap();

            if (result.success) {
                toast.success("Agent status updated successfully");
            }
            else {
                toast.error("Failed to update agent status");
            }
        } catch (err: any) {

            toast.error(err?.data?.message || "Failed to update agent status");
        }
    }

    return (
        <div>
            {
                row.getValue("role") === "agent" ?
                    <div>
                        {/* <div className={`capitalize w-fit px-1 py-[0.5px] rounded font-medium ${(row.getValue("isApproved") === true ? "bg-blue-400 text-white" : "")}`}>
                            {row.getValue("isApproved") === true ? "Approved" : "Not Approved"}
                        </div> */}
                        <div className="flex items-center space-x-2">
                            <Switch id="isApproved" checked={row.getValue("isApproved")} onCheckedChange={(value) => handleAgentApproval(row.original._id, value)} />
                            <Label htmlFor="isApproved" className={`capitalize w-fit px-1 py-1 rounded font-medium ${(row.getValue("isApproved") === true ? "bg-blue-400 text-white" : "bg-red-100 text-red-700")}`}>
                                {row.getValue("isApproved") === true ? "Approved" : "Suspended"}
                            </Label>
                        </div>
                    </div>
                    :
                    <div>N/A</div>
            }
        </div>
    )
}