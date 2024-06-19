"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { useEffect, useState } from "react"
import useAuth from "@/utils/auth"
import { useRouter } from "next/router"

export function Profiltabs() {

  const [avatarSrc, setAvatarSrc] = useState<string>("https://github.com/shadcn.png");
  const isAuthenticated = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setAvatarSrc(reader.result);
        } else {
          // handle the case where reader.result is not a string (e.g., ArrayBuffer)
          console.error("Unexpected result type:", typeof reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      // handle the case where no file is selected
      setAvatarSrc("https://github.com/shadcn.png");
    }
  };  

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2 rounded-2xl">
        <TabsTrigger value="account" className="rounded-2xl">Profil</TabsTrigger>
        <TabsTrigger value="password" className="rounded-2xl">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardContent className="space-y-5">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20 mt-4">
                <AvatarImage src={avatarSrc} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex items-center">
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label htmlFor="avatar-upload" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-xl">
                  Changer avatar
                </label>
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Nom</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">prénom</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Email</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">numéro de téléphone</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="rounded-2xl">Sauvegarder</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Mot de passe</CardTitle>
            <CardDescription>
              Change your password here. After saving, you ll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="rounded-2xl">Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
