import React from "react";
import CardTableListofUsers from "components/Cards/CardTableListofUsers";
import CardTableListofPediatres from "components/Cards/CardTableListofPediatres";
import CardTableListofParents from "components/Cards/CardTableListofParents";

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">

        {/* Table Utilisateurs en premier */}
        <div className="w-full mb-12 px-4">
          <CardTableListofUsers color="dark" />
        </div>

        {/* Table Pédiatres en dessous */}
        <div className="w-full mb-12 px-4">
          <CardTableListofPediatres color="dark" />
        </div>
        
        <div className="w-full mb-12 px-4">
          <CardTableListofParents color="dark" />
        </div>
        

      </div>
    </>
  );
}