import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useDeleteCarMutation } from "@/redux/feature/cars/carsApi";
import { toast } from "sonner";

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: string
};

const DeleteConfirm = ({ isOpen, setIsOpen, id }: Props) => {
    const [deleteCar, { isLoading }] = useDeleteCarMutation()

    const handleDelete = async () => {
        try {
            const res = await deleteCar(id).unwrap()
            toast.success(res.message)
            setIsOpen(false)
        } catch (err: any) {
            toast.error(err?.data?.message)
        }
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        car and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button onClick={handleDelete} variant="default">{isLoading ? "Loading..." : "Confirm"}</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteConfirm;