// import { ActionCreator, ActionCreatorsMapObject, AsyncThunk, bindActionCreators } from "@reduxjs/toolkit";
// import { useMemo } from "react";
// import { useAppDispatch } from "common/hooks/useAppDispatch";
//
// export const useActions = <Actions extends ActionCreatorsMapObject = ActionCreatorsMapObject>(
//   actions: Actions,
// ): BoundActions<Actions> => {
//   const dispatch = useAppDispatch();
//
//   return useMemo(() => bindActionCreators(actions, dispatch), []);
// };
//
// // Types
// type BoundActions<Actions extends ActionCreatorsMapObject> = {
//   [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any> ? BoundAsyncThunk<Actions[key]> : Actions[key];
// };
//
// type BoundAsyncThunk<Action extends ActionCreator<any>> = (
//   ...args: Parameters<Action>
// ) => ReturnType<ReturnType<Action>>;

import { useMemo } from "react";
import { ActionCreatorsMapObject, bindActionCreators } from "redux";
import { useAppDispatch } from "common/hooks/useAppDispatch";

export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators<T, RemapActionCreators<T>>(actions, dispatch), [actions, dispatch]);
};

// Types
type IsValidArg<T> = T extends object ? (keyof T extends never ? false : true) : true;
type ActionCreatorResponse<T extends (...args: any[]) => any> = ReturnType<ReturnType<T>>;
type ReplaceReturnType<T, TNewReturn> = T extends (a: infer A) => infer R
  ? IsValidArg<A> extends true
    ? (a: A) => TNewReturn
    : () => TNewReturn
  : never;
type RemapActionCreators<T extends ActionCreatorsMapObject> = {
  [K in keyof T]: ReplaceReturnType<T[K], ActionCreatorResponse<T[K]>>;
};
