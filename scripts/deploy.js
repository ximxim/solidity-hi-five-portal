const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log('Deploying contracts with account: ', deployer.address);
  console.log('Account balance: ', accountBalance.toString());

  const Token = await hre.ethers.getContractFactory('HiFivePortal');
  const portal = await Token.deploy({
    value: hre.ethers.utils.parseEther('0.0002'),
  });

  await portal.deployed();

  console.log('HiFive address: ', portal.address);

  let contractBalance = await hre.ethers.provider.getBalance(portal.address);
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  );
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();