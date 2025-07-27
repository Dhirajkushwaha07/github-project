const avatar = document.getElementById("avatar");
const username = document.getElementById("username");
const repos = document.getElementById("repos");
const following = document.getElementById("following");
const follower = document.getElementById("followers");
const place = document.getElementById("location");
const office = document.getElementById("office");
const twitter = document.getElementById("x");
const join = document.getElementById("join");

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();  // Prevents the page from refreshing when the form is submitted.

  const formData = new FormData(form);  // Collects the data entered in the form.
  const name = formData.get("username");  // Extracts the entered GitHub username.

  const url = `https://api.github.com/users/${name}`;  // Creates the URL to get the user's data from GitHub API.

  fetch(url)  // Fetches data from GitHub API using the URL.
    .then((res) => {
      if (!res.ok) {  // If the response is not successful (user not found)
        alert("User not found");
      }
      return res.json();  // If successful, convert the response to JSON format.
    })
    .then((data) => {
      // Once we have the data, we can update the HTML elements with the user's info.
      console.log(data);  // Logs the fetched data for debugging.

      join.textContent = `Join at ${data.created_at}`;  // Displays the date the user joined GitHub.
      avatar.src = `${data?.avatar_url}`;  // Sets the user's avatar.
      username.textContent = data?.login;  // Displays the user's login name (username).
      repos.textContent = data?.public_repos;  // Displays the number of public repositories.
      following.textContent = data?.following;  // Displays the number of users they follow.
      follower.textContent = data?.followers;  // Displays the number of followers they have.
      place.textContent = data.location ? data.location : "Not available";  // Displays the user's location, or 'Not available' if not provided.
      office.textContent = data.company ? data.company : "Not available";  // Displays the user's company, or 'Not available' if not provided.
      twitter.textContent = data.twitter_username ? data.twitter_username : "Not available";  // Displays the user's Twitter username, or 'Not available'.
    })
    .catch((err) => {
      alert(err);  // If there's an error, show an alert with the error message.
    });
});
