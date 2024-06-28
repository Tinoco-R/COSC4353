import React from 'react';
import { skillsData } from "./skillsData";
// Data used to populate events
// Random event names for volunteers to attend
const eventNames = [
    "Food Drive",
    "Beach Cleanup",
    "Health Fair",
    "Tree Planting",
    "Habitat Restoration",
    "Art Workshop",
    "Tech Recycling",
    "Community Garden",
    "Homeless Shelter",
    "Pet Adoption Day",
    "Wildlife Conservation",
    "Book Drive",
    "Sustainable Living Workshop",
    "Mental Health Awareness",
    "Environmental Education",
    "Sports Tournament",
    "Music Festival",
    "Cultural Exchange",
    "STEM Camp",
    "Farmers Market",
    "Craft Fair"
];
// Random dates from 2024-2027
const dates = [
    "02/05/2024",
    "03/20/2024",
    "04/10/2024",
    "05/25/2024",
    "06/15/2024",
    "07/30/2024",
    "08/20/2024",
    "09/05/2024",
    "10/20/2024",
    "11/15/2024",
    "12/30/2024",
    "01/25/2025",
    "02/15/2025",
    "03/30/2025",
    "04/20/2025",
    "05/25/2025",
    "06/15/2025",
    "07/30/2025",
    "08/20/2025",
    "09/05/2025",
    "10/20/2025"
  ];
  // Random admin names
  const administrators = [
    "John Doe",
    "Jane Smith",
    "Robert Johnson",
    "Emily Williams",
    "Michael Brown",
    "Jessica Davis",
    "Richard Miller",
    "Patricia Moore",
    "Charles Jackson",
    "Michelle Taylor",
    "David Wilson",
    "Linda Anderson",
    "Mark Thomas",
    "Jennifer White",
    "Daniel Martin",
    "Karen Lee",
    "Matthew Green",
    "Nancy Harris",
    "Donald Thompson",
    "Betty Clark",
    "George Rodriguez"
];
const urgencyLevels = ["Low", "Medium", "High", "Critical"];
const volunteerUtilzation = [];

function generateRandomFraction(maxRegistrations, minRequired) {
    const registrations = Math.floor(Math.random() * (maxRegistrations + 1)); // Up to maxRegistrations
    const required = Math.floor(Math.random() * (100 - minRequired + 1)) + minRequired; // Between minRequired and 100
    if (registrations > required) {
        return `(${required}/${registrations})`;
    }
    return `(${registrations}/${required})`;
}

// Generates events with random data, assigning them random values for its name, date, administrator, urgency, volunteer utilization, and skills
function generateEvents(eventNames, dates, administrators, urgencyLevels, volunteerUtilzation) {
    let events = [];
    for (let i = 0; i < eventNames.length; i++) {
        let event = {
            id: i + 1,
            name: eventNames[i],
            date: dates[i],
            administrator: administrators[i],
            urgency: urgencyLevels[Math.floor(Math.random() * urgencyLevels.length)],
            volunteers: volunteerUtilzation[i],
            skills: ""
        };
        for (let j = 0; j < 3; j++) {
            let skillToAdd = skillsData[Math.floor(Math.random() * skillsData.length)];
            if (!event.skills.includes(skillToAdd)) {
                event.skills += `${skillToAdd}, `;
            }
        }
        while (event.skills.endsWith(',') || event.skills.endsWith(' ')) {
            event.skills = event.skills.slice(0, -1);
        }
        events.push(event);
    }
    return events;
}


for (let i = 0; i < eventNames.length; i++) {
    volunteerUtilzation.push(generateRandomFraction(100, 20)); // Set max registrations to 100, min required to 20
}
export const eventData = generateEvents(eventNames, dates, administrators, urgencyLevels, volunteerUtilzation);