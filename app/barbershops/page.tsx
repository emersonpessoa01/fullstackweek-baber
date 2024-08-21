import BarbershopItem from "../_components/barbarshop-item";
import { db } from "../_lib/prisma";

interface BarbershopPageProps {
  searchParams: {
    search?: string;
  };
}
const BarbershopPage = async ({ searchParams }: BarbershopPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams?.search,
        mode: "insensitive",
      },
    },
  });
  //   return <h1>{searchParams?.search}</h1>;
  return (
    <div>
      <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
        Resultados para &quot;{searchParams.search}&quot;
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {barbershops.map((barbershop) => (
          <BarbershopItem key={barbershop.id} barbershop={barbershop} />
        ))}
      </div>
    </div>
  );
};

export default BarbershopPage;
