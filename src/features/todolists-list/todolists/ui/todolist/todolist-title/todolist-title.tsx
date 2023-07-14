import { EditableSpan } from "common/components";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import React, { FC } from "react";
import { useActions } from "common/hooks";
import { TodolistDomainType, todolistsThunks } from "features/todolists-list/todolists/model/todolists.reducer";

type Props = {
  todolist: TodolistDomainType;
};

export const TodolistTitle: FC<Props> = ({ todolist }) => {
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);

  const removeTodolistCallback = () => {
    removeTodolist(todolist.id);
  };

  const changeTodolistTitleCallback = (title: string) => {
    changeTodolistTitle({ id: todolist.id, title });
  };

  return (
    <h3>
      <EditableSpan value={todolist.title} onChange={changeTodolistTitleCallback} />
      <IconButton onClick={removeTodolistCallback} disabled={todolist.entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </h3>
  );
};
