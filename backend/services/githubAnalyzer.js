const axios = require("axios");

exports.analyzeGithubProfile = async (username) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );

    const repos = response.data;

    if (!Array.isArray(repos)) {
      return { verifiedSkills: [], githubScore: 0 };
    }

    let languageMap = {};
    let totalStars = 0;

    repos.forEach(repo => {
      if (repo.language) {
        languageMap[repo.language] =
          (languageMap[repo.language] || 0) + 1;
      }

      totalStars += repo.stargazers_count || 0;
    });

    const totalRepos = repos.length || 1;

    const verifiedSkills = Object.keys(languageMap).map(lang => ({
      name: lang,
      repoCount: languageMap[lang],
      confidenceScore: Math.round(
        (languageMap[lang] / totalRepos) * 100
      )
    }));

    const githubScore =
      (totalRepos * 5) +
      (totalStars * 3);

    return { verifiedSkills, githubScore };

  } catch (error) {
    console.log("GitHub Analysis Error:", error.message);
    return { verifiedSkills: [], githubScore: 0 };
  }
};
