/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAgentApprovalByAdminMutation, useGetAllUsersByAdminQuery } from "@/redux/features/admin/admin.api"
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
import { ChevronDown, Edit, SearchIcon, } from "lucide-react"

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
import { useMemo, useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [roleFilter, setTypeFilter] = useState<string | null>(null)
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
                <DropdownMenu>
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

export default AdminManageUsers


function UpdateUserModal({ user, updateProfileHandler }: { user: any, updateProfileHandler: SubmitHandler<FieldValues> }) {
    const [editUserDialog, setEditUserDialog] = useState(false);
    // console.log(user)
    const form = useForm({
        defaultValues: {
            name: user?.name ?? "",
            phone: user?.phone ?? "",
            role: user?.role ?? "",
            email: user?.email ?? "",
            isActive: user?.isActive ?? "active",
            isApproved: user?.isApproved ?? "approved",
        },
    });

    const handleEditUser: SubmitHandler<FieldValues> = async (updatedData) => {
        console.log("form data:", updatedData);
    }

    return (
        <Dialog open={editUserDialog} onOpenChange={setEditUserDialog}>
            <DialogTrigger asChild>
                <Button size="sm" onClick={() => { form.reset({ name: user?.name ?? "", phone: user?.phone ?? "", role: user?.role ?? "", email: user?.email ?? "", isActive: user?.isActive ?? "active", isApproved: user?.isApproved ?? "approved" }); setEditUserDialog(true); }}>
                    <Edit className="h-4 w-4" />
                    Edit
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update user</DialogTitle>
                    <DialogDescription>
                        Make changes to the user info here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(async (values) => {
                        try {
                            const ok = await handleEditUser(values);
                            // reset only on success
                            if (ok) {
                                form.reset();
                            }
                        } catch (err) {
                            console.error("Update failed:", err);
                        } finally {
                            // always close dialog whether update succeeded or failed
                            setEditUserDialog(false);
                        }
                    })} className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={user?.name || "Your Name"}
                                            value={field.value ?? user?.name}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={user?.email || "Your Email"}
                                            value={field.value ?? user?.email}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={user?.phone || "Your Phone"}
                                            value={field.value ?? user?.phone}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isActive"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Active Status</FormLabel>
                                    <FormControl>
                                        <Select>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Active Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isApproved"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Approve Status</FormLabel>
                                    <FormControl>
                                        <Select>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Approve Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="approve">Approve</SelectItem>
                                                <SelectItem value="notApprove">Not Approve</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="mt-2">
                            <DialogClose asChild>
                                <Button variant="outline" onClick={() => setEditUserDialog(false)}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

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
                            <Label htmlFor="isApproved" className={`capitalize w-fit px-1 py-1 rounded font-medium ${(row.getValue("isApproved") === true ? "bg-blue-400 text-white" : "bg-gray-200")}`}>
                                {row.getValue("isApproved") === true ? "Approved" : "Not Approved"}
                            </Label>
                        </div>
                    </div>
                    :
                    <div>N/A</div>
            }
        </div>
    )
}