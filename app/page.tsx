import { FootprintsIcon, SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import Mobile from "../public/image/banner-mobile.png";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge";
import { Avatar, AvatarImage } from "./_components/ui/avatar";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbarshop-item";

const Home = async () => {
  //Chamar meu bnco de dados
  const barbershops = await db.barbershop.findMany({});
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return (
    <div>
      <Header />
      <div className="px-4 py-4 pt-20">
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
        {/* BUSCA RÁPIDA */}

        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          <Button className="gap-2" variant="secondary">
            <Image
              src="/image/cabelo.svg"
              width={16}
              height={16}
              alt="Cabelo"
            />
            Cabelo
          </Button>
          <Button className="gap-2" variant="secondary">
            <Image src="/image/barba.svg" width={16} height={16} alt="Barba" />
            Barba
          </Button>
          <Button className="gap-2" variant="secondary">
            <Image
              src="/image/acabamento.svg"
              width={16}
              height={16}
              alt="Acabamento"
            />
            Acabamento
          </Button>
          <Button className="gap-2" variant="secondary">
            <Image
              src="/image/acabamento.svg"
              width={16}
              height={16}
              alt="Acabamento"
            />
            Acabamento
          </Button>
          <Button className="gap-2" variant="secondary">
            <FootprintsIcon />
            Pezinho
          </Button>
          <Button className="gap-2" variant="secondary">
            <Image
              src="/image/sobrancelha.svg"
              width={16}
              height={16}
              alt="Sobrancelha"
            />
            Sobrancelha
          </Button>
        </div>

        <div className="relative mt-6 h-[400px] w-full overflow-hidden rounded-2xl">
          <picture className="rounded-2xl">
            <source
              className="transition-transform duration-1000 hover:scale-125"
              srcSet="/image/banner-desktop.png"
              media="(min-width: 768px)"
            />
            <Image
              src={Mobile}
              alt="Banner"
              fill
              className="rounded-xt h-full w-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </picture>
        </div>
        {/* AGENDAMENTO */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <Card>
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
        {/* BARBEARIA RECOMENDADAS */}

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => {
            return (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            );
          })}
        </div>
        {/* BARBEARIA POPULARES */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => {
            return (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            );
          })}
        </div>
      </div>
      {/* FOOTER */}
      <footer>
        <Card>
          <CardContent className="-x-5 py-6">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Copyright{" "}
              <span className="font-bold">FSW Barber</span>
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  );
};

export default Home;
