const mongoose = require("mongoose");
const User = require("./models/User");
const { calculateGithubScore } = require("./services/githubService");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"));

const seedUsers = async () => {
  await User.deleteMany();

  const demoUsers = [
    {
      name: "Frontend Pro",
      email: "frontend@test.com",
      githubUsername: "vaish12345678", // replace later
      skills: [
        { name: "React", level: 8 },
        { name: "Tailwind", level: 7 },
        { name: "Animation", level: 6 }
      ]
    },
    {
      name: "Backend Master",
      email: "backend@test.com",
      githubUsername: "vaishnavi4049", // replace later
      skills: [
        { name: "Node", level: 9 },
        { name: "MongoDB", level: 8 },
        { name: "Express", level: 8 }
      ]
    },
    // {
    //   name: "Fullstack Dev",
    //   email: "full@test.com",
    //   githubUsername: "gaearon", // replace later
    //   skills: [
    //     { name: "React", level: 9 },
    //     { name: "Node", level: 7 },
    //     { name: "MongoDB", level: 7 }
    //   ]
    // }
  ];

  for (let userData of demoUsers) {
    const githubScore = await calculateGithubScore(userData.githubUsername);

    const user = new User({
      ...userData,
      githubScore
    });

    await user.save();
  }

  console.log("Demo Users Seeded");
  process.exit();
};

seedUsers();
