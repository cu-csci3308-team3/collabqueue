# collabqueue

A democratic music queue. Allows event attendees to vote on the next song to play.
Music is provided by the YouTube API.
Built with
[nodejs](https://nodejs.org/en/),
[express](https://expressjs.com/),
[postgres](https://www.postgresql.org/), and
[preact](https://preactjs.com/).

## Installation

```bash
brew install postgres nodejs
git clone git@github.com:cu-csci3308-team3/collabqueue.git
cd collabqueue
npm install
psql < InitializeDatabase.sql
node server.js
```