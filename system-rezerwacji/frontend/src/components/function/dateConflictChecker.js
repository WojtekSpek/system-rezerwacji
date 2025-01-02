// utils/dateConflictChecker.js

export function hasConflict(existingEvents, newEvent) {
    return existingEvents.some((event) => {
      const existingStart = new Date(event.start);
      const existingEnd = new Date(event.end);
      const newStart = new Date(newEvent.start);
      const newEnd = new Date(newEvent.end);
  
      // Sprawdzanie, czy zakresy czasu się nakładają
      return (
        (newStart < existingEnd && newEnd > existingStart) || // Nakładanie
        (newStart >= existingStart && newEnd <= existingEnd) // Zawieranie się w istniejącym zakresie
      );
    });
  }
  
  export function hasConflictExcludingCurrent(existingEvents, newEvent, currentEventId) {
    return existingEvents.some((event) => {
      if (event.id === currentEventId) return false; // Pomijamy aktualnie edytowane wydarzenie
  
      const existingStart = new Date(event.start);
      const existingEnd = new Date(event.end);
      const newStart = new Date(newEvent.start);
      const newEnd = new Date(newEvent.end);
  
      return (
        (newStart < existingEnd && newEnd > existingStart) || 
        (newStart >= existingStart && newEnd <= existingEnd)
      );
    });
  }
  