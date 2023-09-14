import { HiTv, HiWifi } from "react-icons/hi2";
import { GiAtSea } from "react-icons/gi";
import { GiCctvCamera } from "react-icons/gi";
import { MdPets } from "react-icons/md";
import { PiThermometerHot } from "react-icons/pi";
import { MdHotTub } from "react-icons/md";
import { LuParkingCircle } from "react-icons/lu";
import { MdOutlineKitchen } from "react-icons/md";
import { GiMonumentValley } from "react-icons/gi";
import { BsPersonWorkspace } from "react-icons/bs";

const icons = [
    {
        item: <HiWifi />,
        value: "wifi",
    },
    {
        item: <GiCctvCamera />,
        value: "security-cameras",
    },
    {
        item: <MdPets />,
        value: "pets",
    },
    {
        item: <PiThermometerHot />,
        value: "sauna",
    },
    {
        item: <MdHotTub />,
        value: "hot-tub",
    },
    {
        item: <LuParkingCircle />,
        value: "free-parking",
    },
    {
        item: <BsPersonWorkspace />,
        value: "workspace",
    },
    {
        item: <GiMonumentValley />,
        value: "valley-view",
    },
    {
        item: <MdOutlineKitchen />,
        value: "kitchen",
    },
    {
        item: <GiAtSea />,
        value: "river-view",
    },
];

export default function Icon({ value }) {
    return icons.find((icon) => icon.value == value)?.item;    
}
