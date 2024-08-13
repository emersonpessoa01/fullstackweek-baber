import Image from "next/image";
import logo from "../../public/image/logo.png";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <Card className="fixed left-0 top-0 z-500 w-full">
      <CardContent className="flex flex-wrap items-center justify-between p-3">
        <Image alt="FSW-barber" src={logo} width={120} height={18} />
        <Button size="icon" variant="outline">
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Header;
