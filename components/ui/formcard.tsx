import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FormCardProps } from "@/lib/type";

const FormCard: React.FC<FormCardProps> = ({
  Avatarsrc,
  Avatarfallback,
  name,
  time,
  price,
  description,
}) => {
  return (
    <>
      <div className="flex justify-between items-start">
        <div className="flex gap-6 items-center">
          <Avatar>
            {Avatarsrc ? (
              <AvatarImage src={Avatarsrc} />
            ) : (
              <AvatarFallback>{Avatarfallback}</AvatarFallback>
            )}
          </Avatar>
          <div className="space-y-2">
            <p>{name}</p>
            <Badge>{time}</Badge>
          </div>
        </div>

        <p className="text-xl">{price}</p>
      </div>
      {description && (
        <p className="text-sm text-white/50 pt-2">{description}</p>
      )}
    </>
  );
};

export default FormCard;
