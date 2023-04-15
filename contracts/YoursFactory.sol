// SPDX-License-Identifier: MIT
/*
 _______   __                      __              __       __
/       \ /  |                    /  |            /  |  _  /  |
$$$$$$$  |$$ |  ______    _______ $$ |   __       $$ | / \ $$ |  ______   __     __  ______
$$ |__$$ |$$ | /      \  /       |$$ |  /  |      $$ |/$  \$$ | /      \ /  \   /  |/      \
$$    $$< $$ |/$$$$$$  |/$$$$$$$/ $$ |_/$$/       $$ /$$$  $$ | $$$$$$  |$$  \ /$$//$$$$$$  |
$$$$$$$  |$$ |$$ |  $$ |$$ |      $$   $$<        $$ $$/$$ $$ | /    $$ | $$  /$$/ $$    $$ |
$$ |__$$ |$$ |$$ \__$$ |$$ \_____ $$$$$$  \       $$$$/  $$$$ |/$$$$$$$ |  $$ $$/  $$$$$$$$/
$$    $$/ $$ |$$    $$/ $$       |$$ | $$  |      $$$/    $$$ |$$    $$ |   $$$/   $$       |
$$$$$$$/  $$/  $$$$$$/   $$$$$$$/ $$/   $$/       $$/      $$/  $$$$$$$/     $/     $$$$$$$/
*/
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/proxy/Clones.sol";
import "./YoursBenefitNFT.sol";

interface BenefitNFTRouter {
    function initialize(
        address _owner,
        string memory _name,
        string memory _symbol,
        string memory _uri,
        string memory _benefitURI,
        uint128[] memory _defaultBenefit
    ) external;

    function setLock(uint256[] memory _ids, uint8 _lock) external;
}

contract YoursFactory {
    event DeployNFT(address _newClone, address _owner);
    event test(address nftAddress, uint256 id);

    struct NFTInfo {
        address creator;
        address nftAddress;
    }

    address public owner;

    function isOwner() private view {
        require(owner == msg.sender, "Not Owner");
    }

    address public baseContract;
    uint8 private paused; // 0 == ing, 1 == paused

    uint256 private _id;
    mapping(uint256 => NFTInfo) public nfts;

    constructor(address _base) {
        owner = msg.sender;
        baseContract = _base;
        _id = 0;
    }

    function deployNFT(
        string memory _name,
        string memory _symbol,
        string memory _uri,
        string memory _benefitURI,
        uint128[] memory _defaultBenefit
    ) external {
        require(paused == 0, "Contract is paused");
        address identicalChild = Clones.clone(baseContract);
        nfts[++_id] = NFTInfo(msg.sender, identicalChild);
        BenefitNFTRouter(identicalChild).initialize(
            msg.sender,
            _name,
            _symbol,
            _uri,
            _benefitURI,
            _defaultBenefit
        );
        emit DeployNFT(identicalChild, msg.sender);
    }
    function setOwner(address _newAdd) external {
        isOwner();
        owner = _newAdd;
    }

    function setBase(address _newAdd) external {
        isOwner();
        baseContract = _newAdd;
    }

    function setPaused() external {
        isOwner();
        paused = paused == 0 ? 1 : 0;
    }

    function isPaused() external view returns (uint256) {
        return paused;
    }
}