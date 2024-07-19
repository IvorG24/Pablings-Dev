import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GoGraph } from "react-icons/go";
import { MdPushPin } from "react-icons/md";
import { IoNewspaperSharp, IoPersonSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { signOut } from "@/auth";
import {
  isRedirectError,
  redirect,
} from "next/dist/client/components/redirect";
import { SubmitButton } from "../SubmitButton";
import Link from "next/link";
import MenuDrawer from "./drawer";
import { ADMIN_ROLE, COUNTER_ROLE } from "@/lib/type";

export const TabsContent = [
  {
    value: "overview",
    label: "Sales Overview",
    icon: <GoGraph />,
    role: [ADMIN_ROLE, COUNTER_ROLE],
  },
  {
    value: "appointment",
    label: "Appointment",
    icon: <MdPushPin />,
    role: [ADMIN_ROLE, COUNTER_ROLE],
  },
  { value: "records", label: "Records", icon: <IoNewspaperSharp /> },
  {
    value: "barber",
    label: "Barbers",
    icon: <IoPersonSharp />,
    role: [ADMIN_ROLE, COUNTER_ROLE],
  },
  {
    value: "walkin",
    label: "Walk In",
    icon: <FaUserPlus />,
    role: [COUNTER_ROLE],
  },
];
interface HeaderProps {
  userRole?: string;
}

const Header = async ({ userRole }: HeaderProps) => {
  const role = userRole || COUNTER_ROLE;

  return (
    <header className="w-full h-20 p-6 bg-yellow-200 xl:rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30">
      <nav className="flex justify-between items-center">
        <Link
          href={"/dashboard"}
          className="text-4xl text-yellow-500 font-serif font-bold"
        >
          Pablings Pasig Sandoval
        </Link>
        <TabsList className="hidden xl:flex">
          {TabsContent.filter(
            (tab) => !tab.role || tab.role.includes(role)
          ).map(({ value, label, icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="flex items-center space-x-2"
            >
              {icon}
              <span>{label}</span>
            </TabsTrigger>
          ))}
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
            <SubmitButton pendingText="Signing out...">Sign Out</SubmitButton>
          </form>
        </TabsList>
        <MenuDrawer role={role} />
      </nav>
    </header>
  );
};

export default Header;
