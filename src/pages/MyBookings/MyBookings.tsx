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
import { Edit3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useGetMyBookingsQuery, useRejectBookingMutation } from "@/redux/feature/booking/bookingApi"
import { TBooking } from "@/types/booking.interface"
import { Badge } from "@/components/ui/badge"
import { CaretSortIcon } from "@radix-ui/react-icons"
import UpdateBookingModal from "@/components/Dialog/UpdateBookingModal"
import { toast } from "sonner"
import CarReturnModel from "@/components/Dialog/CarReturnModel"


function MyBookings() {
    const { data, isLoading } = useGetMyBookingsQuery(undefined);
    const [isReturnModalOpen, setIsReturnModalOpen] = React.useState(false)
    const [isOpen, setIsOpen] = React.useState(false)
    const [rejectBooking] = useRejectBookingMutation()
    const [bookingData, setBookingData] = React.useState<TBooking | null>(null)
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

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
                <img className="w-16 h-16 object-cover rounded" src={row.original.car.image} alt="" />
            </div>,
        },
        {
            accessorKey: "name",
            header: () => <div>Model</div>,
            cell: ({ row }) => <div className="font-medium">
                {row.original.car.name}
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
                return <div className="font-medium">{row.original.startTime}</div>
            },
        },
        {
            accessorKey: "price",
            header: () => <div>Total Cost</div>,
            cell: ({ row }) => {
                const amount = row.original.totalCost
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "BDT",
                }).format(amount)

                return <div className="font-medium">{formatted}</div>
            },
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Booked At
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return <div className="font-medium">{row.original.createdAt}</div>
            },
        },
        {
            accessorKey: "Action",
            header: () => <div>Action</div>,
            cell: ({ row }) => {
                const id = row.original._id;
                return (
                    row.original.status === "panding" ? <div className="flex items-center gap-2">
                        <Button onClick={() => {
                            setIsOpen(true);
                            setBookingData(row.original)
                        }} className="px-2 py-0"><Edit3 size={15} /></Button>
                        <Button className="px-2 py-0" onClick={() => handleReject(id)}>Cancel</Button>
                    </div> : row.original.status === "approve" ? <Button onClick={() => {
                        setIsReturnModalOpen(true)
                        setBookingData(row.original)
                    }}>Return</Button> : row.original.status === "success" ? <Badge className={"bg-purple-600 text-white"}>{row.original.status}</Badge> : <Badge className={"bg-red-600 text-white"}>{row.original.status}</Badge>

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

    return (
        <div className="container mx-auto px-4 font-epilogue mt-12">
            <h1 className="text-3xl font-semibold md:text-5xl text-center mb-8">Bookings Management</h1>
            <div className="border">
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
                            table.getRowModel()?.rows.map((row) => (
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
                    {table.getFilteredSelectedRowModel()?.rows?.length} of{" "}
                    {table.getFilteredRowModel()?.rows?.length} row(s) selected.
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
            <UpdateBookingModal setIsOpen={setIsOpen} isOpen={isOpen} bookingData={bookingData} />
            <CarReturnModel isOpen={isReturnModalOpen} setIsOpen={setIsReturnModalOpen} bookingData={bookingData} />
        </div>
    );
}

export default MyBookings;