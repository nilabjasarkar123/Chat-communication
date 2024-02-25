# RotTom CLI

RotTom CLI is a command-line tool that fetches and displays movie information from Rotten Tomatoes RSS feeds based on user-specified genres and rating thresholds.

## Features

- Fetches movie data from Rotten Tomatoes RSS feeds.
- Filters movies by genre and rating threshold.
- Displays movie name, genre, and rating.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/rottom-cli.git


- npm install
- node index.js [options]

# Display comedy movies with a rating above 7.5
node index.js --genre comedy --rating 7.5

# Display action movies with a rating above 6.0
node index.js --genre action
