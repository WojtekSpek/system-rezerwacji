import React, { useState, useMemo, useEffect } from "react";

function GenericList({
  items,
  columns,
  renderItem,
  searchFunction,
  defaultSortField = "id",
  pageSize = 10,
  onSelectionChange,
  focusOnId = undefined,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: defaultSortField,
    direction: "asc",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    console.log("@ GenericList: ", {focusOnId});
    if (!items || items.length === 0) return;

    if (focusOnId) {
      if (focusOnId !== -1) {
        const page = Math.floor(focusOnId / pageSize) + 1;
        setCurrentPage(page);
        return;
      }
    }

    setCurrentPage(1);

    if (onSelectionChange) {
      onSelectionChange(selectedItems);
    }

  }, [selectedItems, onSelectionChange, items?.length, focusOnId]);

  const sortedItems = useMemo(() => {
    if (!sortConfig.key) return items;

    return [...items].sort((a, b) => {
      const aValue = a[sortConfig.key] || "";
      const bValue = b[sortConfig.key] || "";

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    });
  }, [items, sortConfig]);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return sortedItems;
    return sortedItems.filter((item) => searchFunction(item, searchQuery));
  }, [sortedItems, searchQuery, searchFunction]);

  const totalPages = Math.ceil(filteredItems.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + pageSize);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      setSelectedItems(items.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Wyszukaj..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedItems.length === items.length && items.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="border px-4 py-2 bg-gray-100 text-left cursor-pointer"
                  style={{ width: col.width || "auto" }}
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}
                  {sortConfig.key === col.key && (
                    <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                    />
                  </td>
                  {renderItem(item)}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-4 text-gray-500"
                >
                  Brak danych do wyświetlenia
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span>
          Strona {currentPage} z {totalPages} | Łącznie pozycji:{" "}
          {filteredItems.length} | Zaznaczono: {selectedItems.length}
        </span>
        <div>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Poprzednia
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 ml-2"
          >
            Następna
          </button>
        </div>
      </div>
    </div>
  );
}

export default GenericList;
