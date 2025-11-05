/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// ...existing code...
import React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Globe } from "lucide-react"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import userIcon from "@/assets/images/user.png"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useForm, type FieldValues, type SubmitHandler, type UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useChangePasswordMutation, useUpdateUserProfileMutation } from "@/redux/features/user/user.api"
import { toast } from "sonner"

const Profile: React.FC = () => {
    const { data } = useUserInfoQuery(undefined)
    // console.log("user id:", data?.data?._id);
    const form = useForm();

    const [updateProfile] = useUpdateUserProfileMutation();

    // fallback / dummy data when API not ready
    const user = {
        id: data?.data?._id || undefined,
        name: data?.data?.name || "Anshan Haso",
        role: data?.data?.role || "Project Manager",
        email: data?.data?.email || "hello@tobybelhome.com",
        phone: data?.data?.phone || "(+1-876) 8654 239 581",
        country: data?.data?.country || "N/A",
        website: data?.data?.website || "N/A",
        avatar: data?.data?.avatar || userIcon,
        stats: {
            cashIn: data?.data?.posts ?? 20000,
            cashOut: data?.data?.projects ?? 3400,
            sendMoney: data?.data?.members ?? 1200,
        },
    }

    const updateProfileHandler: SubmitHandler<FieldValues> = async (data) => {
        try {

            // normalize strings and remove falsy values (undefined, "", null, 0, false)
            const formValues = Object.fromEntries(
                Object.entries(data)
                    .map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
                    .filter(([_, v]) => Boolean(v))
            );
            // console.log("form values:", formValues);
            const result = await updateProfile({ userId: user.id, ...formValues }).unwrap();

            if (result.success) {
                toast.success("Profile updated successfully");
                form.reset();
                return true;
            }

        } catch (err) {
            // console.log(err);
            toast.error("Failed to update profile");
            return false;
        }
    };


    return (
        <div className="min-h-screen bg-background/10">
            <div className="mx-auto w-full max-w-6xl">
                <div className="border rounded-lg overflow-hidden bg-background/50">
                    <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div>
                                <div className="flex items-center gap-6">
                                    <Avatar className="w-28 h-28">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback>{user.name.split(" ").map((n: any[]) => n[0]).slice(0, 2).join("")}</AvatarFallback>
                                    </Avatar>

                                    <div>
                                        <h2 className="text-2xl font-semibold">{user.name}</h2>
                                        {/* <Badge variant="secondary">Pro</Badge> */}
                                        <p className="bg-indigo-500 text-white rounded-md py-[0.8px] px-2 w-fit capitalize text-sm font-semibold mt-1">{user.role}</p>
                                    </div>
                                </div>
                                <div className="mt-4 grid grid-cols-3 gap-3 max-w-md">
                                    <StatBox value={user.stats.cashIn} label="Cash-in" />
                                    <StatBox value={user.stats.cashOut} label="Cash-out" />
                                    <StatBox value={user.stats.sendMoney} label="Send Money" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                            <div className="flex gap-3">
                                {/* <Button onClick={handleUpdate}>Update Profile</Button> */}
                                {/* <Button variant="outline" onClick={handleChangePassword}>Change Password</Button> */}
                                <UpdateProfileModal user={user} updateProfileHandler={updateProfileHandler} form={form} />
                                <UpdatePasswordModal userId={user?.id} />
                            </div>
                            <p className="text-sm text-muted-foreground">Member since <span className="font-medium">Jan 2023</span></p>
                        </div>
                    </div>

                    <Separator />

                    <div className="p-6 grid gap-3">
                        <ContactRow icon={<Mail className="h-4 w-4" />} label={user.email} href={`mailto:${user.email}`} />
                        <ContactRow icon={<Phone className="h-4 w-4" />} label={user.phone} />
                        <ContactRow icon={<MapPin className="h-4 w-4" />} label={user.country} />
                        <ContactRow icon={<Globe className="h-4 w-4" />} label={user.website} href={user.website} external />
                    </div>
                    <Separator />

                    <div className="p-6">
                        <h3 className="text-lg font-semibold">About</h3>
                        <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nam cupiditate sed repellat asperiores ipsam labore placeat officia cumque a. Blanditiis porro alias, ipsa ipsum harum molestias quod provident, excepturi voluptas consectetur consequatur tempore, eligendi vero dolorem eos? Quos atque a, iste numquam voluptas asperiores, odit neque sed exercitationem commodi fugiat quasi esse quam facere minus fugit? Eaque earum error, amet at voluptatum corrupti eum harum labore quaerat atque quae? Incidunt quidem accusantium doloremque laborum veniam commodi voluptates id suscipit eligendi sint, quo, exercitationem qui quisquam nihil numquam quod, labore sequi ipsum! Omnis quia error illo nobis eum perferendis.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function UpdateProfileModal({ user, updateProfileHandler, form }: { user: any, updateProfileHandler: SubmitHandler<FieldValues>, form: UseFormReturn<FieldValues> }) {
    const [open, setOpen] = React.useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => { form.reset({ name: user?.name ?? "", phone: user?.phone ?? "" }); setOpen(true); }}>Update profile</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(async (values) => {
                        try {
                            const ok = await updateProfileHandler(values);
                            // reset only on success
                            if (ok) {
                                form.reset();
                            }
                        } catch (err) {
                            console.error("Update failed:", err);
                        } finally {
                            // always close dialog whether update succeeded or failed
                            setOpen(false);
                        }
                    })} className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={user?.name || "Your Name"}
                                            value={field.value ?? user?.name}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={user?.phone || "Your Phone"}
                                            value={field.value ?? user?.phone}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="mt-2">
                            <DialogClose asChild>
                                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
function UpdatePasswordModal({ userId }: { userId: string }) {
    const [open, setOpen] = React.useState(false);
    const form = useForm();
    const [changePassword] = useChangePasswordMutation();

    const newPassword = form.watch("newPassword");
    const confirmPassword = form.watch("confirmPassword");

    // disable save button until both fields are present and match
    const canSave = Boolean(newPassword && confirmPassword && newPassword === confirmPassword);


    // real-time validation: set/clear error on confirmPassword when values change
    React.useEffect(() => {
        if (confirmPassword === undefined) return; // don't validate until user types
        if (newPassword && confirmPassword && newPassword !== confirmPassword) {
            form.setError("confirmPassword", {
                type: "validate",
                message: "Passwords do not match",
            });
        } else {
            form.clearErrors("confirmPassword");
        }
    }, [newPassword, confirmPassword, form]);


    const handleChangePassword: SubmitHandler<FieldValues> = async (data) => {
        // double-check on submit as well
        if (data.newPassword !== data.confirmPassword) {
            form.setError("confirmPassword", {
                type: "validate",
                message: "Passwords do not match",
            });
            return false;
        }

        try {
            const payload = {
                userId,
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            };

            const changePasswordResult = await changePassword(payload).unwrap();

            if (changePasswordResult.success) {
                toast.success("Password changed successfully");
                return true;
            } else {
                toast.error("Failed to change password");
                return false;
            }
        } catch (error: any) {
            // console.error("Failed to change password:", error);
            toast.error(error?.data?.message || "Failed to change password");
            return false;
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)} variant="outline">Change Password</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                        Change your password here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(async (values) => {
                        try {
                            const ok = await handleChangePassword(values);
                            // reset only on success
                            if (ok) {
                                form.reset();
                            }
                        } catch (err) {
                            console.error("Failed to update password", err);
                        } finally {
                            // always close dialog whether update succeeded or failed
                            setOpen(false);
                        }
                    })} className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            {...field}
                                            placeholder="Current Password"
                                            value={field.value ?? ""}
                                            required
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            {...field}
                                            placeholder="New Password"
                                            value={field.value || ""}
                                            required
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            {...field}
                                            placeholder="Confirm Password"
                                            value={field.value || ""}
                                            required
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="mt-2">
                            <DialogClose asChild>
                                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={!canSave}>Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

function StatBox({ value, label }: { value: string | number; label: string }) {
    return (
        <div className="bg-muted/80 rounded-md py-4 px-3 text-center">
            <div className="text-lg font-semibold">{value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
        </div>
    )
}

function ContactRow({
    icon,
    label,
    href,
    external,
}: {
    icon: React.ReactNode
    label: string
    href?: string
    external?: boolean
}) {
    const content = (
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="p-2 bg-muted rounded-md">{icon}</div>
            <div className="truncate">{label}</div>
        </div>
    )

    return href ? (
        <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="block hover:underline w-fit"
        >
            {content}
        </a>
    ) : (
        <div>{content}</div>
    )
}

export default Profile;