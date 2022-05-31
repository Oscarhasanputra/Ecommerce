pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;
contract MyContract {
    
    uint[] public listProduct;

    // mapping(uint=>ProductDetail) public productDetail;

    mapping(address=> WalletPerson) public wallets;


    // struct ProductDetail{
    //     uint productID;
    //     address owner;
    //     string name;
    //     string category;
    //     string photo;
    //     string description;
    //     uint256 price;
    //     uint256 rating;
    // }
    
    


    struct WalletPerson{
        string name;
        string photo;
        string email;
        uint[] order;
    }

    function getProductList() public view returns(uint[] memory){
    
        return listProduct;
    }
    function sizeProductList() public view returns(uint){
        return listProduct.length;
    }
    function addProduct() public {
        // Comment[] storage _comment = ;
        // mengalokasikan memory sementara pada variabel baru
        uint productID= block.timestamp;
        // menambahkan produk kedalam list
        listProduct.push(productID);
        // productDetail[productID]= ProductDetail(productID,msg.sender,_name,_category,_photo,_desc,_price,0);
      
    }
    
    

    function registerAccount(string memory _name, string memory _email) public {
        WalletPerson storage person= wallets[msg.sender];
        person.name= _name;
        person.photo = "";
        person.email = _email;
        
        // wallets[msg.sender] = WalletPerson({name: _name, gender : Gender.Man, photo : "" , email : _email , order: new Order[]()});
    }

    function addOrderToAccount() public { 

        // OrderDetail memory _orderDetail= OrderDetail(new string[](0),new uint[](0));
        // menambahkan status order detail saat pertama kali menambahkan order list kepada pembeli;
        

        uint orderID = block.timestamp;
        // Order memory _order= Order(orderID,Status.Waiting,_productID,accountSeller,msg.sender,_email,false,_orderDetail);
        // orderList[orderID] = _order;
        // menambahkan list order pada wallet secara kronologis;
        wallets[msg.sender].name="oscar";
        wallets[msg.sender].order.push(orderID);
        // melakukan pembayaran ke seller
        // kode disini!!
    }

  

    

}