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
      // Simuler une réponse de connexion
      const response = await new Promise<Response>((resolve) =>
        setTimeout(
          () =>
            resolve(
              new Response(
                JSON.stringify({ token: "simulated-jwt-token" }),
                { status: 200, headers: { "Content-Type": "application/json" } }
              )
            ),
          500
        )
      );

      if (response.ok) {
        const data = await response.json();
        document.cookie = cookie.serialize("token", data.token, {
          httpOnly: false, // Utilisez `false` ici, car le cookie est défini côté client
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        });
        // Fermer la modal après la connexion réussie
        setIsOpen(false);
        window.location.reload();
        console.log("Connexion réussie");
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
            Veillez vous connecter pour accéder à l'espace RH
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleLogin}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                mail
              </Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3 rounded"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                mot de passe
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="col-span-3 rounded"
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
