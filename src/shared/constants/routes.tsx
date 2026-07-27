import type { ReactElement } from "react";
import Beauty from "@pages/Beauty";
import Looks from "@pages/Looks";
import Upcycling from "@pages/Upcycling";
import Wardrobe from "@pages/Wardrobe";

export const Paths = {
  beauty: "/beauty",
  looks: "/looks",
  upcycling: "/upcycling",
  wardrobe: "/wardrobe",
} as const;

export interface RoutesProps {
  key: string;
  link: string;
  Component: () => ReactElement;
  name: string;
}

export const routes: RoutesProps[] = [
  {
    key: "",
    link: Paths.wardrobe,
    Component: Wardrobe,
    name: "Гардероб",
  },
  {
    key: "",
    link: Paths.looks,
    Component: Looks,
    name: "Луки",
  },
  {
    key: "",
    link: Paths.beauty,
    Component: Beauty,
    name: "Бьюти",
  },

  {
    key: "",
    link: Paths.upcycling,
    Component: Upcycling,
    name: "Апсайклинг",
  },
];
