import { skillsData } from "./skillsData";
import { stateData } from "./stateData";

// https://www.randomlists.com/random-addresses?qty=40 for random addresses

// Data used to populate events

// Random volunteers
const firstNames = ["Alice", "Bob", "Charlie", "David", "Eva", "Frank", "Grace", "Harry", "Isla", "John", "Katie", "Luke", "Mia", "Nathan", "Olivia", "Peter", "Quinn", "Ruby", "Samuel", "Teresa", "Uma", "Victor", "Wendy", "Xavier", "Yvonne", "Zachary", "Aaron", "Bella", "Casey", "Daniel", "Emily", "Felix", "Gina", "Hannah", "Ian", "Jasmine", "Kyle", "Lily", "Marcus", "Natalie", "Oscar", "Penny", "Riley", "Sophia", "Theo", "Vanessa", "William", "Xenia", "Yoshi", "Zoe"];

// Random event names for volunteers to attend
const eventNames = ["Food Drive","Beach Cleanup","Health Fair","Tree Planting","Habitat Restoration","Art Workshop","Tech Recycling","Community Garden","Homeless Shelter","Pet Adoption Day","Wildlife Conservation","Book Drive","Sustainable Living Workshop","Mental Health Awareness","Environmental Education","Sports Tournament","Music Festival","Cultural Exchange","STEM Camp","Farmers Market","Craft Fair"];

// Random admin names
const administrators = ["John Doe","Jane Smith","Robert Johnson","Emily Williams","Michael Brown","Jessica Davis","Richard Miller","Patricia Moore","Charles Jackson","Michelle Taylor","David Wilson","Linda Anderson","Mark Thomas","Jennifer White","Daniel Martin","Karen Lee","Matthew Green","Nancy Harris","Donald Thompson","Betty Clark","George Rodriguez"];

// Event description
const descriptions = [
    "Organize and distribute food items to those in need.",
    "Clean up local beaches to keep our environment clean.",
    "Host a health fair to educate the community about wellness.",
    "Plant trees in local parks to combat deforestation.",
    "Restore habitats damaged by natural disasters.",
    "Create art workshops to foster creativity among volunteers.",
    "Recycle old tech devices responsibly.",
    "Maintain and grow community gardens.",
    "Provide shelter and support to homeless individuals.",
    "Find loving homes for animals in shelters.",
    "Conserve wildlife populations through conservation efforts.",
    "Collect books for educational purposes.",
    "Educate the public on sustainable living practices.",
    "Raise awareness about mental health issues.",
    "Educate students about environmental science.",
    "Organize sports tournaments to promote physical activity.",
    "Celebrate music and culture through a festival.",
    "Exchange cultural experiences between different communities.",
    "Offer STEM education and hands-on projects for youth.",
    "Sell locally grown produce and crafts at a farmers market.",
    "Display and sell handmade crafts to support local artisans."
];

// Random event location
const addresses = [
    "2 N. Cross Street, Hernando, MS 38632",
    "8469 York Street, Bakersfield, CA 93306",
    "7753 Henry Smith Ave., Erlanger, KY 41018",
    "696 W. Lake View Street, Northbrook, IL 60062",
    "18 Glendale Rd., Saint Albans, NY 11412",
    "219 North Lakewood Lane, Wisconsin Rapids, WI 54494",
    "516 Newcastle Lane, Fort Lauderdale, FL 33308",
    "455 Pineknoll Ave., Far Rockaway, NY 11691",
    "8827 East Blue Spring Lane, Gallatin, TN 37066",
    "9614 N. Sycamore Dr., Oconomowoc, WI 53066",
    "7356 Glenholme Ave., Miami, FL 33125",
    "9360 Roehampton Lane, Everett, MA 02149",
    "367 Railroad St., Lumberton, NC 28358",
    "658 Pierce St., Edison, NJ 08817",
    "65 Squaw Creek St., Orlando, FL 32806",
    "137 Beechwood St., Cleveland, TN 37312",
    "8 South Nut Swamp St., El Paso, TX 79930",
    "378 Elizabeth Avenue, Hartford, CT 06106",
    "8177 W. Euclid St., Thornton, CO 80241",
    "73 South Somerset St., Brighton, MA 02135",
    "690 Trout Ave., Fleming Island, FL 32003",
    "789 Addison Rd., Melbourne, FL 32904",
    "23 E. Hilldale Ave., West Fargo, ND 58078",
    "44 S. Hillside Drive, Dearborn, MI 48124",
    "796 N. Paris Hill Dr., Dawsonville, GA 30534",
    "6 Green Lane, Montgomery Village, MD 20886",
    "69 Sherwood Ave., La Crosse, WI 54601",
    "8379 Squaw Creek Ave., Graham, NC 27253",
    "843 Lake Forest Drive, Chevy Chase, MD 20815",
    "8355 North Squaw Creek Court, Huntington, NY 11743",
    "9089 NE. Greenview Street, Allison Park, PA 15101",
    "180 Jones St., Oklahoma City, OK 73112",
    "998 Lexington St., District Heights, MD 20747",
    "425 Tanglewood Drive, Worcester, MA 01604",
    "97 Piper Lane, Elmont, NY 11003",
    "7291 Prospect Dr., North Attleboro, MA 02760",
    "98 SE. Oak Street, Reidsville, NC 27320",
    "800 Halifax Street, Fresh Meadows, NY 11365",
    "527 State St., Norman, OK 73072",
    "613 East Summit Court, Moses Lake, WA 98837"
];

const streetAddresses = [
    "2 N. Cross Street",
    "8469 York Street",
    "7753 Henry Smith Ave.",
    "696 W. Lake View Street",
    "18 Glendale Rd.",
    "219 North Lakewood Lane",
    "516 Newcastle Lane",
    "455 Pineknoll Ave.",
    "8827 East Blue Spring Lane",
    "9614 N. Sycamore Dr.",
    "7356 Glenholme Ave.",
    "9360 Roehampton Lane",
    "367 Railroad St.",
    "658 Pierce St.",
    "65 Squaw Creek St.",
    "137 Beechwood St.",
    "8 South Nut Swamp St.",
    "378 Elizabeth Avenue",
    "8177 W. Euclid St.",
    "73 South Somerset St.",
    "690 Trout Ave.",
    "789 Addison Rd.",
    "23 E. Hilldale Ave.",
    "44 S. Hillside Drive",
    "796 N. Paris Hill Dr.",
    "6 Green Lane",
    "69 Sherwood Ave.",
    "8379 Squaw Creek Ave.",
    "843 Lake Forest Drive",
    "8355 North Squaw Creek Court",
    "9089 NE. Greenview Street",
    "180 Jones St.",
    "998 Lexington St.",
    "425 Tanglewood Drive",
    "97 Piper Lane",
    "7291 Prospect Dr.",
    "98 SE. Oak Street",
    "800 Halifax Street",
    "527 State St.",
    "613 East Summit Court"
];

const cities = [
    "Hernando",
    "Bakersfield",
    "Erlanger",
    "Northbrook",
    "Saint Albans",
    "Wisconsin Rapids",
    "Fort Lauderdale",
    "Far Rockaway",
    "Gallatin",
    "Oconomowoc",
    "Miami",
    "Everett",
    "Lumberton",
    "Edison",
    "Orlando",
    "Cleveland",
    "El Paso",
    "Hartford",
    "Thornton",
    "Brighton",
    "Fleming Island",
    "Melbourne",
    "West Fargo",
    "Dearborn",
    "Dawsonville",
    "Montgomery Village",
    "La Crosse",
    "Graham",
    "Chevy Chase",
    "Huntington",
    "Allison Park",
    "Oklahoma City",
    "District Heights",
    "Worcester",
    "Elmont",
    "North Attleboro",
    "Reidsville",
    "Fresh Meadows",
    "Norman",
    "Moses Lake"
];

const zipCodes = [
    "38632",
    "93306",
    "41018",
    "60062",
    "11412",
    "54494",
    "33308",
    "11691",
    "37066",
    "53066",
    "33125",
    "02149",
    "28358",
    "08817",
    "32806",
    "37312",
    "79930",
    "06106",
    "80241",
    "02135",
    "32003",
    "32904",
    "58078",
    "48124",
    "30534",
    "20886",
    "54601",
    "27253",
    "20815",
    "11743",
    "15101",
    "73112",
    "20747",
    "01604",
    "11003",
    "02760",
    "27320",
    "11365",
    "73072",
    "98837"
];

// Random dates from 2024-2027
const dates = ["02/05/2024","03/20/2024","04/10/2024","05/25/2024","06/15/2024","07/30/2024","08/20/2024","09/05/2024","10/20/2024","11/15/2024","12/30/2024","01/25/2025","02/15/2025","03/30/2025","04/20/2025","05/25/2025","06/15/2025","07/30/2025","08/20/2025","09/05/2025","10/20/2025"];

// Random starttimes
const times = ["6:00 AM","6:15 AM","6:45 AM","7:00 AM","7:30 AM","7:45 AM","8:00 AM","8:15 AM","9:00 AM","9:15 AM","9:30 AM","9:45 AM","10:00 AM","10:15 AM","10:30 AM","11:00 AM","11:15 AM","11:30 AM","11:45 AM","12:00 PM","12:30 PM","12:45 PM","1:00 PM","1:15 PM","1:30 PM","1:45 PM","2:00 PM","2:15 PM","2:30 PM","3:00 PM","3:15 PM","3:30 PM","3:45 PM","4:00 PM","4:15 PM","4:30 PM","4:45 PM","5:00 PM","5:15 PM","5:30 PM","5:45 PM","6:15 PM","6:30 PM","7:00 PM"];

// Random duration
const maxHours = 6;
const intervalsPerHour = 4;
const totalIntervals = maxHours * intervalsPerHour;
const durationOptions = [...Array(totalIntervals).keys()].map((_, index) => {
    let minutes = (index % intervalsPerHour + 1) * 15;
    let hours = Math.floor(index / intervalsPerHour);
    
    if (minutes % 60 === 0) {
        minutes = 0;
        hours += 1;
    }
    const formattedTime = `${hours}h ${minutes}m`;
    return { formattedTime };
}).map(obj => obj.formattedTime);

// Random skills
skillsData;

const urgencyLevels = ["Low", "Medium", "High", "Critical"];
const participated = ["Yes", "No"];

// Generates participation with random data
function generateParticipation(firstNames, eventNames, administrators, descriptions, addresses, dates, times, durationOptions, skillsData, urgencyLevels, participated) {
    let participation = [];
    for (let i = 0; i < eventNames.length; i++) {
        let event = {
            id: i + 1,
            volunteer: firstNames[Math.floor(Math.random() * firstNames.length)],
            name: eventNames[i],
            administrator: administrators[i],
            description: descriptions[i],
            address: addresses[Math.floor(Math.random() * addresses.length)],
            date: dates[i],
            time: times[Math.floor(Math.random() * times.length)],
            duration: durationOptions[Math.floor(Math.random() * durationOptions.length)],
            skills: "",
            urgency: urgencyLevels[Math.floor(Math.random() * urgencyLevels.length)],
            participated: participated[Math.floor(Math.random() * participated.length)]
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
        participation.push(event);
    }
    return participation;
}

// Generates participation with random data
function generateEvents(eventNames, administrators, descriptions, streetAddresses, cities, zipCodes, dates, times, durationOptions, skillsData, urgencyLevels) {
    let events = [];
    for (let i = 0; i < eventNames.length; i++) {
        let event = {
            id: i + 1,
            name: eventNames[i],
            administrator: administrators[i],
            description: descriptions[i],
            address: streetAddresses[i],
            city: cities[i],
            state: stateData[i + 1],
            zip: zipCodes[i],
            date: dates[i],
            time: times[Math.floor(Math.random() * times.length)],
            duration: durationOptions[Math.floor(Math.random() * durationOptions.length)],
            skills: "",
            urgency: urgencyLevels[Math.floor(Math.random() * urgencyLevels.length)],
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

export const volunteerHistoryData = generateParticipation(firstNames, eventNames, administrators, descriptions, addresses, dates, times, durationOptions, skillsData, urgencyLevels, participated);
export const eventData = generateEvents(eventNames, administrators, descriptions, streetAddresses, cities, zipCodes, dates, times, durationOptions, skillsData, urgencyLevels);