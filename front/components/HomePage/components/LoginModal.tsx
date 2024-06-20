import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import cookie from "cookie";

export function LoginModal() {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Fetch all profiles
      const response = await fetch('https://rhai-api.vercel.app/api/profils', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const profiles = await response.json();
        console.log(profiles);

        profiles.forEach((profile: any) => {
            console.log(profile.email, profile.mdp);
        });

        // Find a matching profile
        const profile = profiles.find((profile: any) => profile.email === email && profile.mdp === password);

        console.log(email, password);
        console.log(profile);

        if (profile) {
          // Set cookies with profile data
          document.cookie = cookie.serialize("id_p", profile.id_p, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
          });
          document.cookie = cookie.serialize("role", profile.role, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
          });
          setIsOpen(false);
          window.location.reload();
          console.log("Connexion réussie");
        } else {
          setError("Erreur de connexion. Veuillez vérifier vos identifiants.");
        }
      } else {
        setError("Erreur de connexion. Veuillez vérifier vos identifiants.");
      }
    } catch (error) {
      setError("Erreur de connexion. Veuillez vérifier vos identifiants.");
    }
  };

  return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button color="primary" className="rounded-2xl" onClick={() => setIsOpen(true)}>
            <LogIn size={16} />
            <p className="ml-2">Connexion</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connexion</DialogTitle>
            <DialogDescription>
              Veuillez vous connecter pour accéder à espace RH
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="col-span-3 rounded"
                    required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Mot de passe
                </Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="col-span-3 rounded"
                    required
                />
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <DialogFooter>
              <Button type="submit" className="rounded">
                Se connecter
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
  );
}
