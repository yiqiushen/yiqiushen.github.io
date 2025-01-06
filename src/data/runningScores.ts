interface RunningScore {
  event: string;
  time: string;
  date: string;
  location: string;
  geoJsonPath?: string;
}

export const bestScores: RunningScore[] = [
  {
    event: "Marathon",
    time: "5:41:46",
    date: "2024-10-06",
    location: "Long Beach Marathon",
    geoJsonPath: "/routes/2024-10-06-060140.json"
  },
  {
    event: "Half Marathon",
    time: "2:38:28",
    date: "2024-01-21",
    location: "Rose Bowl Half Marathon",
    geoJsonPath: "/routes/2024-01-21-071259.json"
  },
  {
    event: "10K",
    time: "1:06:08",
    date: "2024-02-25",
    location: "L.A. Chinatown Firecracker 10K",
    geoJsonPath: "/routes/2024-02-25-084247.json"
  },
  {
    event: "5K",
    time: "30:13",
    date: "2024-09-08",
    location: "Santa Monica Classic",
    geoJsonPath: "/routes/2024-09-08-070337.json"
  }
];
