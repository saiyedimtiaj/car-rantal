import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { TBooking } from "@/types/booking.interface";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormEvent } from "react";
import { Button } from "../ui/button";
import { useUpdateBookingMutation } from "@/redux/feature/booking/bookingApi";
import { toast } from "sonner";

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    bookingData: TBooking | null;
};

const UpdateBookingModal = ({ isOpen, setIsOpen, bookingData }: Props) => {
    const [updateBooking, { isLoading }] = useUpdateBookingMutation()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        try {
            const date = form.elements.namedItem("date") as HTMLInputElement;
            const startTime = form.elements.namedItem("startTime") as HTMLInputElement;
            const data = { date: date.value, startTime: startTime.value };
            const res = await updateBooking({ id: bookingData?._id, payload: data }).unwrap()
            toast.success(res.message)
        } catch (err: any) {
            toast.error(err?.data?.message)
        }
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <DialogContent className="font-epilogue max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Booking</DialogTitle>
                    <DialogDescription>Change the booking details as needed.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center gap-4">
                        <div className="w-1/2">
                            <Label>Start Time</Label>
                            <Input name="startTime" type="time" defaultValue={bookingData?.startTime} />
                        </div>
                        <div className="w-1/2">
                            <Label>Date</Label>
                            <Input name="date" min={today} type="date" defaultValue={bookingData?.date} />
                        </div>
                    </div>
                    <Button type="submit" className="mt-4">{
                        isLoading ? "Loading..." : "Update Booking"
                    }</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateBookingModal;
