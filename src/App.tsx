import React, { createContext, useState } from "react";
import "./style.scss";
import CloseIcon from "./icon/close.svg";
import ComputerPenIcon from "./icon/writing.svg";
import { groups } from "./const";
import GroupItem from "./component/group-item";
import { GroupType, ItemType } from "./type";
import { DragDropContext, Draggable, DropResult, Droppable, OnDragEndResponder } from "@hello-pangea/dnd";

export const GroupToggleContext = createContext<(id: string) => void>(
  (id: string) => {}
);

export const ItemToggleContext = createContext<(id: string) => void>(
  (id: string) => {}
);

export const ItemUpdateContext = createContext<
  (id: string, name: string) => void
>((id: string, name: string) => {});

export const ItemDeleteContext = createContext<(id: string) => void>(
  (id: string) => {}
);

function App() {
  const [groupList, setGroupList] = useState(groups);

  const toggleGroupHandler = (id: string) => {
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

  const itemUpdateHandler = (id: string, name: string) => {
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

  const itemDeleteHandler = (id: string) => {
    setGroupList((prev: GroupType[]) => {
      return prev.map((group: GroupType) => {
        const newListItem = group.listItem.filter(
          (item: ItemType) => item.id !== id
        );

        return { ...group, listItem: newListItem };
      });
    });
  };

  const toggleItemHandler = (id: string) => {
    setTimeout(() => {
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
    }, 100);
  };

  const handleOnDragEnd:OnDragEndResponder = (result:DropResult) => {
    const items = [...groupList];
    const [reorderedItem] = items.splice(result.source.index, 1);
    if(result.destination) {
      items.splice(result.destination.index, 0, reorderedItem);
    }

    setGroupList(items);
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
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="app">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <div id="body-container">
                        {groupList.map((item, i) => (
                          <div key={item.id}>
                            <Draggable draggableId={item.id} index={i}>
                              {(provided) => (
                                <div ref={provided.innerRef}
                                {...provided.draggableProps}>
                                  <GroupItem groupItem={item} dragHandleProps={provided.dragHandleProps}/>
                                </div>
                              )}
                            </Draggable>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </ItemDeleteContext.Provider>
        </ItemUpdateContext.Provider>
      </ItemToggleContext.Provider>
    </GroupToggleContext.Provider>
  );
}

export default App;
