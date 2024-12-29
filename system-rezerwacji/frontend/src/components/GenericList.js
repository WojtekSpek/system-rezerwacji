import React, { useState, useMemo } from "react";

function GenericList({
  items, // Dane do wyświetlenia
  columns, // Kolumny do wyświetlenia (np. [{ key: 'id', label: 'ID' }, { key: 'name', label: 'Imię' }])
  renderItem, // Funkcja renderująca każdy wiersz
  searchFunction, // Funkcja wyszukiwania (opcjonalna)
  defaultSortField = "id", // Domyślne pole sortowania
  pageSize = 10, // Domyślna liczba pozycji na stronę
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: defaultSortField,
    direction: "asc",
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Sortowanie elementów
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

  // Filtrowanie elementów
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return sortedItems;

    return sortedItems.filter((item) => searchFunction(item, searchQuery));
  }, [sortedItems, searchQuery, searchFunction]);

  // Paginacja
  const totalPages = Math.ceil(filteredItems.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + pageSize);

  // Funkcja do obsługi sortowania
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  return (
    <div className="p-4">
      {/* Wyszukiwanie */}
      <input
        type="text"
        placeholder="Wyszukaj..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className=" min-w-full table-fixed table-auto border-collapse border border-gray-200">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="border px-4 py-2 bg-gray-100 text-left cursor-pointer"
                  style={{ width: col.width || "auto" }} // Dodanie szerokości
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

      {/* Paginacja */}
      <div className="flex justify-between items-center mt-4">
        <span>
          Strona {currentPage} z {totalPages} | Łącznie pozycji:{" "}
          {filteredItems.length}
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
