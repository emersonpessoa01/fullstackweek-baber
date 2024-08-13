import ServiceItem from "@/app/_components/service-item";
import { Button } from "@/app/_components/ui/button";
import ScrollTop from "@/app/_components/ui/scrolltop";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BarbershopPageProps {
  params: {
    id: string;
  }; // id do barbeiro
}
const BarbershopPage: React.FC<BarbershopPageProps> = async ({ params }) => {
  //Chamar o meu banc de dados
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      //faz o jioin(agregar) entre duas tabelas
      services: true,
    },
  });

  // const services = barbershop?.services ?? [];
  // console.log(services)

  // Verificar se o barbeiro existe
  // if (!barbershop) {
  //   return notFound();
  // }
  return (
    <div>
      {/* IMAGE */}
      <div className="w-Fullscreen relative h-[250px] overflow-hidden">
        <Image
          src={barbershop?.imageUrl ?? ""}
          alt={barbershop?.name ?? ""}
          fill
          className="object-cover"
        />
        <Button
          className="absolute left-4 top-4"
          size="icon"
          variant="secondary"
          asChild
        >
          <Link
            className="border border-solid border-x-violet-400 border-y-violet-400 transition-transform duration-500 ease-out hover:bg-violet-600 hover:text-white"
            href="/"
          >
            <ChevronLeftIcon className="text-indigo-400 hover:text-white" />
          </Link>
        </Button>
        <Button
          className="absolute right-4 top-4 border border-solid border-x-violet-400 border-y-violet-400 transition-transform duration-700 ease-out hover:bg-violet-600 hover:text-white"
          size="icon"
          variant="secondary"
        >
          <MenuIcon className="text-indigo-400 hover:text-white" />
        </Button>
      </div>

      {/* TEXTO */}
      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop?.name ?? ""}</h1>
        <div className="mb-2 flex items-center">
          <MapPinIcon className="gap-2 text-primary" size={18} />
          <p className="ml-2 text-sm text-gray-400">
            {barbershop?.address ?? ""}
          </p>
        </div>

        <div className="mb-2 flex items-center">
          <StarIcon className="gap-2 fill-primary text-primary" size={18} />
          <p className="ml-2 text-sm text-gray-400">5.0 (+899 avaliações)</p>
        </div>
      </div>
      {/* INSCRIÇÕES */}
      <div className="space-y-2 border-b border-solid p-5">
        <h2 className="font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-justify text-sm">{barbershop?.description ?? ""}</p>
      </div>
      {/* SERVIÇOS */}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="font-bold uppercase text-gray-400">Serviços</h2>
        <div className="space-y-3">
          {barbershop?.services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </div>
      {/* SCROLLTOP */}
      <ScrollTop />
    </div>
  );
};

export default BarbershopPage;
