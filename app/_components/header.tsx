import Image from "next/image";
import logo from "../../public/image/logo.png";
import { Card, CardContent } from "./ui/card";
import SidebarSheet from "./sidebar-sheet";

const Header = () => {
  return (
    <Card className="fixed left-0 top-0 z-500 w-full p-3">
      <CardContent className="flex flex-wrap items-center justify-between p-3">
        <Image alt="FSW-barber" src={logo} width={120} height={18} />
        {/* Sheet início */}
        <SidebarSheet />
        {/* Sheet fim */}
      </CardContent>
    </Card>
  );
};

export default Header;
