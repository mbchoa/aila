function projectChanged(currentProject, fromHash, toHash) {
  const execSync = require('child_process').execSync;
  const getAffected = `npm run --silent nx print-affected --base=${fromHash} --head=${toHash}`;
  const output = execSync(getAffected).toString();

  // get list of changed projects from the output
  const changedProjects = JSON.parse(output).projects;
  return !!changedProjects.find(project => project === currentProject)
}

module.exports = {
  onPreBuild: ({ utils }) => {
    const currentProject = process.env.PROJECT_NAME;
    console.log(`Checking if project: "${currentProject}" has changed.`)

    const lastDeployedCommit = process.env.CACHED_COMMIT_REF;
    const latestCommit = 'HEAD';
    const hasProjectChanged = projectChanged(
      currentProject,
      lastDeployedCommit,
      latestCommit
    );
    if (!hasProjectChanged) {
      utils.build.cancelBuild(
        `Build was cancelled because ${currentProject} was not affected by the latest changes.`
      );
    }
  },
};
