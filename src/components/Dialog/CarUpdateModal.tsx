import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useGetSingleCarQuery, useUpdateCarMutation } from "@/redux/feature/cars/carsApi";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { uploadImage } from "@/utils/uploadImage";
import { toast } from "sonner";

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
};

const CarUpdateModal = ({ isOpen, setIsOpen, id }: Props) => {
    const { data, isLoading } = useGetSingleCarQuery(id);
    const [image, setImage] = useState<string | null>(data?.data?.image || null);
    const [file, setFile] = useState<File | null>(null);
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [edit, setEdit] = useState(false);
    const [updateCar, { isLoading: updateIsLoading }] = useUpdateCarMutation()

    useEffect(() => {
        setCategory(data?.data?.category)
        setLocation(data?.data?.location)
    }, [data])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
            setFile(selectedFile);
            setEdit(true); // Set edit to true when a file is selected
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const form = event.currentTarget;
            const name = (form.elements.namedItem('name') as HTMLInputElement).value;
            const pricePerHour = (form.elements.namedItem('pricePerHour') as HTMLInputElement).value;
            const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;
            let image = data?.data?.image;
            if (file) {
                image = await uploadImage(file)
            }
            const carInfo = { name, category, pricePerHour: parseInt(pricePerHour), location, description, image };
            console.log(carInfo);
            const res = await updateCar({ id, carInfo }).unwrap();
            toast.success(res?.message)
            setIsOpen(false)
        } catch (err: any) {
            toast.error(err?.data?.message);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <DialogContent className="font-epilogue max-w-[470px] h-[450px] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Update Car</DialogTitle>
                </DialogHeader>
                {
                    isLoading ? <div className="text-center">
                        Loading....
                    </div> : <form onSubmit={handleSubmit}>
                        <div className="w-full">
                            <Label htmlFor="name">Car Model</Label>
                            <Input id="name" name="name" defaultValue={data?.data?.name} />
                        </div>
                        <div className="flex gap-3 mt-3">
                            <div className="w-1/2">
                                <div className="w-full">
                                    <Label htmlFor="pricePerHour">Price Per Hour</Label>
                                    <Input id="pricePerHour" name="pricePerHour" defaultValue={data?.data?.pricePerHour} />
                                </div>
                                <div className="w-full mt-2">
                                    <Label>Category</Label>
                                    <Select onValueChange={(val) => setCategory(val)} defaultValue={data?.data?.category}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[
                                                { value: "suv", label: "SUV" },
                                                { value: "hybrid", label: "Hybrid" },
                                                { value: "sedan", label: "Sedan" },
                                                { value: "coupe", label: "Coupe" },
                                                { value: "luxury", label: "Luxury" },
                                            ].map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="w-full mt-2">
                                    <Label>Location</Label>
                                    <Select onValueChange={(val) => setLocation(val)} defaultValue={data?.data?.location}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[
                                                { value: "dhaka", label: "Dhaka" },
                                                { value: "chittagong", label: "Chittagong" },
                                                { value: "rajshahi", label: "Rajshahi" },
                                                { value: "khulna", label: "Khulna" },
                                                { value: "barisal", label: "Barisal" },
                                            ].map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <div className="flex items-center justify-between">
                                    <Label>Thumbnail</Label>
                                    <p
                                        onClick={() => {
                                            setEdit(true);
                                            setImage(null);
                                        }}
                                        className="text-purple-600 font-medium cursor-pointer"
                                    >
                                        Edit
                                    </p>
                                </div>
                                <div
                                    onClick={() =>
                                        document.querySelector<HTMLInputElement>(".input-Field")?.click()
                                    }
                                    className="cursor-pointer mb-4"
                                >
                                    <input
                                        type="file"
                                        hidden
                                        name="files"
                                        className="input-Field"
                                        onChange={handleFileChange}
                                    />
                                    {edit ? (
                                        image ? (
                                            <img
                                                className="w-full h-[160px] object-cover mt-1 rounded-md"
                                                src={image}
                                                alt="Car Image"
                                            />
                                        ) : (
                                            <div className="flex items-center flex-col gap-1 mb-2 border-dashed border border-gray-500 py-8 rounded-md">
                                                <span><FaCloudUploadAlt size={85} /></span>
                                                <span className="font-medium">Upload Car Image</span>
                                            </div>
                                        )
                                    ) : (
                                        <img
                                            className="w-full h-[160px] object-cover mt-1 rounded-md"
                                            src={data?.data?.image}
                                            alt="Car Image"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <Label>Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                defaultValue={data?.data?.description}
                                rows={4}
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-md"
                        >
                            {updateIsLoading ? "Loading..." : "Update Car"}
                        </button>
                    </form>
                }
            </DialogContent>
        </Dialog>
    );
};

export default CarUpdateModal;
