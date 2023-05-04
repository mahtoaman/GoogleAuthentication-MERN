import { useState } from "react";

export function GoogleLogin() {
  const [nonce] = useState(Math.floor(Math.random() * 1000000).toString());
  const clientId =
    "660955913337-858pfsm37ohl8ude2c6vphau4kb4hn76.apps.googleusercontent.com";
  const redirectUri = "http://localhost:5000";
  const responseType = "id_token";
  const scope = "profile email";

  function handleGoogleLoginClick() {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&nonce=${nonce}`;
    console.log(url);
    const width = 500;
    const height = 600;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    window.open(
      url,
      "Google Login",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    window.addEventListener("message", async (event) => {
      if (
        event.origin === window.location.origin &&
        event.data.type === "id_token"
      ) {
        const id_token = event.data.id_token;

        try {
          const response = await fetch("/authenticate-google-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_token }),
          });

          const data = await response.json();
          console.log(data); // Handle the response from the server
        } catch (error) {
          console.error(error);
        }
      }
    });
  }

  return (
    <div>
      <h1>Google Login</h1>
      <button onClick={handleGoogleLoginClick}>Login with Google</button>
    </div>
  );
}
