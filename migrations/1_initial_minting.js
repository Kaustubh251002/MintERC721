const minting = artifacts.require("minting");

module.exports = function (deployer) {
  deployer.deploy(minting);
};
