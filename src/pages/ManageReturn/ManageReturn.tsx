import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useCarBackMutation, useManageAllCarsQuery } from "@/redux/feature/cars/carsApi"
import { TCar } from "@/types/car.interface"
import { toast } from "sonner"


function ManageReturn() {
    const { data, isLoading } = useManageAllCarsQuery(undefined)
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [carBack] = useCarBackMutation()
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const handleReturn = async (id: string) => {
        try {
            const res = await carBack(id).unwrap()
            toast.success(res.message)
        } catch (err: any) {
            toast.error(err.data?.message)
        }
    }


    const columns: ColumnDef<TCar>[] = [
        {
            accessorKey: "image",
            header: () => <div>Image</div>,
            cell: ({ row }) => <div>
                <img className="w-16 h-16 object-cover" src={row.getValue("image")} alt="" />
            </div>,
        },
        {
            accessorKey: "name",
            header: () => <div>Name</div>,
            cell: ({ row }) => <div className="font-medium">
                {row.getValue("name")}
            </div>,
        },
        {
            accessorKey: "status",
            header: () => <div>Status</div>,
            cell: ({ row }) => {
                return <div className="font-medium">{row.getValue("status")}</div>
            },
        },
        {
            accessorKey: "Action",
            header: () => <div>Action</div>,
            cell: ({ row }) => {
                return <div className="flex items-center gap-2">
                    <Button disabled={row.getValue("status") !== "return"} onClick={() => handleReturn(row.original._id)} className="px-2 py-0">Return</Button>
                </div>
            },
        },
    ]

    const table = useReactTable({
        data: data?.data || [],
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    if (isLoading) {
        return <p>Loading....</p>
    }

    return (
        <div className="w-full">
            <div className="mb-4">
                <h1 className="text-3xl font-semibold">Manage Cars</h1>
                <p>Manage all cars that are not abailable right now!</p>
            </div>
            <div className="border">
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
                                    data-state={row.getIsSelected() && "selected"}
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
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
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
        </div>
    )
}

export default ManageReturn