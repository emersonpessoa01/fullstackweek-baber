import { Card, CardContent } from "./ui/card";

const Footer = () => {
  return (
    <footer>
      <Card className="mt-5">
        <CardContent className="px-5 py-6">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Copyright{" "}
            <span className="font-bold">FSW Barber</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  );
};

export default Footer;
