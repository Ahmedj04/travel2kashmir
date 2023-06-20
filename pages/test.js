import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleStop,
  faCircleArrowRight
} from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  return <>
    <div>
    <h1>hello world</h1>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
      />
      <FontAwesomeIcon
        icon={faCircleStop}
      />
      <h1>a</h1>
      <FontAwesomeIcon icon={faCircleArrowRight} size="2xl" style={{color: "#2912d3",}} />
    </div>
  </>
}