import BarbershopItem from "../_components/barbarshop-item";
import Header from "../_components/header";
import Search from "../_components/search";
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
    <div className="my-6 px-4">
      <Header />
      <div className="mt-12 pt-10">
        <Search />
      </div>
      <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
        Resultados para &quot;{searchParams.search}&quot;
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {barbershops.map((barbershop) => (
          <BarbershopItem key={barbershop.id} barbershop={barbershop} />
        ))}
      </div>
    </div>
  );
};

export default BarbershopPage;
