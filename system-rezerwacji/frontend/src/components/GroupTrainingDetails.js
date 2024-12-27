function GroupTrainingDetails({ trainingId }) {
    const [activeTab, setActiveTab] = useState("details");
  
    return (
      <div>
        <h3 className="text-lg font-bold">Szczegóły szkolenia grupowego</h3>
        <div className="flex gap-4 border-b mb-4">
          <button
            onClick={() => setActiveTab("details")}
            className={`pb-2 ${activeTab === "details" ? "border-b-2 border-blue-500" : ""}`}
          >
            Szczegóły
          </button>
          <button
            onClick={() => setActiveTab("participants")}
            className={`pb-2 ${activeTab === "participants" ? "border-b-2 border-blue-500" : ""}`}
          >
            Uczestnicy
          </button>
          <button
            onClick={() => setActiveTab("calendar")}
            className={`pb-2 ${activeTab === "calendar" ? "border-b-2 border-blue-500" : ""}`}
          >
            Kalendarz
          </button>
        </div>
  
        {activeTab === "details" && <div>Szczegóły szkolenia</div>}
        {activeTab === "participants" && <div>Lista uczestników</div>}
        {activeTab === "calendar" && <div>Kalendarz zajęć</div>}
      </div>
    );
  }
  