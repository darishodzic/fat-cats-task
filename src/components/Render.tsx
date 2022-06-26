import React from "react";
import { generateInputType } from "../assets/helpers";

type RenderProps = {
  property: any;
  value: any;
  inputChangeHandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const Render = (props: RenderProps) => {
  const { property, value, inputChangeHandler } = props;
  return (
    <div
      style={{
        flex: "1",
        fontSize: "10px",
        wordWrap: "break-word",
        maxWidth: "8vw",
      }}
    >
      <div
        style={{
          margin: "10px",
          padding: "10px",
        }}
      >
        {property} = {String(value)};
      </div>
      {property === "_id" && value ? null : (
        <div>
          {value?.length > 30 ? (
            <textarea onChange={inputChangeHandler} value={value}></textarea>
          ) : (
            <input
              checked={value}
              value={value}
              type={generateInputType(value)}
              onChange={inputChangeHandler}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(Render, (oldProps, newProp) => {
  return oldProps.value === newProp.value;
});
