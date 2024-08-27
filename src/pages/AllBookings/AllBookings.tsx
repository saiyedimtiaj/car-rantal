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
import { useGetAllBookingsQuery } from "@/redux/feature/booking/bookingApi"
import { TBooking } from "@/types/booking.interface"

export const columns: ColumnDef<TBooking>[] = [
    {
        accessorKey: "image",
        header: () => <div>Image</div>,
        cell: ({ row }) => <div>
            <img className="w-16 h-16 object-cover rounded" src={row?.original?.car?.image} alt="" />
        </div>,
    },
    {
        accessorKey: "name",
        header: () => <div>Model</div>,
        cell: ({ row }) => <div className="font-medium">
            {row?.original?.car?.name}
        </div>,
    },
    {
        accessorKey: "email",
        header: () => <div>Email</div>,
        cell: ({ row }) => <div className="font-medium">
            {row?.original?.user?.email}
        </div>,
    },
    {
        accessorKey: "date",
        header: () => <div>Date</div>,
        cell: ({ row }) => {
            return <div className="font-medium">{row.original.date}</div>
        },
    },
    {
        accessorKey: "time",
        header: () => <div>Start Time</div>,
        cell: ({ row }) => {
            return <div className="font-medium">{row?.original?.startTime}</div>
        },
    },
    {
        accessorKey: "Action",
        header: () => <div>Action</div>,
        cell: ({ row }) => {
            const id = row.original._id;
            console.log(id);
            return <div className="flex items-center gap-2">
                <Button className="px-2 py-0">Approve</Button>
                <Button className="px-2 py-0">Cancel</Button>
            </div>
        },
    },
]

function AllBookings() {
    const { data, isLoading } = useGetAllBookingsQuery(undefined);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    // Ensure that data is available before passing it to useReactTable
    const tableData = data?.data ?? []; // Provide an empty array if data is undefined

    const table = useReactTable({
        data: tableData,
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
    });

    if (isLoading) {
        return <p>Loading....</p>;
    }

    return (
        <div className="w-full">
            <h1 className="text-xl font-bold">Bookings</h1>
            <p className="text-gray-500">Manage all booking and view their sales performance.</p>
            <div className="border mt-5">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
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
    );
}

export default AllBookings;