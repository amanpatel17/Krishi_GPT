const inputField = document.getElementById("user-input");
const sendButton = document.getElementById("send-button1");
const messageContainer = document.querySelector("message-container");

const sendButtonClickHandler = () => {
  const apiUrl = process.env.API_URL;
  const apiKey = process.env.API_KEY; // Replace with your actual API key
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
    question: inputField.value,
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
