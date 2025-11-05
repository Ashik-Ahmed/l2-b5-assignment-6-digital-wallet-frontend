/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllUsersByAdminQuery, useUpdateUserByAdminMutation } from "@/redux/features/admin/admin.api"
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
import { Eye, SearchIcon, } from "lucide-react"

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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export type User = {
    name: string
    email: string
    phone: string
    role: string
}

const columns: ColumnDef<User>[] = [
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
        accessorKey: "isActive",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost">
                    Status
                </Button>
            )
        },
        // cell: ({ row }) => <div className={`w-fit px-1 py-[0.5px] rounded text-white font-medium ${row.getValue("isActive") ? "bg-green-500" : "bg-red-500"} capitalize`}>{row.getValue("isActive") ? "active" : "inactive"}</div>,
        cell: ({ row }) => <div>
            <UserIsActiveCell row={row} />
        </div>,
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
        cell: ({ row }) => <div>
            {/* <Button onClick={() => { console.log(row.original); }} className="text-xs text-white font-medium bg-blue-400 px-2  rounded">Edit</Button> */}
            <UpdateUserModal user={row.original} />
            {/* <Button className="text-xs text-white font-medium bg-red-400 px-2  rounded ml-2">Delete</Button> */}
        </div>,
    },
]

const AdminManageUsers = () => {
    const [sorting, setSorting] = useState<SortingState>([])
    const { data: userData } = useGetAllUsersByAdminQuery(undefined)


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
                <h2 className="text-2xl font-bold text-violet-700">User List</h2>
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
                {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Filter role {roleFilter ? `: ${roleFilter}` : ""}
                            <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-auto min-w-[12rem]">
                        <div className="flex flex-col">
                            {["all", "agent", "user", "admin"].map((t) => (
                                <DropdownMenuItem
                                    key={t}
                                    className={`text-left px-3 py-2 hover:bg-muted/50 capitalize ${t === roleFilter ? "font-medium" : "font-normal"}`}
                                    onSelect={() => {
                                        const value = t === "all" ? undefined : t
                                        setTypeFilter(t === "all" ? null : t)
                                        table.getColumn("role")?.setFilterValue(value)
                                        table.setPageIndex(0)
                                    }}
                                >
                                    {t === "all" ? "All types" : t.replaceAll("_", " ")}
                                </DropdownMenuItem>
                            ))}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu> */}
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

export default AdminManageUsers


function UpdateUserModal({ user }: { user: any }) {
    const [viewUserDialog, setViewUserDialog] = useState(false);

    return (
        <Dialog open={viewUserDialog} onOpenChange={setViewUserDialog}>
            <DialogTrigger asChild>
                <Button size="sm" onClick={() => { setViewUserDialog(true); }}>
                    {/* <Edit className="h-4 w-4" /> */}
                    <Eye className="h-4 w-4" />
                    View
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[450px] rounded-lg border border-gray-200 shadow-lg bg-white dark:bg-neutral-900 dark:border-neutral-800">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        User Details
                    </DialogTitle>
                    <DialogDescription>
                        View basic information about this user.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-3 gap-3 text-sm">
                        <span className="font-medium text-gray-500 dark:text-gray-400">
                            Name:
                        </span>
                        <span className="col-span-2 text-gray-900 dark:text-gray-100">
                            {user?.name || "N/A"}
                        </span>

                        <span className="font-medium text-gray-500 dark:text-gray-400">
                            Email:
                        </span>
                        <span className="col-span-2 text-gray-900 dark:text-gray-100 break-all">
                            {user?.email || "N/A"}
                        </span>

                        <span className="font-medium text-gray-500 dark:text-gray-400">
                            Phone:
                        </span>
                        <span className="col-span-2 text-gray-900 dark:text-gray-100">
                            {user?.phone || "N/A"}
                        </span>

                        <span className="font-medium text-gray-500 dark:text-gray-400">
                            Role:
                        </span>
                        <span className="col-span-2 text-gray-900 dark:text-gray-100 capitalize">
                            {user?.role || "N/A"}
                        </span>

                        <span className="font-medium text-gray-500 dark:text-gray-400">
                            Status:
                        </span>
                        <span className="col-span-2">
                            <span
                                className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${user?.isActive
                                    ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
                                    : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100"
                                    }`}
                            >
                                {user?.isActive ? "Active" : "Blocked"}
                            </span>
                        </span>

                        {/* <span className="font-medium text-gray-500 dark:text-gray-400">
                            Approval:
                        </span>
                        <span className="col-span-2">
                            <span
                                className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${user?.isApproved === "approved"
                                        ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100"
                                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100"
                                    }`}
                            >
                                {user?.isApproved === "approved" ? "Approved" : "Pending"}
                            </span>
                        </span> */}
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <Button
                        variant="outline"
                        onClick={() => setViewUserDialog(false)}
                        className="text-sm"
                    >
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

function UserIsActiveCell({ row }: { row: any }) {
    const [updateUserByAdmin] = useUpdateUserByAdminMutation();

    const handleUserActiveStatus = async (id: any, data: any) => {
        try {
            const result = await updateUserByAdmin({ id, data }).unwrap();

            if (result.success) {
                toast.success("User updated successfully");
            }
            else {
                toast.error("Failed to update user");
            }
        } catch (err: any) {

            toast.error(err?.data?.message || "Failed to update user");
        }
    }

    return (
        <div>
            <div>
                {/* <div className={`capitalize w-fit px-1 py-[0.5px] rounded font-medium ${(row.getValue("isApproved") === true ? "bg-blue-400 text-white" : "")}`}>
                            {row.getValue("isApproved") === true ? "Approved" : "Not Approved"}
                        </div> */}
                <div className="flex items-center space-x-2">
                    <Switch id="isActive" checked={row.getValue("isActive")} onCheckedChange={(value) => handleUserActiveStatus(row.original._id, { isActive: value })} />
                    <Label htmlFor="isActive" className={`capitalize w-fit px-1 py-1 rounded font-medium ${(row.getValue("isActive") === true ? "bg-blue-400 text-white" : "bg-red-100 text-red-700")}`}>
                        {row.getValue("isActive") === true ? "Active" : "Blocked"}
                    </Label>
                </div>
            </div>
        </div>
    )
}