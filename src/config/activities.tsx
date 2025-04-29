import { ReactElement } from "react";
import { FaBurger } from "react-icons/fa6";
import { FaWalking } from "react-icons/fa";
import { RiDrinks2Fill } from "react-icons/ri";

export type Activity = {
  name: string;
  color: string;
  icon?: ReactElement;
};

export const activities: Activity[] = [
  { name: "Sve", color: "white", icon: undefined },
  {
    name: "Bez brze hrane",
    color: "orange",
    icon: <FaBurger color="orange" />,
  },
  {
    name: "Bez sokova",
    color: "tomato",
    icon: <RiDrinks2Fill color="tomato" />,
  },
  {
    name: "20 minuta vežbe",
    color: "limegreen",
    icon: <FaWalking color="limegreen" />,
  },
] as const;
