import { useGetUserQuery, useUpdateUserProfileMutation } from "@/redux/feature/user/userApi";
import { Edit } from "lucide-react";
import profile from "../../assets/149071.png"
import { ChangeEvent, useState, useEffect, FormEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FaFileUpload } from "react-icons/fa";
import { uploadImage } from "@/utils/uploadImage";
import { toast } from "sonner";

const UserDashboard = () => {
    const { data, isLoading } = useGetUserQuery(undefined);
    const [updateProfile, { isLoading: updateLoading }] = useUpdateUserProfileMutation()
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
            const name = (form.elements.namedItem('name') as HTMLInputElement).value;
            const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
            const address = (form.elements.namedItem('address') as HTMLInputElement).value;
            let image = data?.data?.image;

            if (file) {
                image = await uploadImage(file);
            }

            const userInfo = { name, phone, address, image };
            const res = await updateProfile(userInfo).unwrap();
            toast.success(res.message);
            setEdit(false);
            form.reset()
        } catch (err: any) {
            toast.error(err?.data?.message);
            setEdit(false);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container font-epilogue mx-auto px-4 flex gap-8 mt-14">
            <div className="w-full md:w-1/3 lg:w-1/4 dark:bg-[#111827] bg-[#F3F4F6] px-4 py-7 rounded-lg">
                <div className="flex items-center justify-between border-b border-gray-500 pb-3">
                    <h1 className="text-[22px] font-semibold">Profile</h1>
                    <button onClick={() => setEdit(!edit)}><Edit /></button>
                </div>
                {edit ? (
                    <form onSubmit={handleUpdateProfile}>
                        <div
                            onClick={() => document.querySelector<HTMLInputElement>(".input-Field")?.click()}
                            className="mt-2 object-cover cursor-pointer mb-4 flex flex-col items-center"
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
                                    className="w-24 h-24 object-cover rounded-full"
                                    src={image as string}
                                    alt={"Profile Image"}
                                    width={200}
                                    height={250}
                                />
                            ) : (
                                <>
                                    <div className="flex items-center gap-1 mb-2">
                                        <span><FaFileUpload /></span>
                                        <span className="text-sm">Change Profile Image</span>
                                    </div>
                                    <img
                                        className="w-24 h-24 object-cover rounded-full"
                                        src={data?.data?.image ? data?.data?.image : profile}
                                        alt="Profile Image"
                                        width={200}
                                        height={250}
                                    />
                                </>
                            )}
                        </div>
                        <div className="mt-2">
                            <Label>Name</Label>
                            <Input name="name" value={formData.name} onChange={handleChange} className="dark:bg-black bg-white" />
                        </div>
                        <div className="mt-2">
                            <Label>Email</Label>
                            <Input name="email" value={formData.email} disabled className="dark:bg-black bg-white" />
                        </div>
                        <div className="mt-2">
                            <Label>Phone</Label>
                            <Input name="phone" value={formData.phone} onChange={handleChange} className="dark:bg-black bg-white" />
                        </div>
                        <div className="mt-2">
                            <Label>Address</Label>
                            <Input name="address" value={formData.address} onChange={handleChange} className="dark:bg-black bg-white" />
                        </div>
                        <button type="submit" disabled={!isFormChanged()} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-400">
                            {updateLoading ? "Loading...." : "Update Profile"}
                        </button>
                    </form>
                ) : (
                    <div>
                        <div className="flex justify-center mt-5">
                            <img src={data?.data?.image ? data?.data?.image : profile} alt="" className="rounded-full w-24 h-24" />
                        </div>
                        <div className="mt-4">
                            <p>Name:</p>
                            <h5 className="text-gray-500 font-medium text-lg">{data?.data?.name}</h5>
                        </div>
                        <div className="mt-4">
                            <p>Email:</p>
                            <h5 className="text-gray-500 font-medium text-lg">{data?.data?.email}</h5>
                        </div>
                        <div className="mt-4">
                            <p>Phone:</p>
                            <h5 className="text-gray-500 font-medium text-lg">{data?.data?.phone || "null"}</h5>
                        </div>
                        <div className="mt-4">
                            <p>Address:</p>
                            <h5 className="text-gray-500 font-medium text-lg">{data?.data?.address || "null"}</h5>
                        </div>
                    </div>
                )}
            </div>
            <div className="w-full md:w-2/3 lg:w-3/4"></div>
        </div>
    );
};

export default UserDashboard;
