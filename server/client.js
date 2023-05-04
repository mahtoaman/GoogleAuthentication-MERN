const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const id_token = document.querySelector("#id_token").value;

  try {
    const response = await fetch("/authenticate/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_token }),
    });

    const data = await response.json();

    localStorage.setItem("token", data.token);

    alert("Login successful!");
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});
