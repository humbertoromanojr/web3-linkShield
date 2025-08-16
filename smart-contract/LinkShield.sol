// SPDX-License-Identifier: MIT

pragma solidity ^0.8.30;

contract LinkShield {

    struct Link {
        string url;
        address owner;
        uint256 fee;
    }

    // comissao a cada pagamento
    uint256 public commission = 1;
    // mapping do Link
    mapping(string => Link) private links;
    // mapping de permissoes
    mapping(string => mapping(address => bool)) public hasAccess; 
    // endereco para sacar o dinheiro ganho
    address public immutable admin;

    // dispara codigo no deploy
    constructor() {
        admin = msg.sender;
    }

    function addLink(string calldata url, string calldata linkId, uint256 fee) public {
        Link memory link = links[linkId]; 
        require(link.owner == address(0) || link.owner == msg.sender, 'This linkId alread has an owner');
        require(fee == 0 || fee > commission, 'Fee too low');

        link.url = url;
        link.fee = fee;
        link.owner = msg.sender;

        links[linkId] = link;
        // quem tem permissao
        hasAccess[linkId][msg.sender] = true;
    }

    function payLink(string calldata linkId) public payable {
        // verificar o linkId
        Link memory link = links[linkId]; 
        //verificar se o link existe
        require(link.owner != address(0), 'Link not found');
        // verificar se tem permiossao
        require(hasAccess[linkId][msg.sender] == false, 'You already have access');
        // se o usuario pagou corretamente pelo link
        require(msg.value >= link.fee, 'Insufficient payment');

        hasAccess[linkId][msg.sender] = true;
        
        //transferir dinheiro para o Owner = Dono, menos a comissao
        payable(link.owner).transfer(msg.value - commission);
    }

    function getLink(string calldata linkId) public view returns (Link memory) {
        Link memory link = links[linkId]; 
        if(link.fee == 0) return link;
        // se não tiver permissao, limpa url da memoria
        if(hasAccess[linkId][msg.sender] == false)
            link.url = "";

        return link;
    }

    function withdraw() public {
        // permissao somente para o admin, sacar o dinheiro
        require(msg.sender == admin, 'Only admin can withdraw');
        uint256 amount = address(this).balance;
        payable(admin).transfer(amount);
    }

}