import React from "react";

function LeftPanel({ view, setView }) {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <ul className="space-y-2">
            <li
              className={`cursor-pointer p-2 hover:bg-gray-200 ${
                view === "projects" && "bg-gray-300 font-bold"
              }`}
              onClick={() => setView("projects")}
            >
              Projekty
        </li>
        <li
          className={`cursor-pointer p-2 hover:bg-gray-200 ${
            view === "trainers" ? "bg-gray-300 font-bold" : ""
          }`}
          onClick={() => setView("trainers")}
        >
          Szkoleniowcy
        </li>
      </ul>
    </div>
  );
}

export default LeftPanel;
