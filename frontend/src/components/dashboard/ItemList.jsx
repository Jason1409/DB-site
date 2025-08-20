import React from "react";
import ItemCard from "./ItemCard";

const ItemList = ({ items = [], onView, onEdit, onDelete }) => {
  if (!items || items.length === 0) {
    return <p className="text-gray-500 text-center py-8">No items found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ItemCard
          key={item.id || item._id}
          item={item}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ItemList;
