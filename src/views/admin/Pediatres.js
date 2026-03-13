import React from "react";
import CardTableListofPediatres from "components/Cards/CardTableListofPediatres";

export default function Pediatres() {
  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full mb-12 px-4">
        <CardTableListofPediatres color="dark" />
      </div>
    </div>
  );
}