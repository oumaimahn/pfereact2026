import React from "react";
import CardTableListofParents from "components/Cards/CardTableListofParents";

export default function Parents() {
  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full mb-12 px-4">
        <CardTableListofParents color="dark" />
      </div>
    </div>
  );
}