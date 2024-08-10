import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import Mobile from "../public/image/banner-mobile.png";
import { Card, CardContent } from "./_components/ui/card";

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
        <div className="relative mt-6 h-[450px] w-full">
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
        <Card className="">
          <CardContent>
            <h3 className="text-lg font-bold">Agendamento</h3>
            <p>Selecione um horário para começar</p>
            <Button className="w-full">Agendar</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
