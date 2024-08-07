import Image from "next/image";
import logo from "../image/Logo.png";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-wrap items-center justify-between p-5">
        <Image alt="FSW-barber" src={logo} width={120} height={18} />
        <Button size="icon" variant="outline">
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Header;
