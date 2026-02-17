const axios = require("axios");

exports.calculateGithubScore = async (username) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );

    const repos = response.data;

    let totalStars = 0;
    let totalForks = 0;
    let totalRepos = repos.length;

    repos.forEach(repo => {
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;
    });

    const score =
      (totalRepos * 5) +
      (totalStars * 3) +
      (totalForks * 2);

    return score;

  } catch (error) {
    console.log("GitHub API Error:", error.message);
    return 0;
  }
};
