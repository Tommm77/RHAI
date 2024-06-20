"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import useAuth from "@/utils/auth";
import cookie from "cookie";

export function Profiltabs() {
  const [profile, setProfile] = useState({
    nom: "",
    prenom: "",
    email: "",
    num_tel: "",
    photo_profil: "",
  });
  const [avatarSrc, setAvatarSrc] = useState<string>("");
  const isAuthenticated = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      const cookies = cookie.parse(document.cookie || "");
      const id_p = cookies.id_p;

      if (id_p) {
        const response = await fetch(`https://rhai-api.vercel.app/api/profils/${id_p}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          setAvatarSrc(data.photo_profil || "https://github.com/shadcn.png");
        } else {
          console.error("Erreur lors de la récupération du profil.");
        }
      }
    };

    if (isAuthenticated) {
      fetchProfile().then(r =>  r);
    }
  }, [isAuthenticated]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setAvatarSrc(reader.result);
        } else {
          console.error("Unexpected result type:", typeof reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarSrc("https://github.com/shadcn.png");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
  };

  const handleSave = async () => {
    const cookies = cookie.parse(document.cookie || "");
    const id_p = cookies.id_p;

    if (id_p) {
      const response = await fetch(`https://rhai-api.vercel.app/api/profils/${id_p}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...profile,
          photo_profil: avatarSrc,
        }),
      });

      if (response.ok) {
        alert("Profil mis à jour avec succès");
      } else {
        alert("Erreur lors de la mise à jour du profil.");
      }
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
                <Label htmlFor="nom">Nom</Label>
                <Input id="nom" value={profile.nom} onChange={handleInputChange} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="prenom">Prénom</Label>
                <Input id="prenom" value={profile.prenom} onChange={handleInputChange} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={profile.email} onChange={handleInputChange} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="num_tel">Numéro de téléphone</Label>
                <Input id="num_tel" value={profile.num_tel} onChange={handleInputChange} />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="rounded-2xl" onClick={handleSave}>Sauvegarder</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Mot de passe</CardTitle>
              <CardDescription>
                Changez votre mot de passe ici. Après sauvegarde, vous serez déconnecté.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Mot de passe actuel</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Nouveau mot de passe</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="rounded-2xl">Sauvegarder mot de passe</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
  );
}
