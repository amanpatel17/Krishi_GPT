const inputField = document.getElementById("user-input");
const sendButton = document.getElementById("send-button1");
const messageContainer = document.querySelector("message-container");


var firebaseConfig = {
  apiKey: "AIzaSyCtJf_3Hi-sEx6PZRKCETvhVmJ4fhLXmq0",
  authDomain: "esp8266-d162f.firebaseapp.com",
  databaseURL: "https://esp8266-d162f-default-rtdb.firebaseio.com",
  projectId: "esp8266-d162f",
  storageBucket: "esp8266-d162f.appspot.com",
  messagingSenderId: "690943835271",
  appId: "1:690943835271:web:59eac080b50e17e21bcc22"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to Firebase Realtime Database
var database = firebase.database();

// Function to get and display data from Firebase
function getData() {
// Reference paths in Firebase
var temperatureRef = database.ref('sensor/dht11/temperature');
var humidityRef = database.ref('sensor/dht11/humidity');
var soilMoistureRef = database.ref('sensor/soilMoisture/percentage');

// Fetch temperature data
temperatureRef.on('value', (snapshot) => {
  const temp = snapshot.val();
  document.getElementById('temperature').innerText = temp;
});

// Fetch humidity data
humidityRef.on('value', (snapshot) => {
  const humidity = snapshot.val();
  document.getElementById('humidity').innerText = humidity;
 
});


// Fetch soil moisture data
soilMoistureRef.on('value', (snapshot) => {
  const soilMoisture = snapshot.val();
  document.getElementById('soilMoisture').innerText = soilMoisture;
 
});
}

// Call the function to get data from Firebase
getData();





const sendButtonClickHandler = () => {
  const apiUrl = API_URL;
  const apiKey = API_KEY; // Replace with your actual API key
  const messageContainer = document.getElementById("message-container");

  // Add user's message to the container
  const userMessage = document.createElement("div");
  userMessage.classList.add("message", "user-message");
  userMessage.textContent = inputField.value;
  messageContainer.appendChild(userMessage);

  // loader
  const assistantMessage = document.createElement("div");
  assistantMessage.classList.add("message", "assistant-message");
  assistantMessage.textContent =
    "It might take several seconds, please wait🤔...";
  messageContainer.appendChild(assistantMessage);

  messageContainer.scrollTo({
    top: messageContainer.scrollHeight,
    behavior: "smooth",
  });

  const data = {
    prompt: inputField.value,
  };

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "API-KEY": apiKey, // Add your API key here
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      // Add assistant's response to the container
      assistantMessage.textContent = data.response || "No response"; // Adjust according to the API response structure
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      assistantMessage.textContent = "Error: Unable to fetch response";
    });

  // Clear the input field
  inputField.value = "";
};

sendButton.addEventListener("click", () => {
  if (inputField.value == "") alert("Message cant be empty !");
  else sendButtonClickHandler();
});

inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent the default form submission
    sendButton.click();
  }
});

const suggestionItems = document.querySelectorAll(".suggestion-item");

suggestionItems.forEach((item) => {
  item.addEventListener("click", () => {
    const pTag = item.querySelector("p");
    if (pTag) {
      console.log(`You clicked on: ${pTag.textContent}`);
      // Add your desired functionality here

      inputField.value = pTag.textContent;
      sendButton.click();
    }
  });
});

const handleDOMChanges = (mutationsList) => {
  for (const mutation of mutationsList) {
    // Check if a new node is added
    if (mutation.type === "childList") {
      const addedNodes = Array.from(mutation.addedNodes);

      // Check if any added node has the class 'message'
      const hasMessage = addedNodes.some(
        (node) =>
          node.nodeType === Node.ELEMENT_NODE &&
          node.classList.contains("message")
      );

      if (hasMessage) {
        // Hide the 'suggestion-grid' div
        document.getElementById("suggestion-grid").style.display = "none";
      }
    }
  }
};

// Set up the MutationObserver
const observer = new MutationObserver(handleDOMChanges);

// Start observing the document body for child node additions
observer.observe(document.body, { childList: true, subtree: true });

const toggleButton = document.getElementById("sidebar-toggle");
const sidebar = document.getElementsByClassName("sidebar");

toggleButton.addEventListener("click", function (e) {

  if (sidebar[0].classList.contains("sidebar-hidden")) {
    sidebar[0].classList.remove("sidebar-hidden");
    sidebar[0].classList.add("sidebar-visible");
  } else {
    sidebar[0].classList.remove("sidebar-visible");
    sidebar[0].classList.add("sidebar-hidden");
  }
});
