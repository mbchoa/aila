function projectChanged(fromHash, toHash) {
  const execSync = require('child_process').execSync;
  const getAffected = `npx nx print-affected --base=${fromHash} --head=${toHash}`;
  const output = execSync(getAffected).toString();

  // get list of changed projects from the output
  const changedProjects = JSON.parse(output).projects;
  return changedProjects.length > 0;
}

module.exports = {
  onPreBuild: ({ utils }) => {
    console.log(`Checking if any projects have changed.`)

    const lastDeployedCommit = process.env.CACHED_COMMIT_REF;
    const latestCommit = 'HEAD';
    const hasProjectChanged = projectChanged(
      lastDeployedCommit,
      latestCommit
    );
    if (!hasProjectChanged) {
      utils.build.cancelBuild(
        `Build was cancelled because there were no changes.`
      );
    }
  },
};
