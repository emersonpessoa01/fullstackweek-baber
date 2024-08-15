import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import Mobile from "../public/image/banner-mobile.png";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbarshop-item";
import { quickSearchOptions } from "./_constants/search";
import BookingItem from "./_components/booking-item";
import ScrollTop from "./_components/ui/scrolltop";

const Home: React.FC = async () => {
  //Chamar meu bnco de dados
  const barbershops = await db.barbershop.findMany({});
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "asc",
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
          {quickSearchOptions.map((option) => {
            return (
              <Button key={option.title} className="gap-2" variant="secondary">
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                {option.title}
              </Button>
            );
          })}
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
        <BookingItem />

        {/* BARBEARIA RECOMENDADAS */}

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto py-6 [&::-webkit-scrollbar]:hidden">
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
      {/* SCROLLTOP */}
      <ScrollTop />
      {/* FOOTER */}
    </div>
  );
};

export default Home;
