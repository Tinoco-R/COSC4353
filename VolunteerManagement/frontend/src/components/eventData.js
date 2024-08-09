// Fetches all events from the backend and sends it as json
export const fetchEvents = async () => {
    const response = await fetch('/api/eventsView/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
};

// Fetches all events from the backend and sends it as json
export const fetchEventVolunteers = async (Event_ID) => {
  const response = await fetch(`/api/eventVolunteerMatchView/?Event_ID=${Event_ID}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Fetches all volunteer history from the backend and sends it as json
export const fetchVolunteerHistory = async () => {
  const response = await fetch(`/api/volunteerHistory/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Fetches all events from the backend and sends it as json
export const fetchProfiles = async () => {
  const response = await fetch('/api/profilesView/');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};