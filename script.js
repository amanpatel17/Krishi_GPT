// document.getElementById("send-button1").addEventListener("click", () => {
//   // Replace the URL with the API endpoint you want to call
//   const apiUrl = "https://api.ouranosrobotics.com/chatbot";
//   //   const apiUrl = "http://localhost:3000/items";

//   // Replace this with the actual data you want to send
//   const inputField = document.getElementById("user-input");
//   const data = {
//     question: inputField.value,
//   };

//   fetch(apiUrl, {
//     method: "POST", // or 'PUT'
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok " + response.statusText);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       // Handle the data from the API
//       console.log(data);
//       document.getElementById("result").textContent = JSON.stringify(
//         data,
//         null,
//         2
//       );
//     })
//     .catch((error) => {
//       console.error(
//         "There has been a problem with your fetch operation:",
//         error
//       );
//       document.getElementById("result").textContent = "Error: " + error.message;
//     });
// });

document.getElementById("send-button1").addEventListener("click", () => {
  const apiUrl = "https://api.ouranosrobotics.com/chatbot";
  const inputField = document.getElementById("user-input");
  const messageContainer = document.getElementById("message-container");

  // Add user's message to the container
  const userMessage = document.createElement("div");
  userMessage.classList.add("message", "user-message");
  userMessage.textContent = inputField.value;
  messageContainer.appendChild(userMessage);

  const data = {
    question: inputField.value,
  };

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
      const assistantMessage = document.createElement("div");
      assistantMessage.classList.add("message", "assistant-message");
      assistantMessage.textContent = data.response || "No response"; // Adjust according to the API response structure
      messageContainer.appendChild(assistantMessage);
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });

  // Clear the input field
  inputField.value = "";
});
