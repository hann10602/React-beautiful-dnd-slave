import React, { memo, useContext } from "react";
import "./style.scss";
import ListItem from "./list-item";
import { GroupType } from "../../type";
import EyeIcon from "../../icon/eye.svg";
import HiddenIcon from "../../icon/hidden.svg";
import MenuIcon from "../../icon/menu.svg";
import { GroupToggleContext } from "../../App";
import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";

type Props = {
  groupItem: GroupType;
  dragHandleProps?: DraggableProvidedDragHandleProps | null | undefined;
};

const GroupItem = ({ groupItem, dragHandleProps }: Props) => {
  const GroupToggleHandler = useContext(GroupToggleContext);

  return (
    <div className="wrapper">
      <div className="group-menu">
        <div className="group-menu-icon">
          <img
            className={`${
              groupItem.isVisible ? "cursor-move" : "hidden-item"
            } group-icon`}
            src={MenuIcon}
            alt="menu"
            {...dragHandleProps}
          />
          {groupItem.isVisible ? (
            <img
              className="group-icon"
              src={EyeIcon}
              alt="eye"
              onClick={() => GroupToggleHandler(groupItem.id)}
            />
          ) : (
            <img
              className="group-icon"
              src={HiddenIcon}
              alt="eye"
              onClick={() => GroupToggleHandler(groupItem.id)}
            />
          )}
        </div>
      </div>
      <div className={`${groupItem.isVisible ? "" : "item-center"} group-main`}>
        <div className="group-header">
          <div className="group-header-img">{groupItem.icon}</div>
          <h4>{groupItem.title}</h4>
        </div>
        {groupItem.isVisible && groupItem.description && (
          <p className="group-header-description">{groupItem.description}</p>
        )}
      </div>
      {groupItem.isVisible && (
        <div className={`group-list-item`}>
          <ListItem
            isGroupVisible={groupItem.isVisible}
            listItem={groupItem.listItem}
            groupTitle={groupItem.title}
          />
        </div>
      )}
    </div>
  );
};

export default memo(GroupItem);
