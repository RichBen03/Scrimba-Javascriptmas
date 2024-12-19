const calendarContainer = document.getElementById("calendar");

// Create an array to track the state of each day (closed by default)
const days = Array.from({ length: 24 }, (_, index) => ({
  number: index + 1,
  opened: false,
}));

// Create the popup element
const popup = document.createElement("div");
popup.classList.add("popup");
popup.innerHTML = `
  <span class="close">&times;</span>
  <div class="popup-content"></div>
`;
document.body.appendChild(popup);

// Close the popup when the "close" button is clicked
popup.querySelector(".close").addEventListener("click", () => {
  popup.style.display = "none";
});

// Render the calendar days
days.forEach((day) => {
  // Create the calendar box
  const box = document.createElement("li");
  box.classList.add("calendar-box");
  box.tabIndex = 0; // Make it focusable for accessibility

  
  const number = document.createElement("p");
  number.textContent = day.number;

  const description = document.createElement("p");
  description.textContent = "Click to open";

  box.appendChild(number);
  box.appendChild(description);

  box.addEventListener("click", (event) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    const popupContent = popup.querySelector(".popup-content");
    popupContent.innerHTML = `
      <p><strong>Day ${day.number}</strong></p>
      <p>${formattedDate}</p>
      <p>${formattedTime}</p>
    `;

    const rect = box.getBoundingClientRect();
    popup.style.left = `${rect.left + window.scrollX + rect.width / 2 - 75}px`;
    popup.style.top = `${rect.top + window.scrollY - 80}px`;

    popup.style.display = "block";
  });

  calendarContainer.appendChild(box);
});
