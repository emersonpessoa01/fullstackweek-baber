"use client";
import { SmartphoneIcon } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface PhoneItemProps {
  phone: string;
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  // eslint-disable-next-line no-unused-vars
  const handleCopyPhoneClip = (phone: string) => {
    navigator.clipboard.writeText(phone);
    toast.success("Telefone copiado com sucesso!");
    // alert("Número copiado para a área de transferência!");
  };
  return (
    <div key={phone} className="mb-2 flex items-center justify-between">
      {/*   ESQUERDA */}
      <div className="flex justify-between gap-2">
        <SmartphoneIcon className="h-5 w-5 gap-2 text-primary" />
        <p className="text-sm text-gray-400">{phone}</p>
      </div>
      {/*   DIREITA */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleCopyPhoneClip(phone)}
      >
        Copiar
      </Button>
    </div>
  );
};

export default PhoneItem;
