import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import moment from "moment"
import { useNavigate } from "react-router-dom";

const FormSchema = z.object({
    dob: z.date(),
    location: z.string(),
});

export function CalendarSelectForm() {
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const startDate = moment(data.dob).format("YYYY-MM-DD");
        navigate(`/cars?startDate=${startDate}&location=${data?.location}`)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row items-center gap-5 justify-center rounded-lg bg-[#F3F4F6] dark:bg-[#111827] px-8 py-8 max-w-4xl mx-6 md:mx-auto">
                {/* Booking Date Field */}
                <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel className="text-left">Booking Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date < new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                        className="border dark:border-gray-700 rounded-md"
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription className="text-start">
                                Select your preferred booking date
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Location Field */}
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Select Location</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-[240px] bg-[#FFFFFF] dark:bg-[#020817] hover:bg-[#F3F4F6] dark:hover:bg-[#111827]">
                                        <SelectValue placeholder="Select a Location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="dhaka">Dhaka</SelectItem>
                                        <SelectItem value="chittagong">Chittagong</SelectItem>
                                        <SelectItem value="rajshahi">Rajshahi</SelectItem>
                                        <SelectItem value="khulna">Khulna</SelectItem>
                                        <SelectItem value="barisal">Barisal</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription>
                                Select your preferred rental location.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Search</Button>
            </form>
        </Form>
    );
}
