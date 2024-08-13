import { Barbershop } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";
import Link from "next/link";
interface BarbershopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  const { name, imageUrl, address } = barbershop;
  return (
    <Card className="min-w-[170px] overflow-hidden rounded-2xl">
      <CardContent className="p-0 px-1 pt-1">
        {/* IMAGEM */}
        <Link href={`/barbershops/${barbershop.id}`}>
          <div className="border-red relative h-[159px] w-full cursor-pointer overflow-hidden rounded-tl-xl rounded-tr-xl">
            <Image
              fill
              className="rounded-tl-xl rounded-tr-xl object-cover transition-transform duration-700 hover:scale-125"
              src={imageUrl}
              alt={name}
            />
            <Badge
              className="absolute left-2 top-2 z-50 flex gap-1 style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} px-3 py-1"
              variant="secondary"
            >
              <StarIcon className="fill-primary text-primary" size={12} />
              <p className="text-xs font-semibold">5.0</p>
            </Badge>
          </div>
        </Link>
        {/* TEXTO */}
        <div className="px-1 py-3">
          <h3 className="truncate text-sm font-semibold">{name}</h3>
          <p className="truncate text-gray-400 last:text-sm">{address}</p>
          <Button variant="secondary" className="mt-3 w-full" asChild>
            <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
