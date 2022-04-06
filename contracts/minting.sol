//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract minting is ERC721URIStorage,Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private tokenId;

    constructor() ERC721("exampleNFT","NFT"){

    }

    function mintNFT(string memory tokenURI) public onlyOwner returns (uint256){
        tokenId.increment();
        uint256 id = tokenId.current();
        _mint(msg.sender, id);
        _setTokenURI(id, tokenURI);
        return id;
    }

}
