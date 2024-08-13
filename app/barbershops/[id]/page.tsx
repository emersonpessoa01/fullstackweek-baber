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
const BarbershopPage: React.FC = async ({ params }: BarbershopPageProps) => {
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

  const services = barbershop?.services ?? [];
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
          className="object-cover transition-transform duration-500 ease-out hover:scale-110"
        />
        <Button
          className="absolute left-4 top-4"
          size="icon"
          variant="secondary"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>
        <Button
          className="absolute right-4 top-4"
          size="icon"
          variant="secondary"
        >
          <MenuIcon />
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
      {/* NSCRIÇÕES */}
      <div className="space-y-5 border-b border-solid p-5">
        <h2 className="font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-justify text-sm">{barbershop?.description ?? ""}</p>
      </div>
      {/* SERVIÇOS */}
      <div className="space-y-5 border-b border-solid p-5">
        <h2 className="font-bold uppercase text-gray-400">Serviços</h2>
        {services.map((service) => (
          <div key={service.id} className="flex items-center gap-2">
            <StarIcon className="fill-primary text-primary" size={12} />
            <p className="text-sm text-gray-400">{service.name}</p>
          </div>
        ))}
      </div>
      {/* SCROLLTOP */}
      <ScrollTop />
    </div>
  );
};

export default BarbershopPage;
