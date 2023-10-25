import React, { memo, useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import "./style.scss";

import { ItemType } from "../../../type";
import Item from "./item";

type Props = {
  groupTitle: string;
  isGroupVisible: Boolean;
  listItem: ItemType[];
};

const ListItem = ({ groupTitle, isGroupVisible, listItem }: Props) => {
  const [visibleList, setVisibleList] = useState<ItemType[]>(
    listItem.filter((item) => item.isVisible === true)
  );
  const invisibleList = listItem.filter((item) => item.isVisible === false);

  useEffect(() => {
    setTimeout(() => {
      const currentList = listItem.filter((item) => item.isVisible === true);
    if (currentList.length > visibleList.length) {
      console.log("hien len");
      setVisibleList((prev) => [
        ...prev,
        ...listItem.filter(
          (item) => !visibleList.includes(item) && item.isVisible === true
        ),
      ]);
    }

    if (currentList.length < visibleList.length) {
      console.log("an di");
      setVisibleList((prev) => [
        ...prev.filter((item) => listItem.includes(item)),
      ]);
    }
    }, 100)
  }, [listItem]);

  const handleOnDragEnd: OnDragEndResponder = (result: DropResult) => {
    const items = [...visibleList];
    console.log(items);
    const [reorderedItem] = items.splice(result.source.index, 1);
    if (result.destination) {
      items.splice(result.destination.index, 0, reorderedItem);
    }
    setVisibleList(items);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId={groupTitle}>
        {(provided) => (
          <div
            className="list-item"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {visibleList.map((item, i) => (
              <div key={item.id}>
                <Draggable draggableId={item.id} index={i}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <Item
                        data={item}
                        isGroupVisible={isGroupVisible}
                        dragHandleProps={provided.dragHandleProps}
                      />
                    </div>
                  )}
                </Draggable>
              </div>
            ))}
            {provided.placeholder}
            {invisibleList.length !== 0 && visibleList.length !== 0 && <hr style={{ marginTop: 8 }} />}
            {invisibleList.map((item, i) => (
              <div key={item.id}>
                <Item data={item} isGroupVisible={isGroupVisible} />
              </div>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default memo(ListItem);
