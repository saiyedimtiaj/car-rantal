import { useGetUserQuery, useUpdateUserProfileMutation } from "@/redux/feature/user/userApi";
import { Edit } from "lucide-react";
import profile from "../../assets/149071.png";
import { ChangeEvent, useState, useEffect, FormEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FaFileUpload } from "react-icons/fa";
import { uploadImage } from "@/utils/uploadImage";
import { toast } from "sonner";

const UserDashboard = () => {
    const { data, isLoading } = useGetUserQuery(undefined);
    const [updateProfile, { isLoading: updateLoading }] = useUpdateUserProfileMutation();
    const [edit, setEdit] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [file, setFile] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (data) {
            setFormData({
                name: data.data.name,
                email: data.data.email,
                phone: data.data.phone || "",
                address: data.data.address || ""
            });
        }
    }, [data]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setImage(result);
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const isFormChanged = () => {
        return (
            formData.name !== data?.data?.name ||
            formData.phone !== data?.data?.phone ||
            formData.address !== data?.data?.address ||
            image !== null
        );
    };

    const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const form = e.currentTarget;
            const name = (form.elements.namedItem("name") as HTMLInputElement).value;
            const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
            const address = (form.elements.namedItem("address") as HTMLInputElement).value;
            let image = data?.data?.image;

            if (file) {
                image = await uploadImage(file);
            }

            const userInfo = { name, phone, address, image };
            const res = await updateProfile(userInfo).unwrap();
            toast.success(res.message);
            setEdit(false);
            form.reset();
        } catch (err: any) {
            toast.error(err?.data?.message);
            setEdit(false);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="font-epilogue relative px-4 flex flex-col justify-center mt-10">
            <img src="https://plus.unsplash.com/premium_photo-1661775756810-82dbd209fc95?q=80&w=1954&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="w-full h-[300px] object-cover rounded-md" />
            <div className="absolute top-2 right-8 flex items-center justify-end">
                <button onClick={() => setEdit(!edit)} className="text-white bg-black px-2 py-2 rounded"><Edit /></button>
            </div>
            <div className="w-full -mt-[75px]">
                {edit ? (
                    <form onSubmit={handleUpdateProfile} className="mt-6 max-w-xl mx-auto">
                        <div
                            onClick={() => document.querySelector<HTMLInputElement>(".input-Field")?.click()}
                            className="flex flex-col items-center cursor-pointer mb-6"
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
                                    className="w-24 h-24 object-cover rounded-full border-4 border-gray-300"
                                    src={image as string}
                                    alt={"Profile Image"}
                                />
                            ) : (
                                <div className="relative">
                                    <img
                                        className="w-24 h-24 object-cover rounded-full border-4 border-gray-300"
                                        src={data?.data?.image ? data?.data?.image : profile}
                                        alt="Profile Image"
                                    />
                                    <FaFileUpload className="absolute bottom-0 right-0 text-gray-600 bg-white rounded-full p-1" />
                                </div>
                            )}
                            <span className="text-sm mt-2 text-gray-500">Change Profile Image</span>
                        </div>
                        <div className="grid gap-4">
                            <div>
                                <Label>Name</Label>
                                <Input name="name" value={formData.name} onChange={handleChange} className="bg-gray-100 dark:bg-gray-800 rounded" />
                            </div>
                            <div>
                                <Label>Email</Label>
                                <Input name="email" value={formData.email} disabled className="bg-gray-100 dark:bg-gray-800 rounded" />
                            </div>
                            <div>
                                <Label>Phone</Label>
                                <Input name="phone" value={formData.phone} onChange={handleChange} className="bg-gray-100 dark:bg-gray-800 rounded" />
                            </div>
                            <div>
                                <Label>Address</Label>
                                <Input name="address" value={formData.address} onChange={handleChange} className="bg-gray-100 dark:bg-gray-800 rounded" />
                            </div>
                        </div>
                        <button type="submit" disabled={!isFormChanged()} className="w-full mt-4 bg-blue-500 text-white py-2 rounded disabled:bg-gray-400">
                            {updateLoading ? "Loading..." : "Update Profile"}
                        </button>
                    </form>
                ) : (
                    <div className="mt-6 text-center">
                        <img src={data?.data?.image ? data?.data?.image : profile} alt="Profile" className="rounded-full w-24 h-24 mx-auto object-cover border-4 border-gray-300" />
                        <div className="mt-6">
                            <p className="font-semibold text-lg">Name</p>
                            <p className="text-gray-500">{data?.data?.name}</p>
                        </div>
                        <div className="mt-4">
                            <p className="font-semibold text-lg">Email</p>
                            <p className="text-gray-500">{data?.data?.email}</p>
                        </div>
                        <div className="mt-4">
                            <p className="font-semibold text-lg">Phone</p>
                            <p className="text-gray-500">{data?.data?.phone || "N/A"}</p>
                        </div>
                        <div className="mt-4">
                            <p className="font-semibold text-lg">Address</p>
                            <p className="text-gray-500">{data?.data?.address || "N/A"}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;
