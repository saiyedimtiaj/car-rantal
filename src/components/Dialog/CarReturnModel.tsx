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
import { Button } from "../ui/button";
import { FormEvent } from "react";
import { useReturnCarByUserMutation } from "@/redux/feature/cars/carsApi";
import { toast } from "sonner";

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    bookingData: TBooking | null
};

const CarReturnModel = ({ isOpen, setIsOpen, bookingData }: Props) => {
    const [returnCar, { isLoading }] = useReturnCarByUserMutation();


    const handleReturn = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const form = e.currentTarget
            const endTime = form.elements.namedItem("endTime") as HTMLInputElement;
            const data = { endTime: endTime.value, bookingId: bookingData?._id }
            const res = await returnCar(data).unwrap()
            // toast.success(res.message)
            window.location.href = res?.data?.payment_url
            setIsOpen(false)
        } catch (err: any) {
            toast.error(err.data?.message)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <DialogContent className="font-epilogue max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Car Return</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <form onSubmit={handleReturn}>
                    <div className="flex items-center gap-3">
                        <div className="w-1/2">
                            <Label>Start Time</Label>
                            <Input type="time" defaultValue={bookingData?.startTime} disabled />
                        </div>
                        <div className="w-1/2">
                            <Label>End Time</Label>
                            <Input type="time" name="endTime" min={bookingData?.startTime} />
                        </div>
                    </div>
                    <Button className="mt-4">{isLoading ? "Loading..." : "Pay"}</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CarReturnModel;