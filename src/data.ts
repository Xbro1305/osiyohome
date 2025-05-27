import item135_1 from "./assets/CatalogItems/135.jpg";
import item134_1 from "./assets/CatalogItems/134.jpg";
import item133_1 from "./assets/CatalogItems/133.jpg";
import item132_1 from "./assets/CatalogItems/132.jpg";
import item131_1 from "./assets/CatalogItems/131.jpg";
import item130_1 from "./assets/CatalogItems/130.jpg";
import item125_1 from "./assets/CatalogItems/125.jpg";
import item788_1 from "./assets/CatalogItems/788-1.jpg";
import item788_2 from "./assets/CatalogItems/788-2.jpg";
import item788_3 from "./assets/CatalogItems/788-3.jpg";
import item236_1 from "./assets/CatalogItems/236-1.jpg";
import item236_2 from "./assets/CatalogItems/236-2.jpg";
import item230_1 from "./assets/CatalogItems/230-1.jpg";
import item230_2 from "./assets/CatalogItems/230-2.jpg";
import item238_1 from "./assets/CatalogItems/238-1.jpg";
import item238_2 from "./assets/CatalogItems/238-2.jpg";
import item224_1 from "./assets/CatalogItems/224-1.jpg";
import item224_2 from "./assets/CatalogItems/224-2.jpg";
import item25 from "./assets/CatalogItems/25.jpg";
import item24 from "./assets/CatalogItems/24.jpg";
import item23 from "./assets/CatalogItems/23.jpg";
import item22 from "./assets/CatalogItems/22.jpg";
import item21 from "./assets/CatalogItems/21.jpg";
import item20 from "./assets/CatalogItems/20.jpg";
import item19 from "./assets/CatalogItems/19.jpg";
import item18 from "./assets/CatalogItems/18.jpg";
import item9 from "./assets/CatalogItems/009.jpg";

const plain_painted: {
  art: number;
  images: string[];
  link: string;
}[] = [
  {
    art: 9,
    images: [item9],
    link: "/catalog/item/009",
  },
  {
    art: 135,
    images: [item135_1],
    link: "/catalog/item/135",
  },
  {
    art: 134,
    images: [item134_1],
    link: "/catalog/item/134",
  },
  {
    art: 133,
    images: [item133_1],
    link: "/catalog/item/133",
  },
  {
    art: 132,
    images: [item132_1],
    link: "/catalog/item/132",
  },
  {
    art: 131,
    images: [item131_1],
    link: "/catalog/item/131",
  },
  {
    art: 130,
    images: [item130_1],
    link: "/catalog/item/130",
  },
  {
    art: 125,
    images: [item125_1],
    link: "/catalog/item/125",
  },
];

const printed: {
  art: number;
  images: string[];
  link: string;
}[] = [
  {
    art: 788,
    images: [item788_1, item788_2, item788_3],
    link: "/catalog/item/788",
  },
  {
    art: 236,
    images: [item236_1, item236_2],
    link: "/catalog/item/236",
  },
  {
    art: 230,
    images: [item230_1, item230_2],
    link: "/catalog/item/230",
  },
  {
    art: 238,
    images: [item238_1, item238_2],
    link: "/catalog/item/238",
  },
  {
    art: 224,
    images: [item224_1, item224_2],
    link: "/catalog/item/224",
  },
];

const digital_printed: {
  art: number;
  images: string[];
  link: string;
}[] = [
  {
    art: 25,
    images: [item25],
    link: "/catalog/item/25",
  },
  {
    art: 24,
    images: [item24],
    link: "/catalog/item/24",
  },
  {
    art: 23,
    images: [item23],
    link: "/catalog/item/23",
  },
  {
    art: 22,
    images: [item22],
    link: "/catalog/item/22",
  },
  {
    art: 21,
    images: [item21],
    link: "/catalog/item/21",
  },
  {
    art: 20,
    images: [item20],
    link: "/catalog/item/20",
  },
  {
    art: 19,
    images: [item19],
    link: "/catalog/item/19",
  },
  {
    art: 18,
    images: [item18],
    link: "/catalog/item/18",
  },
];

export const data: {
  title: string;
  link: string;
  items: { art: number; images: string[]; link: string }[];
}[] = [
  {
    title: "Гладкокрашеный",
    items: plain_painted,
    link: "/catalog/category/plain-painted",
  },
  { title: "Печатный", items: printed, link: "/catalog/category/printed" },
  {
    title: "Цифровая печать",
    items: digital_printed,
    link: "/catalog/category/digital-printed",
  },
];
