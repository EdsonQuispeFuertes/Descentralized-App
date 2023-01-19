const Migrations = artifacts.require("Migrations");
const Taxi = artifacts.require("Taxi");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Taxi);
};
