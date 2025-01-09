export const createEventStyleGetter = (currentType) => {
    return (event) => {
        console.log('wywolano createEventStyleGetter poczatek',event)
      const colors = ["#f56c6c", "#67c23a", "#6f5126", "#409eff", "#e6a23c", "#909399"];
      const tabId = currentType?.id || 0; // Jeśli brak id, ustaw 0
      const assignedColor = colors[tabId % colors.length];
  
      if (event.typeName?.trim().toLowerCase() === currentType?.name?.trim().toLowerCase()) {

        console.log('wywolano createEventStyleGetter ',event)
        // Kolorowe wydarzenie dla aktywnej zakładki
        return {
          style: {
            backgroundColor: assignedColor,
            color: "white",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            opacity: 1,
          },
        };
      } else {
        // Zaszarzałe wydarzenie dla nieaktywnej zakładki
        return {
          style: {
            backgroundColor: "#d3d3d3",
            color: "#a9a9a9",
            borderRadius: "5px",
            border: "none",
            cursor: "not-allowed",
            opacity: 0.6,
          },
        };
      }
    };
  };
  