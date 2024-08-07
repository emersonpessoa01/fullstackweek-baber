import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import Banner from "./image/Banner01.png";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Emerson</h2>
        <p>Quarta-feira, 07 de Agosto</p>
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>
        <div className="mt-6 h-[150px]">
          <Image
            src={Banner}
            alt={"Agende nos melhores com FWS Barber"}
            className="fill w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
