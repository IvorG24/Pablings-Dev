import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CiMenuFries } from "react-icons/ci";
import { TabsContent } from "./header";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signOut } from "@/auth";
import {
  isRedirectError,
  redirect,
} from "next/dist/client/components/redirect";
import { SubmitButton } from "../SubmitButton";
interface MenuDrawerProps {
  role: string;
}
const MenuDrawer = ({ role }: MenuDrawerProps) => {
  return (
    <Sheet>
      <SheetTrigger className="block xl:hidden">
        <CiMenuFries className="text-2xl font-bold" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu Bar</SheetTitle>
          <div>
            <TabsList className="flex flex-col items-end gap-4 h-full w-full ">
              {TabsContent.filter(
                (tab) => !tab.role || tab.role.includes(role)
              ).map(({ value, label, icon }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="flex items-center justify-end space-x-2 w-full"
                >
                  {icon}
                  <span>{label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            <form
              action={async () => {
                "use server";
                try {
                  await signOut({ redirect: false });
                } catch (err) {
                  if (isRedirectError(err)) {
                    console.error(err);
                    throw err;
                  }
                } finally {
                  redirect("/sign-in");
                }
              }}
            >
              <SubmitButton
                className="absolute bottom-5 right-8"
                pendingText="Signing out..."
              >
                Sign Out
              </SubmitButton>
            </form>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MenuDrawer;
