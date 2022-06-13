pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;
contract MyContract {
    
    mapping(uint=>ProductDetail) public productDetail;

    mapping(address=> WalletPerson) public wallets;

    mapping(address=>uint) public balances;
    event TransferReceived(address _from, uint _amount);
    event TransferSent(address _from, address _destAddr, uint _amount);
    event CreateProduct(string name, string desc,string category, uint price);
    event EditProduct(string name, string desc,string category, uint price);
    struct ProductDetail{
        address owner;
        string name;
        string category;
        string photo;
        string description;
        uint256 price;
    }
    
    struct WalletPerson{
        string name;
        string photo;
        string email;
        string profesi;
    }
    function receive(address destAddr) external payable{
        require(msg.value > 0,"Empty Ethers Being Sent");
        balances[destAddr] += msg.value;
        emit TransferReceived(msg.sender, msg.value);
    }

    function withdraw(uint amount) public payable {
        require(balances[msg.sender] >= amount, " Exceeded Claim Saldo");
        payable(msg.sender).transfer(amount);
        balances[msg.sender] -= amount;
        emit TransferSent(address(this),msg.sender, amount);
    }

    function refund(address destAddr,uint amount) external payable{
        require(balances[destAddr] >= amount, " Exceeded Refund Saldo");
        require(amount > 0,"Empty Ethers Being Refunded");
        payable(msg.sender).transfer(amount);
        balances[destAddr] -= amount;
        emit TransferSent(address(this),msg.sender, amount);
    }

    function addProduct(uint productID,string memory _name,string memory _desc, uint256 _price, string memory _category,
                        string memory _photo) public {
        
        productDetail[productID]= ProductDetail(msg.sender,_name,_category,_photo,_desc,_price);
        emit CreateProduct(_name,_desc,_category,_price);
    }

    function editProduct(uint productID,string memory _name,string memory _desc, uint256 _price, string memory _category,
                        string memory _photo) public {
        ProductDetail storage prod= productDetail[productID];
        prod.name = _name;
        prod.category = _category;
        prod.photo = _photo;
        prod.description = _desc;
        prod.price = _price;
        emit EditProduct(_name,_desc,_category,_price);
    }
    
    

    function registerAccount(string memory _name,string memory _photo, string memory _email,string memory _profesi) public {
        WalletPerson storage person= wallets[msg.sender];
        person.name= _name;
        person.photo = _photo;
        person.email = _email;
        person.profesi= _profesi;
        
        // wallets[msg.sender] = WalletPerson({name: _name, gender : Gender.Man, photo : "" , email : _email , order: new Order[]()});
    }


  

    

}