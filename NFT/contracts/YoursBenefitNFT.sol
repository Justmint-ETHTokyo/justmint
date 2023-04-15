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

    uint256 private _tokenIds;
    string private _tokenURI;

    string public benefitURI;
    mapping(uint256 => uint256[]) public benefits;
    mapping (uint256 => uint8) locked;

    function isOwner() private view{
        require(owner == msg.sender, "OnlyOwner");
    }

    function isFactory() private view {
        require(factory == msg.sender, "OnlyFactory");
    }
    
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

    // Actions =========================================================
    function mint(address _to) external {
        require(_isBase == 0, "Is not initialized");
        uint256 newId = ++_tokenIds;

        uint256[] storage newBenefits = benefits[newId];
        for (uint256 i = 0; i < defaultBenefit.length; i++) {
            newBenefits.push(defaultBenefit[i]);
        }

        _safeMint(_to, newId);

        emit Mint(newId);
    }

    function setLock(uint256[] memory _ids, uint8 _lock) external { // lock == 0(false), == 1(true) // 0 이면 언락드, 1 이면 락드
        isFactory();
        for (uint i = 0; i < _ids.length; i++) {
            locked[_ids[i]] = _lock;
        }
    }

    function changeSingleBenefits(uint256 _id, uint256[] memory _newBenefits)
        external
    {
        isOwner();
        benefits[_id] = _newBenefits;
    }

    function changeBatchBenefits(
        uint256[] memory _ids,
        uint256[] memory _newBenefits
    ) external {
        isOwner();
        for (uint256 i = 0; i < _ids.length; i++) {
            benefits[_ids[i]] = _newBenefits;
        }
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId, /* firstTokenId */
        uint256 batchSize
    ) internal override {
        require(locked[tokenId] == 0, "NFT is locked");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
    // Setting =========================================================
    function setOwner(address _newAdd) external {
        isOwner();
        owner = _newAdd;
    }

    function setBenefitsURI(string memory _uri) external {
        isOwner();
        benefitURI = _uri;
        emit ChangeBenefitsURI(_uri);
    }

    // View =========================================================
    function tokenURI(uint256 _id)
        public
        view
        override
        returns (string memory)
    {
        return _tokenURI;
    }
}