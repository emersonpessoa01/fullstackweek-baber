import { BarbershopService } from "@prisma/client";
import Image from "next/image";
import Decimal from "decimal.js";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface ServiceItemProps {
  service: BarbershopService;
}
const ServiceItem = ({ service }: ServiceItemProps) => {
  /* FORMATAÇÃO DO DECIMAL */
  const decimalPrice: Decimal | undefined = service?.price;
  const formattedPrice = decimalPrice
    ? Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(decimalPrice.toNumber()) // Converte Decimal para número
    : "";
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        {/* IMAGE */}
        <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
          <Image
            src={service?.imageUrl}
            alt={service?.name}
            fill
            className="w-full rounded-lg object-cover"
          />
        </div>
        {/* DIREIRA */}
        <div className="w-full space-y-2">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>
          {/* PREÇO E BOTÃO */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-primary">{formattedPrice}</p>
            <Button variant={"secondary"} size="sm">
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
