import React, { createContext, useCallback, useState } from "react";
import "./style.scss";
import CloseIcon from "./icon/close.svg";
import ComputerPenIcon from "./icon/writing.svg";
import { groups } from "./const";
import GroupItem from "./component/group-item";
import { GroupType, ItemType } from "./type";

export const GroupToggleContext = createContext<(id: number) => void>(
  (id: number) => {}
);

export const ItemToggleContext = createContext<(id: number) => void>(
  (id: number) => {}
);

export const ItemUpdateContext = createContext<
  (id: number, name: string) => void
>((id: number, name: string) => {});

export const ItemDeleteContext = createContext<(id: number) => void>(
  (id: number) => {}
);

function App() {
  const [groupList, setGroupList] = useState(groups);

  const toggleGroupHandler = (id: number) => {
    setGroupList((prev: GroupType[]) => {
      return prev.map((group: GroupType) => {
        if (group.id === id) {
          const newGroup = { ...group, isVisible: !group.isVisible };
          return newGroup;
        }
        return group;
      });
    });
  };

  const itemUpdateHandler = (id: number, name: string) => {
    setGroupList((prev: GroupType[]) => {
      return prev.map((group: GroupType) => {
        const listItem: ItemType[] = [];
        group.listItem.map((item: ItemType) => {
          if (item.id === id) {
            const newItem = { ...item, name: name };
            listItem.push(newItem);
            return newItem;
          }

          listItem.push(item);
          return item;
        });

        return { ...group, listItem: listItem };
      });
    });
  };

  const itemDeleteHandler = (id: number) => {
    setGroupList((prev: GroupType[]) => {
      return prev.map((group: GroupType) => {
        const newListItem = group.listItem.filter(
          (item: ItemType) => item.id !== id
        );

        return { ...group, listItem: newListItem };
      });
    });
  };

  const toggleItemHandler = (id: number) => {
    setGroupList((prev: GroupType[]) => {
      return prev.map((group: GroupType) => {
        const listItem: ItemType[] = [];
        group.listItem.map((item: ItemType) => {
          if (item.id === id) {
            const newItem = { ...item, isVisible: !item.isVisible };
            listItem.push(newItem);
            return newItem;
          }

          listItem.push(item);
          return item;
        });

        return { ...group, listItem: listItem };
      });
    });
  };

  return (
    <GroupToggleContext.Provider value={toggleGroupHandler}>
      <ItemToggleContext.Provider value={toggleItemHandler}>
        <ItemUpdateContext.Provider value={itemUpdateHandler}>
          <ItemDeleteContext.Provider value={itemDeleteHandler}>
            <div className="App">
              <header>
                <div className="left-header">
                  <img src={ComputerPenIcon} alt="" />
                  <b>Manage Views</b>
                </div>
                <img src={CloseIcon} alt="" />
              </header>
              <div id="body-container">
                {groupList.map((item, i) => (
                  <div key={i}>
                    <GroupItem groupItem={item} />
                  </div>
                ))}
              </div>
            </div>
          </ItemDeleteContext.Provider>
        </ItemUpdateContext.Provider>
      </ItemToggleContext.Provider>
    </GroupToggleContext.Provider>
  );
}

export default App;
