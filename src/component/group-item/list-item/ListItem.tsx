import React, { memo } from "react";
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
  const falseList = listItem.filter((item) => item.isVisible === false);

  const handleOnDragEnd: OnDragEndResponder = (result: DropResult) => {};

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId={groupTitle}>
        {(provided) => (
          <div
            className="list-item"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {listItem
              .filter((item) => item.isVisible === true)
              .map((item, i) => (
                <div key={item.id}>
                  <Draggable draggableId={item.name} index={i}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Item data={item} isGroupVisible={isGroupVisible} />
                      </div>
                    )}
                  </Draggable>
                </div>
              ))}
            {falseList.length !== 0 && <hr />}
            {falseList.map((item, i) => (
              <div key={item.id}>
                <Draggable draggableId={item.name} index={i}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Item data={item} isGroupVisible={isGroupVisible} />
                    </div>
                  )}
                </Draggable>
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default memo(ListItem);
