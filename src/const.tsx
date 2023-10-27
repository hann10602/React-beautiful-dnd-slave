import SquareIcon from "./icon/square.svg";
import BalanceIcon from "./icon/balance.svg";
import BriefCaseIcon from "./icon/briefcase.svg";
import LightBulbIcon from "./icon/lightbulb.svg";
import RoadMapIcon from "./icon/roadmap.svg";
import ServerIcon from "./icon/server.svg";
import CompassIcon from "./icon/compass.svg";
import { GroupType } from "./type";

export const groups: GroupType[] = [
  {
    id: "1",
    title: "Portfolio",
    icon: <img src={BriefCaseIcon} alt="" />,
    isVisible: true,
    description:
      "Gain visibility and insight across your porfolio of intiatives",
    listItem: [
      {
        id: "1",
        name: "Objective 2023",
        icon: <img src={CompassIcon} alt="" />,
        isVisible: true,
      },
      {
        id: "2",
        name: "Major Initiatives",
        icon: <img src={ServerIcon} alt="" />,
        isVisible: true,
      },
      {
        id: "3",
        name: "Marketing Roadmap",
        icon: <img src={RoadMapIcon} alt="" />,
        isVisible: true,
      },
      {
        id: "4",
        name: "Marketing Prioritisation",
        icon: <img src={LightBulbIcon} alt="" />,
        isVisible: true,
      },
      {
        id: "5",
        name: "Value vs Effort 2x2",
        icon: <img src={BalanceIcon} alt="" />,
        isVisible: false,
      },
      {
        id: "6",
        name: "2023 12-Month Roadmap",
        icon: <img src={RoadMapIcon} alt="" />,
        isVisible: false,
      },
    ],
  },
  {
    id: "2",
    title: "Default Workspace",
    icon: <img src={SquareIcon} alt="" />,
    isVisible: false,
    listItem: [
      {
        id: "7",
        name: "Objective 2023",
        icon: <img src={CompassIcon} alt="" />,
        isVisible: true,
      },
      {
        id: "8",
        name: "Major Initiatives",
        icon: <img src={ServerIcon} alt="" />,
        isVisible: true,
      },
      {
        id: "9",
        name: "Marketing Roadmap",
        icon: <img src={RoadMapIcon} alt="" />,
        isVisible: true,
      },
      {
        id: "10",
        name: "Marketing Prioritisation",
        icon: <img src={LightBulbIcon} alt="" />,
        isVisible: true,
      },
      {
        id: "11",
        name: "Value vs Effort 2x2",
        icon: <img src={BalanceIcon} alt="" />,
        isVisible: false,
      },
      {
        id: "12",
        name: "2023 12-Month Roadmap",
        icon: <img src={RoadMapIcon} alt="" />,
        isVisible: false,
      },
    ],
  },
];
