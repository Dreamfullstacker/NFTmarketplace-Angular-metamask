import Web3 from 'web3';
import contractAbi from '../config/abi.json'
import { toast } from 'react-toastify';

let Contract = require("web3-eth-contract");
Contract.setProvider("https://data-seed-prebsc-1-s1.binance.org:8545")

export const connectToWallet = async () => {//connect the metamask using web3 and get current user account
    let web3;
    try {
        if (window.ethereum) {
            web3 = new Web3(window.ethereum)
            await window.ethereum.request({ method: 'eth_requestAccounts' })
        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider || "https://data-seed-prebsc-1-s1.binance.org:8545")
        }
        const accounts = await web3.eth.getAccounts();
        return accounts[0]
    } catch (error) {
        // console.log("Error: ", error)
        return false
    }
}

export const getWeb3 = async () => {//first connect the EVM and return web3 instance. always use!
    let web3;
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
    } else if (window.web3) {
        await window.web3.currentProvider.enable();
        web3 = new Web3(window.web3.currentProvider);
    } else {
        // toast.error('No web3 instance detected.');
        return false;
    }
    return web3;
}

export const getTotalStaked = async () => {
    const web3 = await getWeb3();
    if (!web3) {
        // toast.error("No web3 instance found.");
        return false;
    }
    try {
        let bnbDayContract = new Contract(contractAbi, process.env.REACT_APP_CONTRACT_ADDRESS );//create instance of contract with abi and address
        console.log(bnbDayContract)
        const res = await bnbDayContract.methods.totalStaked().call()//get total staked money value
        let stakedValue = web3.utils.fromWei(res)
        return stakedValue 
       
    } catch (e) {
        return false;
    }
}

export const getUTotalStaked = async () => {//get user's total staked money
    const web3 = await getWeb3();
    if (!web3) {
        toast.error("No web3 instance found.");
        return false;
    }
    try {
        let connectedAddress = await connectToWallet();//get current user's account address
        let bnbDayContract = new Contract(contractAbi, process.env.REACT_APP_CONTRACT_ADDRESS );//contract address
        const res = await bnbDayContract.methods.getUserTotalDeposits(connectedAddress).call()
        let stakedValue = web3.utils.fromWei(res)
        return stakedValue 
       
    } catch (e) {
        return false;
    }
}

export const getTotalWithdrawal = async () => {//get total withdrawal money that user can earn
    const web3 = await getWeb3();
    if (!web3) {
        toast.error("No web3 instance found.");
        return false;
    }
    try {
        let connectedAddress = await connectToWallet();
        let bnbDayContract = new Contract(contractAbi, process.env.REACT_APP_CONTRACT_ADDRESS );
        const referralBonus = await bnbDayContract.methods.getUserReferralBonus(connectedAddress).call()
        const dividends = await bnbDayContract.methods.getUserDividends(connectedAddress).call()

        let value = referralBonus + dividends//the total withdrawal value
        let res = web3.utils.fromWei(value)
        return res 
       
    } catch (e) {
        return false;
    }
}


export const getPlanInfoFn = async (id) => {//get Plan data from smart contract follow plan type(0,1,2)
    const web3 = await getWeb3();
    if (!web3) {
        // toast.error("No web3 instance found.");
        return false;
    }
    try {
        let bnbDayContract = new Contract(contractAbi, process.env.REACT_APP_CONTRACT_ADDRESS );
        const res = await bnbDayContract.methods.getPlanInfo(id).call()//get each plan's time and percent
        let percent = await bnbDayContract.methods.getPercent(id).call()//get each plan's recounted percent by user's rewardth time
        percent = percent / 10
        res["percent"] = percent//add percent item to res obj
        return res 
       
    } catch (e) {
        return false;
    }
}

export const stakeBnb = async (amount, planId) => {//stake amount of BNB to the planId's plan
    const web3 = await getWeb3();
    if (!web3) {
        toast.error("No web3 instance found.");
        return false;
    }
    try {
        let connectedAddress = await connectToWallet();
        let bnbDayContract = new Contract(contractAbi, process.env.REACT_APP_CONTRACT_ADDRESS );
        const txCount = await web3.eth.getTransactionCount(connectedAddress);
        let referrer = process.env.REACT_APP_WEB3_TERRIORY_WALLET
        console.log(referrer);
        const myNewData = await bnbDayContract.methods.invest(referrer, planId).encodeABI()
        // const gasLimit = await web3.eth.estimateGas({
        //     from: connectedAddress,
        //     nonce: txCount,
        //     to: process.env.REACT_APP_CONTRACT_ADDRESS,
        //     data: myNewData
        // })
        let weiPrice = web3.utils.toWei(`${amount}`, 'ether');
        const gas2 = await web3.eth.getGasPrice()
        const transactionParameters = {
            nonce: web3.utils.toHex(txCount),
            gasPrice: web3.utils.toHex(gas2),
            // gasLimit: web3.utils.toHex(gasLimit),
            to: process.env.REACT_APP_CONTRACT_ADDRESS ,
            from: connectedAddress,
            data: myNewData,
            value: web3.utils.toHex(weiPrice)
        }

        // As with any RPC call, it may throw an error
        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });
        
        if (txHash) {
            toast.success("Transaction Done Successfully.");
        }
    } catch (e) {
        toast.error(e.message);
        return false;
    }
}

export const WithdrawFn = async () => {
    const web3 = await getWeb3();
    if (!web3) {
        toast.error("No web3 instance found.");
        return false;
    }
    try {
        let connectedAddress = await connectToWallet();
        let bnbDayContract = new Contract(contractAbi, process.env.REACT_APP_CONTRACT_ADDRESS );
        const txCount = await web3.eth.getTransactionCount(connectedAddress);//get total trasaction count sent by current address
        const myNewData = await bnbDayContract.methods.withdraw().encodeABI()
        // const gasLimit = await web3.eth.estimateGas({
        //     from: connectedAddress,
        //     nonce: txCount,
        //     to: bnbDayContract,
        //     data: myNewData
        // })
        const gas2 = await web3.eth.getGasPrice()
        const transactionParameters = {
            nonce: web3.utils.toHex(txCount),
            gasPrice: web3.utils.toHex(gas2),
            // gasLimit: web3.utils.toHex(gasLimit),
            to: process.env.REACT_APP_CONTRACT_ADDRESS,
            from: connectedAddress,
            data: myNewData,
        }

        // As with any RPC call, it may throw an error
        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });
        if (txHash) {
            toast.success("Transaction Done Successfully.");
            return
        }
    } catch (e) {
        toast.error(e.message);
        return false;
    }
}