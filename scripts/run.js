const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const hiFiveContractFactory = await hre.ethers.getContractFactory('HiFivePortal');
  const hiFiveContract = await hiFiveContractFactory.deploy();
  await hiFiveContract.deployed();

  console.log("Contract deployed to:", hiFiveContract.address);
  console.log("Contract deployed by:", owner.address);

  let hiFiveCount;
  hiFiveCount = await hiFiveContract.getTotalHiFives();

  let hiFiveTxn = await hiFiveContract.hiFive();
  await hiFiveTxn.wait();

  hiFiveCount = await hiFiveContract.getTotalHiFives();

  hiFiveTxn = await hiFiveContract.connect(randomPerson).hiFive();
  await hiFiveTxn.wait();

  hiFiveCount = await hiFiveContract.getTotalHiFives();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();