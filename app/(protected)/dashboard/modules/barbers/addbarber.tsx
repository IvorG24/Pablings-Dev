"use client";
import React, { useOptimistic, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { addBarber } from "@/app/action/barber";
import { Barber } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";
import { SubmitButton } from "@/components/SubmitButton";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AddBarber = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [imageBase64, setImageBase64] = useState<string>("");
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImageName(file.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setImageBase64(base64data);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full h-40 max-w-sm rounded-lg border-2 border-yellow-600 flex items-center justify-center text-3xl">
        +
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Barber</DialogTitle>
          <form
            action={async (formdata: FormData) => {
              formdata.set("image", imageBase64);
              try {
                await addBarber(formdata);
                toast({
                  title: `You have created a barber `,
                  description: `Please wait`,
                });
              } catch (error) {
                toast({
                  title: `Something went wrong `,
                  description: `${error}`,
                });
              }
            }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center justify-center">
              <label className="relative w-24 h-24 border-2 flex items-center justify-center rounded-full overflow-hidden cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0"
                  onChange={handleFileChange}
                />
                {imageName ? (
                  <Avatar>
                    <AvatarImage src={imageBase64} alt="@shadcn" />
                    <AvatarFallback>BB</AvatarFallback>
                  </Avatar>
                ) : (
                  <p className="text-center cursor-pointer">+</p>
                )}
              </label>
            </div>
            <p className="text-center cursor-pointer">Upload a picture</p>
            <Label>Name</Label>
            <Input placeholder="Enter name" name="name" />
            <Label>Email</Label>
            <Input type="email" placeholder="Enter email" name="email" />
            <Label>Phone</Label>
            <Input
              type="tel"
              placeholder="Enter phone number"
              name="phonenumber"
            />
            <div className="flex justify-end">
              <SubmitButton
                className="w-full"
                type="submit"
                pendingText="Creating new barber ..."
              >
                Create
              </SubmitButton>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddBarber;
