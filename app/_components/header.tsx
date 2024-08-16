import Image from "next/image";
import logo from "../../public/image/logo.png";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";

const Header = () => {
  return (
    <Card className="fixed left-0 top-0 z-500 w-full">
      <CardContent className="flex flex-wrap items-center justify-between p-3">
        <Image alt="FSW-barber" src={logo} width={120} height={18} />

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader className="border-b border-solid pb-4">
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            {/* AVATAR */}
            <div className="flex items-center gap-3 border-b border-solid py-5">
              <Avatar>
                <AvatarImage
                  src="/image/emersonpessoa-removebg8.png"
                  className="h-10 w-10"
                />
              </Avatar>
              <div>
                <p className="font-bold">Emerson Pessoa</p>
                <p className="text-sm">emersonpessoa@fullstack.io</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-b border-solid py-5">
              <SheetClose asChild>
                <Button
                  className="justify-start gap-2"
                  variant={"ghost"}
                  asChild
                >
                  <Link href="/">
                    <HomeIcon size={18} />
                    Início
                  </Link>
                </Button>
              </SheetClose>
              <Button className="justify-start gap-2" variant={"ghost"}>
                <CalendarIcon size={18} />
                Agendamento
              </Button>
            </div>
            <div className="flex flex-col gap-4 border-b border-solid py-5">
              {quickSearchOptions.map((option) => {
                return (
                  <Button
                    key={option.title}
                    className="justify-start gap-2"
                    variant={"ghost"}
                  >
                    <Image
                      src={option.imageUrl}
                      width={18}
                      height={18}
                      alt={option.title}
                    />
                    {option.title}
                  </Button>
                );
              })}
            </div>

            <div className="flex flex-col gap-4 py-5">
              <Button variant="ghost" className="justify-start gap-2">
                <LogOutIcon size={18} />
                Sair da conta
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
