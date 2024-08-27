import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import moment from "moment"
import { useCreateBookingMutation } from "@/redux/feature/booking/bookingApi";
import { toast } from "sonner";

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: string
};

type FormValues = {
    passport: string;
    license: string;
    address: string;
    date: Date | undefined;
    time: string;
};

const BookingModal = ({ isOpen, setIsOpen, id }: Props) => {
    const [createBooking, { isLoading }] = useCreateBookingMutation()
    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            passport: "",
            license: "",
            address: "",
            date: undefined,
            time: "",
        },
    });

    const onSubmit = async (data: FormValues) => {
        try {
            const formattedDate = data.date ? moment(data.date).format("YYYY-MM-DD") : undefined;
            const bookingData = {
                carId: id,
                date: formattedDate,
                passport: data.passport,
                license: data?.license,
                address: data?.address,
                startTime: data.time
            }
            const res = await createBooking(bookingData).unwrap()
            toast.success(res.message)
        } catch (err: any) {
            toast.error(err?.data?.message)
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <DialogContent className="font-epilogue max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Booking</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center gap-3">
                        <div className="w-1/2">
                            <Label>NID/Passport</Label>
                            <Input {...register("passport", { required: "This field is required" })} />
                            {errors.passport && <span className="text-red-600">{errors.passport.message}</span>}
                        </div>
                        <div className="w-1/2">
                            <Label>Driving License</Label>
                            <Input {...register("license", { required: "This field is required" })} />
                            {errors.license && <span className="text-red-600">{errors.license.message}</span>}
                        </div>
                    </div>
                    <div className="w-full mt-2">
                        <Label>Address</Label>
                        <Input {...register("address", { required: "This field is required" })} />
                        {errors.address && <span className="text-red-600">{errors.address.message}</span>}
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                        <div className="w-1/2">
                            <Label>Date</Label>
                            <Controller
                                control={control}
                                name="date"
                                rules={{ required: "This field is required" }}
                                render={({ field }) => (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? format(field.value, "yyyy-MM-dd") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={(date) => field.onChange(date)}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                )}
                            />
                            {errors.date && <span className="text-red-600">{errors.date.message}</span>}
                        </div>
                        <div className="w-1/2">
                            <Label>Time</Label>
                            <Input
                                type="time"
                                {...register("time", { required: "This field is required" })}
                                onChange={(e) => setValue("time", e.target.value)}
                            />
                            {errors.time && <span className="text-red-600">{errors.time.message}</span>}
                        </div>
                    </div>
                    <div className="mt-4">
                        <Button type="submit" className="w-full">{isLoading ? "Loading..." : "Book"}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default BookingModal;
