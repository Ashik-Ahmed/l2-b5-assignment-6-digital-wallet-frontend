// ...existing code...
import React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Globe } from "lucide-react"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import userIcon from "@/assets/images/user.png"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const Profile: React.FC = () => {
    const { data } = useUserInfoQuery()

    // fallback / dummy data when API not ready
    const user = {
        name: data?.data?.name || "Anshan Haso",
        role: data?.data?.role || "Project Manager",
        email: data?.data?.email || "hello@tobybelhome.com",
        phone: data?.data?.phone || "(+1-876) 8654 239 581",
        country: data?.data?.country || "N/A",
        website: data?.data?.website || "N/A",
        avatar: data?.data?.avatar || userIcon,
        stats: {
            posts: data?.data?.posts ?? 184,
            projects: data?.data?.projects ?? 32,
            members: data?.data?.members ?? "4.5K",
        },
    }

    const handleUpdate = () => {
        // open update modal or navigate to edit page
        console.log("Update profile clicked")
    }

    const handleChangePassword = () => {
        // open change-password modal or navigate
        console.log("Change password clicked")
    }

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
                                        <AvatarFallback>{user.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</AvatarFallback>
                                    </Avatar>

                                    <div>
                                        <h2 className="text-2xl font-semibold">{user.name}</h2>
                                        {/* <Badge>Pro</Badge> */}
                                        <p className="capitalize text-sm text-muted-foreground mt-1">{user.role}</p>
                                    </div>
                                </div>
                                <div className="mt-4 grid grid-cols-3 gap-3 max-w-md">
                                    <StatBox value={user.stats.posts} label="Post" />
                                    <StatBox value={user.stats.projects} label="Projects" />
                                    <StatBox value={user.stats.members} label="Members" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                            <div className="flex gap-3">
                                {/* <Button onClick={handleUpdate}>Update Profile</Button> */}
                                <UpdateProfileModal />
                                <Button variant="outline" onClick={handleChangePassword}>Change Password</Button>
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

function UpdateProfileModal() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button>Update profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Username</Label>
                            <Input id="username-1" name="username" defaultValue="@peduarte" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
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
            className="block hover:underline"
        >
            {content}
        </a>
    ) : (
        <div>{content}</div>
    )
}

export default Profile
// ...existing code...