import React, { memo, useContext, useState } from "react";
import "./style.scss";
import { ItemType } from "../../../../type";
import EyeIcon from "../../../../icon/eye.svg";
import HiddenIcon from "../../../../icon/hidden.svg";
import MenuIcon from "../../../../icon/menu.svg";
import EditIcon from "../../../../icon/edit.svg";
import DeleteIcon from "../../../../icon/delete.svg";
import {
  ItemDeleteContext,
  ItemToggleContext,
  ItemUpdateContext,
} from "../../../../App";

type Props = {
  data: ItemType;
  isGroupVisible: Boolean;
};

const Item = ({ data, isGroupVisible }: Props) => {
  const [isUpdate, setIsUpdate] = useState<Boolean>(false);
  const [name, setName] = useState<string>(data.name);

  const itemToggleHandler = useContext(ItemToggleContext);
  const itemUpdateHandler = useContext(ItemUpdateContext);
  const itemDeleteHandler = useContext(ItemDeleteContext);

  return (
    <div className="item">
      <div className="left-item">
        <img
          className={data.isVisible ? "menu-icon" : "menu-icon hidden-item"}
          src={MenuIcon}
          alt="menu"
        />
        {data.isVisible ? (
          <img
            className="eye-icon"
            src={EyeIcon}
            alt="eye"
            onClick={
              isGroupVisible ? () => itemToggleHandler(data.id) : () => {}
            }
          />
        ) : (
          <img
            className="hidden-icon"
            src={HiddenIcon}
            alt="eye"
            onClick={
              isGroupVisible ? () => itemToggleHandler(data.id) : () => {}
            }
          />
        )}
        <div className={data.isVisible ? "item-icon" : "item-icon hidden-item"}>
          {data.icon}
        </div>
        {isUpdate ? (
          <input
            className="edit-input"
            type="text"
            placeholder="Enter the item"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <p className={data.isVisible ? "item-name" : "item-name hidden-item"}>
            {data.name}
          </p>
        )}
      </div>
      <div className="right-item">
        <img
          className="edit-icon"
          src={EditIcon}
          alt="edit"
          onClick={
            isGroupVisible && isUpdate
              ? () => {
                  itemUpdateHandler(data.id, name);
                  setIsUpdate(false);
                }
              : () => {
                  setIsUpdate(true);
                }
          }
        />
        <img
          className="delete-icon"
          src={DeleteIcon}
          alt="delete"
          onClick={isGroupVisible ? () => itemDeleteHandler(data.id) : () => {}}
        />
      </div>
    </div>
  );
};

export default memo(Item);
