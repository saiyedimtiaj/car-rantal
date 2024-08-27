import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import { uploadImage } from "@/utils/uploadImage";
import { useCreateCarMutation } from "@/redux/feature/cars/carsApi";
import { toast } from "sonner";

const AddCar = () => {
    const [image, setImage] = useState<string | null>(null);
    const [file, setFile] = useState<any>();
    const [createCar, { isLoading }] = useCreateCarMutation()
    const {
        control,
        handleSubmit,
        setValue,
        watch,
    } = useForm({
        defaultValues: {
            name: "",
            location: "",
            features: "",
            color: "",
            category: "",
            passenger: "",
            luggage: "",
            doors: "",
            description: "",
            pricePerHour: ""
        },
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
        setFile(file);
    };

    const onSubmit = async (data: any) => {
        try {
            const imageData = await uploadImage(file);
            const features = data?.features.split(",")
            const carData = {
                ...data,
                features,
                pricePerHour: parseInt(data?.pricePerHour),
                passenger: parseInt(data?.passenger),
                luggage: parseInt(data?.luggage),
                doors: parseInt(data?.doors),
                image: imageData
            }
            const res = await createCar(carData).unwrap();
            console.log(carData);
            console.log(res);
            toast.success(res?.message)
        } catch (err: any) {
            console.log(err);
            toast.error(err?.data?.message as any)
        }
    };

    const SelectComponent = ({ name, options }: { name: string; options: { value: string; label: string }[] }) => {
        const selectedValue = watch(name as any)

        return (
            <Select
                value={selectedValue}
                onValueChange={(value) => setValue(name as any, value)}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={`Select a ${name}`} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        );
    };

    return (
        <div>
            <h1 className="text-3xl mb-8 md:text-5xl font-bold">Add Cars</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center gap-3">
                    <div className="w-full md:w-1/3">
                        <Label>Name</Label>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => <Input {...field} />}
                        />
                    </div>
                    <div className="w-full md:w-1/3">
                        <Label>Price</Label>
                        <Controller
                            name="pricePerHour"
                            control={control}
                            render={({ field }) => <Input {...field} type="number" />}
                        />
                    </div>
                    <div className="w-full md:w-1/3">
                        <Label>Location</Label>
                        <SelectComponent
                            name="location"
                            options={[
                                { value: "dhaka", label: "Dhaka" },
                                { value: "chittagong", label: "Chittagong" },
                                { value: "rajshahi", label: "Rajshahi" },
                                { value: "khulna", label: "Khulna" },
                                { value: "barisal", label: "Barisal" },
                            ]}
                        />
                    </div>
                </div>
                <div className="w-full mt-4">
                    <Label>Features</Label>
                    <Controller
                        name="features"
                        control={control}
                        render={({ field }) => <Input {...field} className="w-full" />}
                    />
                </div>
                <div className="flex flex-col md:flex-row mt-4 items-center gap-3">
                    <div className="w-full md:w-1/2">
                        <Label>Color</Label>
                        <SelectComponent
                            name="color"
                            options={[
                                { value: "White", label: "White" },
                                { value: "Blue", label: "Blue" },
                                { value: "Gray", label: "Gray" },
                                { value: "Black", label: "Black" },
                            ]}
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <Label>Category</Label>
                        <SelectComponent
                            name="category"
                            options={[
                                { value: "sub", label: "SUV" },
                                { value: "hybrid", label: "Hybrid" },
                                { value: "sedan", label: "Sedan" },
                                { value: "coupel", label: "Coupel" },
                                { value: "luxury", label: "Luxury" },
                            ]}
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <Label>Thumbnail</Label>
                    <div
                        onClick={() => document.querySelector<HTMLInputElement>(".input-Field")?.click()}
                        className="cursor-pointer mb-4"
                    >
                        <input
                            type="file"
                            hidden
                            name="files"
                            className="input-Field"
                            onChange={handleFileChange}
                        />
                        {image ? (
                            <img
                                className="w-full h-[250px] md:h-[500px] object-cover mt-1 rounded-md"
                                width={200}
                                height={200}
                                src={image}
                                alt={"Car Image"}
                            />
                        ) : (
                            <div className="flex items-center flex-col gap-1 mb-2 border-dashed border border-gray-500 py-8 rounded-md">
                                <span><FaCloudUploadAlt size={85} /></span>
                                <span className="font-medium">Upload Car Image</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-1/3">
                        <Label>Passenger</Label>
                        <Controller
                            name="passenger"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="number"
                                    min={1}
                                    placeholder="Number of passengers"
                                />
                            )}
                        />
                    </div>
                    <div className="w-1/3">
                        <Label>Luggage</Label>
                        <Controller
                            name="luggage"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="number"
                                    min={0}
                                    placeholder="Luggage capacity"
                                />
                            )}
                        />
                    </div>
                    <div className="w-1/3">
                        <Label>Doors</Label>
                        <Controller
                            name="doors"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="number"
                                    min={1}
                                    placeholder="Number of doors"
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="mt-3">
                    <Label>Description</Label>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <Textarea
                                {...field}
                                placeholder="Give a brief description..."
                                rows={6}
                            />
                        )}
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 text-white py-2 w-full rounded"
                >
                    {
                        isLoading ? "Loading..." : "Add Car"
                    }
                </button>
            </form>
        </div>
    );
};

export default AddCar;
