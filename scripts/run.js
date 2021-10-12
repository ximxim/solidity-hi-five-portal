const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const hiFiveContractFactory = await hre.ethers.getContractFactory('HiFivePortal');
  const hiFiveContract = await hiFiveContractFactory.deploy();
  await hiFiveContract.deployed();

  console.log("Contract deployed to:", hiFiveContract.address);
  console.log("Contract deployed by:", owner.address);

  let hiFiveCount;
  hiFiveCount = await hiFiveContract.getTotalHiFives();
  console.log(hiFiveCount.toNumber());

  let hiFiveTxn = await hiFiveContract.hiFive('Some Message!');
  await hiFiveTxn.wait();

  hiFiveCount = await hiFiveContract.getTotalHiFives();
  console.log(hiFiveCount.toNumber());

  hiFiveTxn = await hiFiveContract.connect(randomPerson).hiFive('Another person messaged');
  await hiFiveTxn.wait();

  hiFiveCount = await hiFiveContract.getTotalHiFives();
  console.log(hiFiveCount.toNumber());

  let allHighFives = await hiFiveContract.getAllHiFives();
  console.log(allHighFives)
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