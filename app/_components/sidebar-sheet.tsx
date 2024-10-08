// components/MenuSheet.tsx
"use client";
import {
  MenuIcon,
  HomeIcon,
  CalendarIcon,
  LogOutIcon,
  LogInIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { quickSearchOptions } from "../_constants/search";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";

// Simulação das opções de pesquisa rápida
// const quickSearchOptions = [
//   { title: "Opção 1", imageUrl: "/path/to/image1.png" },
//   { title: "Opção 2", imageUrl: "/path/to/image2.png" },
//   // Adicione mais opções conforme necessário
// ];

const SidebarSheet: React.FC = () => {
  const { data } = useSession();
  const handleLoginWithGoogleClick = async () => {
    return await signIn("google");
  };
  const handleLogoutClick = async () => signOut();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="absolute right-4 top-4 border border-solid border-x-violet-400 border-y-violet-400 transition-transform duration-700 ease-out hover:bg-violet-600 hover:text-white"
          size="icon"
          variant="secondary"
        >
          <MenuIcon className="text-indigo-400 hover:text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader className="border-b border-solid pb-4">
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        {/* AVATAR */}
        <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
          {data?.user ? (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={data?.user?.image ?? ""}
                  alt={data?.user?.name ?? ""}
                  title={data?.user?.name ?? ""}
                  className="h-10 w-10"
                />
              </Avatar>
              <div>
                <p className="font-bold">{data.user.name ?? ""}</p>
                <p className="text-sm">{data?.user?.email ?? ""}</p>
              </div>
            </div>
          ) : (
            <>
              <p className="font-bold">Olá,faça o seu login</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon">
                    <LogInIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent className="absolute z-500 w-[90%]">
                  <DialogHeader>
                    <DialogTitle>Faça o seu login na plataforma</DialogTitle>
                    <DialogDescription>
                      Conecte-se usando uma conta do google.
                    </DialogDescription>
                  </DialogHeader>
                  <Button
                    variant="outline"
                    className="gap-2font-bold"
                    onClick={handleLoginWithGoogleClick}
                  >
                    <Image
                      src="/image/google.svg"
                      alt="Fazer um login o Google"
                      width={18}
                      height={18}
                    />
                    Google
                  </Button>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>

        {/* Links do Menu */}
        <div className="flex flex-col gap-4 border-b border-solid py-5">
          <SheetClose asChild>
            <Button className="justify-start gap-2" variant={"ghost"} asChild>
              <Link href="/">
                <HomeIcon size={18} />
                Início
              </Link>
            </Button>
          </SheetClose>

          <SheetClose asChild>
            <Button className="justify-start gap-2" variant={"ghost"}>
              <CalendarIcon size={18} />
              Agendamento
            </Button>
          </SheetClose>
        </div>

        {/* Quick Search Options */}
        <div className="flex flex-col gap-4 border-b border-solid py-5">
          {quickSearchOptions.map((option) => (
            <SheetClose asChild key={option.title}>
              <Button className="justify-start gap-2" variant={"ghost"} asChild>
                <Link href={`/barbershops?service=${option.title}`}>
                  <Image
                    src={option.imageUrl}
                    width={18}
                    height={18}
                    alt={option.title}
                  />
                  {option.title}
                </Link>
              </Button>
            </SheetClose>
          ))}
        </div>

        {/* Logout */}
        <div className="flex flex-col gap-4 py-5">
          <SheetClose asChild>
            <Button
              variant="ghost"
              className="justify-start gap-2"
              onClick={handleLogoutClick}
            >
              <LogOutIcon size={18} />
              Sair da conta
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarSheet;
