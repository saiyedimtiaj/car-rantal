import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Props = {
    setSearchParams: any;
    searchParams: any;
};

export default function SearchForm({ searchParams, setSearchParams }: Props) {
    const [formData, setFormData] = useState({
        location: searchParams.get("location") || "",
        category: searchParams.get("category") || "",
        date: searchParams.get("date") || "",
    });

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDateChange = (date: Date | undefined) => {
        if (date) {
            setFormData((prevData) => ({
                ...prevData,
                date: format(date, "yyyy-MM-dd"),
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.location || !formData.category || !formData.date) {
            toast.error("All fields are required.");
            return;
        }

        const updatedParams = {
            location: formData.location,
            category: formData.category,
            date: formData.date,
        };

        setSearchParams(updatedParams);
    };


    return (
        <div className="container mx-auto px-4 mt-16">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col lg:flex-row items-center gap-5 justify-center rounded-lg bg-gray-100 dark:bg-gray-900 lg:px-10 px-8 py-8 max-w-4xl mx-0 md:mx-auto"
            >
                {/* Location Field */}
                <div className="flex flex-col w-full md:w-auto">
                    <label className="mb-2">Select Location</label>
                    <Select
                        onValueChange={(value) => handleSelectChange("location", value)}
                        defaultValue={formData.location}
                    >
                        <SelectTrigger className="w-full md:w-[240px]">
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
                </div>

                {/* Category Field */}
                <div className="flex flex-col w-full md:w-auto">
                    <label className="mb-2">Select Category</label>
                    <Select
                        onValueChange={(value) => handleSelectChange("category", value)}
                        defaultValue={formData.category}
                    >
                        <SelectTrigger className="w-full md:w-[240px]">
                            <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="sub">SUV</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                            <SelectItem value="sedan">Sedan</SelectItem>
                            <SelectItem value="coupe">Coupe</SelectItem> {/* Corrected spelling */}
                            <SelectItem value="luxury">Luxury</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Booking Date Field */}
                <div className="flex flex-col w-full md:w-auto">
                    <label className="mb-2">Booking Date</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "md:w-[240px] pl-3 text-left font-normal",
                                    !formData.date && "text-muted-foreground"
                                )}
                            >
                                {formData.date ? (
                                    format(new Date(formData.date), "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={formData.date ? new Date(formData.date) : undefined}
                                onSelect={handleDateChange}
                                disabled={(date) =>
                                    date < new Date()
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <Button type="submit" className="lg:mt-6">
                    Search
                </Button>
            </form>
        </div>
    );
}
