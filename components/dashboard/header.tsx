import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GoGraph } from "react-icons/go";
import { MdPushPin } from "react-icons/md";
import { IoNewspaperSharp, IoPersonSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";

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
      <h1 className="text-2xl font-bold text-yellow-500">Pablings</h1>
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
      </TabsList>
    </nav>
  </header>
);

export default Header;
