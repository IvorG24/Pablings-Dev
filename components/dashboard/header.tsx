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

const tabs = [
  { value: "overview", label: "Sales Overview", icon: <GoGraph /> },
  { value: "appointment", label: "Appointment", icon: <MdPushPin /> },
  { value: "records", label: "Records", icon: <IoNewspaperSharp /> },
  { value: "barber", label: "Barbers", icon: <IoPersonSharp /> },
  { value: "walkin", label: "Walk In", icon: <FaUserPlus /> },
];

const Header = () => (
  <header className="w-full h-16 p-4 bg-yellow-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30">
    <nav className="flex justify-between items-center">
      <Link href={"/dashboard"} className="text-2xl font-bold text-yellow-500">
        Pablings
      </Link>
      <TabsList>
        {tabs.map(({ value, label, icon }) => (
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
    </nav>
  </header>
);

export default Header;
