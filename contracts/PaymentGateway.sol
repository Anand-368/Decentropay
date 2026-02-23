// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract PaymentGateway is ReentrancyGuard {
    // Events
    event PaymentSent(
        address indexed from,
        address indexed to,
        uint256 amount,
        string message,
        uint256 timestamp
    );

    // State variables
    uint256 private transactionCount;

    // Struct to store transaction details (optional, but good for history)
    struct Transaction {
        address from;
        address to;
        uint256 amount;
        string message;
        uint256 timestamp;
    }

    Transaction[] internal transactions;

    /**
     * @dev Send cryptocurrency to a recipient with a message.
     * @param _to The address of the recipient.
     * @param _message A short message or note accompanying the payment.
     */
    function sendPayment(address payable _to, string memory _message) public payable nonReentrant {
        require(msg.value > 0, "Payment amount must be greater than zero");
        require(_to != address(0), "Invalid recipient address");
        require(msg.sender != _to, "Cannot send payment to yourself");

        // Transfer funds
        (bool sent, ) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        // Increment transaction count
        transactionCount++;

        // Store transaction
        transactions.push(Transaction(msg.sender, _to, msg.value, _message, block.timestamp));

        // Emit event
        emit PaymentSent(msg.sender, _to, msg.value, _message, block.timestamp);
    }

    /**
     * @dev Get total number of transactions processed by the contract.
     */
    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }

    /**
     * @dev Get all transactions. 
     * CAUTION: This might get expensive if there are too many transactions. 
     * In production, rely on events/The Graph.
     */
    function getAllTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }
}
