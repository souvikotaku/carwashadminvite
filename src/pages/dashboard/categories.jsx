import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
} from "@material-tailwind/react";

// Utility function to get categories from localStorage
const getCategoriesFromLocalStorage = () => {
  const categories = localStorage.getItem("categories");
  return categories ? JSON.parse(categories) : []; // Return parsed categories if available, or an empty array
};

export function Categories() {
  const paymentTableData = [
    { id: 1, name: "John Doe", date: "2024-10-15", status: "Successful", amount: 200 },
    { id: 2, name: "Jane Smith", date: "2024-10-16", status: "Cancelled", amount: 150 },
    { id: 3, name: "Robert Brown", date: "2024-10-17", status: "Pending", amount: 250 },
  ];

  const [categories, setCategories] = useState(getCategoriesFromLocalStorage());
  const [newCategory, setNewCategory] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  // Update localStorage whenever categories state changes
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const handleAddCategory = () => {
    if (!newCategory.trim()) return; // Don't add empty categories
    const newCategoryObj = { id: Date.now(), name: newCategory };
    setCategories((prevCategories) => [...prevCategories, newCategoryObj]);
    setNewCategory(""); // Reset input
  };

  const handleEdit = (id, name) => {
    setEditCategoryId(id);
    setEditCategoryName(name);
  };

  const handleSaveEdit = () => {
    const updatedCategories = categories.map((category) =>
      category.id === editCategoryId ? { ...category, name: editCategoryName } : category
    );
    setCategories(updatedCategories);
    setEditCategoryId(null);
    setEditCategoryName("");
  };

  const handleDelete = (id) => {
    const filteredCategories = categories.filter((category) => category.id !== id);
    setCategories(filteredCategories);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Category List
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {/* Add Category */}
          <div className="mb-6" style={{
            paddingLeft: '1.2%'
          }}>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="border p-2 rounded-md"
              placeholder="Add a new category"
            />
            <button
              onClick={handleAddCategory}
              className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
            >
              Add Category
            </button>
          </div>

          {/* Category List */}
          <ul className="space-y-4">
            {categories.map((category) => (
              <li
                key={category.id}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
              >
                {editCategoryId === category.id ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={editCategoryName}
                      onChange={(e) => setEditCategoryName(e.target.value)}
                      className="border border-gray-300 rounded-md p-2"
                    />
                    <button
                      onClick={handleSaveEdit}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditCategoryId(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4 w-full justify-between">
                    <span className="text-lg font-medium w-1/2 truncate">
                      {category.name}
                    </span>
                    <div className="flex space-x-2 w-auto">
                      <button
                        onClick={() => handleEdit(category.id, category.name)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}

export default Categories;
