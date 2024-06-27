import React from 'react';

// Data used to populate volunteers
const firstNames = ["Alice", "Bob", "Charlie", "David", "Eva", "Frank", "Grace", "Harry", "Isla", "John", "Katie", "Luke", "Mia", "Nathan", "Olivia", "Peter", "Quinn", "Ruby", "Samuel", "Teresa", "Uma", "Victor", "Wendy", "Xavier", "Yvonne", "Zachary", "Aaron", "Bella", "Casey", "Daniel", "Emily", "Felix", "Gina", "Hannah", "Ian", "Jasmine", "Kyle", "Lily", "Marcus", "Natalie", "Oscar", "Penny", "Riley", "Sophia", "Theo", "Vanessa", "William", "Xenia", "Yoshi", "Zoe"];
const skillsList = ["Painting", "Drawing", "Building", "Web Development", "Event Planning", "First Aid", "Graphic Design", "Plumbing", "Network Administration", "Catering Coordination"];
const ratings = ["1/5", "2/5", "3/5", "4/5", "5/5"];
const attendances = ["50%", "75%", "90%", "95%", "100%"];

// Generates volunteers with random data, assigning them random values for their rating, attendance, and skills (no duplicated skills allowed)
function generateVolunteers(firstNames, skillsList, ratings, attendances) {
    let volunteers = [];
    for (let i = -1; i < firstNames.length; i++) {
        let volunteer = {
            row: i + 1,
            name: firstNames[i],
            rating: ratings[Math.floor(Math.random() * ratings.length)],
            attendence: attendances[Math.floor(Math.random() * attendances.length)],
            skills: []
        };
        for (let j = 0; j < 5; j++) {
            let skillToAdd = skillsList[Math.floor(Math.random() * skillsList.length)];
            if (!volunteer.skills.some(skill => skill.skill === skillToAdd)) {
                volunteer.skills.push({skill: skillToAdd});
            }
        }
        volunteers.push(volunteer);
    }
    return volunteers;
}

export const cardData = generateVolunteers(firstNames, skillsList, ratings, attendances);