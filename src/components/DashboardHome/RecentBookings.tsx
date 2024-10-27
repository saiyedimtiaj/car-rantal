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
import { useApproveBookingMutation, useRejectBookingMutation } from "@/redux/feature/booking/bookingApi"
import { TBooking } from "@/types/booking.interface"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { useGetRecentBookingQuery } from "@/redux/feature/analysis/analysisApi"


function RecentBookings() {
    const { data, isLoading, error } = useGetRecentBookingQuery(undefined);
    const [approveBooking] = useApproveBookingMutation()
    const [rejectBooking] = useRejectBookingMutation()
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const handleApprove = async (id: string) => {
        try {
            const res = await approveBooking(id).unwrap()
            toast.success(res.message)
        }
        catch (err: any) {
            toast.error(err?.data?.message)
        }
    }
    const handleReject = async (id: string) => {
        try {
            const res = await rejectBooking(id).unwrap()
            toast.success(res.message)
        }
        catch (err: any) {
            toast.error(err?.data?.message)
        }
    }

    const columns: ColumnDef<TBooking>[] = [
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
                return (
                    row.original.status === "panding" ? <div className="flex items-center gap-2">
                        <Button className="px-2 py-0" onClick={() => handleApprove(id)}>Approve</Button>
                        <Button className="px-2 py-0" onClick={() => handleReject(id)}>Cancel</Button>
                    </div> : <Badge className={row.original.status === "reject" ? "bg-red-600 text-white" : "bg-purple-600 text-white"}>{row.original.status}</Badge>
                )
            },
        },
    ]


    const table = useReactTable({
        data: data?.data,
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
    if (error) {
        console.log(error);
        return <p>Somthing went wrong</p>;
    }

    return (
        <div className="w-full mt-8">
            <h1 className="text-2xl font-bold">Recent Bookings</h1>
            <div className="border mt-3">
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
                        {table.getRowModel()?.rows?.length ? (
                            table.getRowModel()?.rows?.map((row) => (
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
        </div>
    );
}

export default RecentBookings;