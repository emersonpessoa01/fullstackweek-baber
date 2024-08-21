import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import Image from "next/image";
// import Mobile from "../public/image/banner-mobile.png";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbarshop-item";
import { quickSearchOptions } from "./_constants/search";
import BookingItem from "./_components/booking-item";
import ScrollTop from "./_components/ui/scrolltop";
import SliderImage from "./_components/slider-image";
import Search from "./_components/search";
import Link from "next/link";

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
        <div className="mt-6">
          <Search />
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
              <Button
                key={option.title}
                className="gap-2"
                variant="secondary"
                asChild
              >
                <Link href={`barbershops?service=${option.title}`}>
                  <Image
                    src={option.imageUrl}
                    width={16}
                    height={16}
                    alt={option.title}
                  />
                  {option.title}
                </Link>
              </Button>
            );
          })}
        </div>

        <SliderImage />
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
