import React from "react";
export default function Input() {
  return (
    <TextInput
      style={{
        borderWidth: 1,
        borderColor: "#c1c1c1",
        borderRadius: 3,
        width: 200,
        height: 35,
        padding: 10,
        margin: 10,
        color: "#fff",
      }}
      placeholder="Enter Name"
    />
  );
}
