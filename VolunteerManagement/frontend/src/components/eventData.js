// Fetches all events from the backend and sends it as json
export const fetchEvents = async () => {
    const response = await fetch('/api/eventsView/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
};