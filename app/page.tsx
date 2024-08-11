import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import Mobile from "../public/image/banner-mobile.png";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge";
import { Avatar, AvatarImage } from "./_components/ui/avatar";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="px-4 pt-20">
        <h2 className="text-xl font-bold">Olá, Emerson</h2>
        <p>Quarta-feira, 07 de Agosto</p>
        {/* BUSCA */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>
        {/* IMAGEM */}
        {/* <div className="relative mt-6 h-[400px]">
          <Image
            src={Banner}
            alt={"Agende nos melhores com FWS Barber"}
            fill
            className=" w-full object-cover"
          />
        </div> */}
        <div className="relative mt-6 h-[400px] w-full">
          <picture>
            <source
              srcSet="/image/banner-desktop.png"
              media="(min-width: 768px)"
            />
            <Image
              src={Mobile}
              alt="Banner"
              fill
              className="rounded-xt h-full w-full object-cover"
            />
          </picture>
        </div>
        {/* AGENDAMENTO */}
        <Card className="mt-6">
          <CardContent className="flex flex-wrap justify-between p-0">
            {/* ESQUERDA */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de Cabelo</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                </Avatar>
                <p className="text-sm">Barbearia FSW</p>
              </div>
            </div>
            {/* DIREITA  */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">05</p>
              <p className="text-sm">20:00</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
