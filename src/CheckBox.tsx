import React, {ChangeEvent} from "react";

type PropsType= {
  isDone:boolean
  callBack:(isDone:boolean)=>void
}
export const CheckBox = (props:PropsType) => {

  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    props.callBack(e.currentTarget.checked)
  }
  return (
      <input
          type={'checkbox'}
             onChange={onChangeHandler}
             checked={props.isDone}/>
  )

}