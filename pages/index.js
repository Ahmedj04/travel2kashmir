import Hotel from "./hotel";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function Home() {
  return (
    <Hotel />
  )
}
