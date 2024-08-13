import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BarbershopPageProps {
  params: {
    id: string;
  }; // id do barbeiro
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  //Chamar o meu banc de dados
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  });
  // Verificar se o barbeiro existe
  // if (!barbershop) {
  //   return notFound();
  // }
  return (
    <div>
      {/* IMAGE */}
      <div className="w-Fullscreen relative h-[250px]">
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
    </div>
  );
};

export default BarbershopPage;
