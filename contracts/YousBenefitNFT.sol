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
import "./ERC721Enumerable.sol";

contract YoursBenefitNFT is ERC721Enumerable {
    event Mint(uint256);
    event ChangeBenefitsURI(string);

    uint8 private _isBase;
    uint128[] public defaultBenefit;
    address public owner;
    address public factory;

    function isOwner() private view{
        require(owner == msg.sender, "OnlyOwner");
    }

    function isFactory() private view {
        require(factory == msg.sender, "OnlyFactory");
    }

    uint256 private _tokenIds;
    string private _tokenURI;

    string public benefitURI;
    mapping(uint256 => uint256[]) public benefits;
    mapping (uint256 => uint8) locked;

    constructor() {
        _isBase = 1;
    }

    // Init =========================================================
    function initialize(
        address _owner,
        string memory _name,
        string memory _symbol,
        string memory _uri,
        string memory _benefitURI,
        uint128[] memory _defaultBenefit
    ) external {
        require(_isBase == 0, "Base Contract");
        require(owner == address(0), "Already initialized");
        owner = _owner;
        factory = msg.sender;
        _tokenIds = 0;
        _tokenURI = _uri;
        benefitURI = _benefitURI;
        defaultBenefit = _defaultBenefit;
        _init(_name, _symbol);
    }
}