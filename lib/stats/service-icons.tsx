import { IconType } from "react-icons";
import {
  SiChessdotcom,
  SiGithub,
  SiX,
  SiInstagram,
  SiLinkedin,
  SiStrava,
  SiApple,
  SiYoutube,
  SiSpotify,
  SiStripe,
} from "react-icons/si";
import { TbChartBar } from "react-icons/tb";

export const serviceIcons: Record<string, IconType> = {
  chess: SiChessdotcom,
  github: SiGithub,
  x: SiX,
  instagram: SiInstagram,
  linkedin: SiLinkedin,
  strava: SiStrava,
  appleHealth: SiApple,
  youtube: SiYoutube,
  spotify: SiSpotify,
  stripe: SiStripe,
  datafast: TbChartBar,
};

export const serviceColors: Record<string, string> = {
  chess: "#81b64c",
  github: "#181717",
  x: "#000000",
  instagram: "#E4405F",
  linkedin: "#0A66C2",
  strava: "#FC4C02",
  appleHealth: "#000000",
  youtube: "#FF0000",
  spotify: "#1DB954",
  stripe: "#635BFF",
  datafast: "#f97316",
};
