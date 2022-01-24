// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.6;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BaseStaking is Pausable, Ownable {

   /* ========== STATE VARIABLES ========== */
    IERC20 public stakingToken;
    struct walletDetails {
        uint256 stakedAmount;
        uint256 stakingTimestamp; 
        uint256 unstakingTimestamp;
    }
    mapping(address => walletDetails) public wallets;
    mapping(address => uint256) public balances;

   /* ========== CONSTRUCTOR ========== */

    constructor(
        address _stakingToken
    )    {
        stakingToken = IERC20(_stakingToken);
    }

    /* ========== MUTATIVE FUNCTIONS ========== */

    function stake(uint256 _amount) external whenNotPaused {
        require(_amount >= 10 ether && _amount <= 1000000 ether, "Amount not valid");
        balances[msg.sender] += _amount;
        stakingToken.transferFrom(msg.sender, address(this), _amount);
        wallets[msg.sender].stakedAmount += _amount;
        wallets[msg.sender].stakingTimestamp = block.timestamp;
        emit Staked(msg.sender, _amount);
    }

    function unStake(uint256 _amount) public whenNotPaused {
        require(_amount > 0, "cannot withdraw 0");
        require(_amount <= balances[msg.sender], "Amount too high");
        balances[msg.sender] -= _amount;
        stakingToken.transfer(msg.sender, _amount);
        wallets[msg.sender].stakedAmount -= _amount;
        wallets[msg.sender].unstakingTimestamp = block.timestamp;
        emit unStaked(msg.sender, _amount);
    }

    function pause()  public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner   {
        _unpause();
    }
    
    /* ========== EVENTS ========== */

    // Staked
    event Staked(address indexed wallet, uint256 amount);

    // unStaked
    event unStaked(address indexed wallet, uint256 amount);


}