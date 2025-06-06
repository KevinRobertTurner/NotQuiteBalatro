# Not Quite Balatro
A tool for drawing cards via a web API, evaluating winners and losers, and demonstrating coding acumen.

# Setup
This project was implemented using React, C#, and ASP NET 9. It was built with Visual Studio 2022, and opening the .sln file should allow for the project to run with minimal effort.

If not using Visual Studio 2022, the project has two subdivisions, the server and the client, which will need to be run separately.

**Git, Node, and .NET 9.0 are required.** Clone the repository to your local machine, then follow these steps:

## Server Setup
Using Git Bash:
- Navigate to the **NotQuiteBalatro.Server** directory.
- Run `dotnet build`
- Run `dotnet run --launch-profile https`
- The server should now be running on port 7142 for https, and port 5720 for http.

## Client Setup
In a separate Git Bash window:
- Navigate to the **notQuiteBalatro.client** directory.
- Run `npm install`
- Run `npm run dev`
- The client should now be accessible via `https://localhost:58917`

# Playing the Game
Simply enter the names of you and a close associate or arch-nemesis, hit the Draw New Hands button, and revel in victory (or wallow in defeat)!

Hands are automatically compared first by poker rank, with ties broken by which hand has cards of higher value. Unbreakable ties aren't impossible, but are exceedingly rare.