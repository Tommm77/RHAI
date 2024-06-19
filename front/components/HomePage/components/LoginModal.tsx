import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn } from "lucide-react"

export function LoginModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button color="primary" className="rounded-2xl">
          <LogIn size={16} />
          <p className="ml-2">Connexion</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connexion</DialogTitle>
          <DialogDescription>
            Veillez vous connecter pour acceder a l'espace RH
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              mail
            </Label>
            <Input id="name" value="test@test.com" className="col-span-3 rounded" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              mot de passe
            </Label>
            <Input id="username" value="123456" className="col-span-3 rounded" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="rounded">Se connecter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
