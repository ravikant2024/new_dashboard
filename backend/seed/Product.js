const Product = require("../models/Product");

const products = [
  {
    "_id": "66f254ac53bbe09c7c63fa54",
    "title": "RPoE switch 8 Port",
    "description": "Model                  RPoE-8P-AG\nPower In             12-48V DC @ Port 2-8 \nPower Out          12-48V DC @ DC Socket  \nWorking Rate     101001000 Mbps  \n",
    "price": 5000,
    "discountPercentage": 10,
    "category": "65a7e24602e12c44f599443f"
    ,
    "brand": "65a7e20102e12c44f5994427"
    ,
    "stockQuantity": 998,
    "thumbnail": "https://oillp.b-cdn.net/Gigabit%20Reverse%20PoE%20Switch.png",
    "images": [
      "https://oillp.b-cdn.net/Gigabit%20Reverse%20PoE%20Switch.png",
      "https://oillp.b-cdn.net/Gigabit%20Reverse%20PoE%20Switch.png",
      "https://oillp.b-cdn.net/Gigabit%20Reverse%20PoE%20Switch.png",
      "https://oillp.b-cdn.net/Gigabit%20Reverse%20PoE%20Switch.png"
    ],
    "isDeleted": false,
    "createdAt": "2024-09-24T05:57:00.989Z",

    "updatedAt": "2024-09-24T05:57:00.989Z",

  },
  {
    "_id": "66f254ac53bbe09c7c63fa56",
    "title": "PoE Injector AC",
    "description": "Model                  RPoE-8P-AG\nPower In             12-48V DC @ Port 2-8 \nPower Out          12-48V DC @ DC Socket  \nWorking Rate     101001000 Mbps  \n",
    "price": 5000,
    "discountPercentage": 10,
    "category": "65a7e24602e12c44f599443a"
    ,
    "brand": "65a7e20102e12c44f5994427"
    ,
    "stockQuantity": 998,
    "thumbnail": "https://oillp.b-cdn.net/Product%20Photos/PoE%20Injector%20ID_WithoutBG/PoE%20Injector%20OD_04.png",
    "images": [
      "https://oillp.b-cdn.net/Product%20Photos/PoE%20Injector%20ID_WithoutBG/PoE%20Injector%20OD_04.png",
      "https://oillp.b-cdn.net/Product%20Photos/PoE%20Injector%20ID_WithoutBG/PoE%20Injector%20OD_AC.png",
      "https://oillp.b-cdn.net/Product%20Photos/PoE%20Injector%20ID_WithoutBG/PoE%20Injector%20OD_04.png",
      "https://oillp.b-cdn.net/Product%20Photos/PoE%20Injector%20ID_WithoutBG/PoE%20Injector%20OD_AC.png",
    ],
    "isDeleted": false,
    "createdAt": "2024-09-24T05:57:00.989Z",

    "updatedAt": "2024-09-24T05:57:00.989Z",

  },
  {
    "_id": "66f254ac53bbe09c7c63fa57",
    "title": "PoE Injector DC",
    "description": "Model                  RPoE-8P-AG\nPower In             12-48V DC @ Port 2-8 \nPower Out          12-48V DC @ DC Socket  \nWorking Rate     101001000 Mbps  \n",
    "price": 5000,
    "discountPercentage": 10,
    "category": "65a7e24602e12c44f599443a"
    ,
    "brand": "65a7e20102e12c44f5994427"
    ,
    "stockQuantity": 998,
    "thumbnail": "https://oillp.b-cdn.net/Product%20Photos/PoE%20Injector%20ID_WithoutBG/PoE%20Injector%20OD_DC.png",
    "images": [
      "https://oillp.b-cdn.net/Product%20Photos/PoE%20Injector%20ID_WithoutBG/PoE%20Injector%20OD_DC.png",
      "https://oillp.b-cdn.net/Product%20Photos/PoE%20Injector%20ID_WithoutBG/PoE%20Injector%20OD_DC.png",
      "https://oillp.b-cdn.net/Product%20Photos/PoE%20Injector%20ID_WithoutBG/PoE%20Injector%20OD_DC.png",
      "https://oillp.b-cdn.net/Product%20Photos/PoE%20Injector%20ID_WithoutBG/PoE%20Injector%20OD_DC.png",

     ],
    "isDeleted": false,
    "createdAt": "2024-09-24T05:57:00.989Z",

    "updatedAt": "2024-09-24T05:57:00.989Z",

  },
  {
    "_id": "66f254ac53bbe09c7c63fa55",
    "title": "PoE Switch 4 Port 2 Uplink",
    "description": "Model  ",
    "price": 5000,
    "discountPercentage": 10,
    "category": "65a7e24602e12c44f599443f"
    ,
    "brand": "65a7e20102e12c44f5994427"
    ,
    "stockQuantity": 998,
    "thumbnail": "https://oillp.b-cdn.net/Switch/PoE%20Switch%20(4PoE%20%2B2%20Uplink).png",
    "images": [
     "https://oillp.b-cdn.net/Switch/PoE%20Switch%20(4PoE%20%2B2%20Uplink).png",
     "https://oillp.b-cdn.net/Switch/PoE%20Switch%20(4PoE%20%2B2%20Uplink).png",
     "https://oillp.b-cdn.net/Switch/PoE%20Switch%20(4PoE%20%2B2%20Uplink).png",
     "https://oillp.b-cdn.net/Switch/PoE%20Switch%20(4PoE%20%2B2%20Uplink).png",
    ],
    "isDeleted": false,
    "createdAt": "2024-09-24T05:57:00.989Z",

    "updatedAt": "2024-09-24T05:57:00.989Z",

  },
  {
    "_id": "66f254ac53bbe09c7c63fa58",
    "title": "OutDoor DC PoE Injector ",
    "description": "Model  ",
    "price": 5000,
    "discountPercentage": 10,
    "category": "65a7e24602e12c44f599443a"
    ,
    "brand": "65a7e20102e12c44f5994427"
    ,
    "stockQuantity": 998,
    "thumbnail": "https://oillp.b-cdn.net/Product%20Photos/PoE%20Injector%20OD_WithoutBG/PoE%20Injector%20OD.png",
    "images": [
    "https://oillp.b-cdn.net/Product%20Photos/PoE%20Injector%20OD_WithoutBG/PoE%20Injector%20OD_01.png",
    "https://oillp.b-cdn.net/Product%20Photos/PoE%20Injector%20OD_WithoutBG/PoE%20Injector%20OD_02.png",
    "https://oillp.b-cdn.net/Product%20Photos/PoE%20Injector%20OD_WithoutBG/PoE%20Injector%20OD_03.png",
    "https://oillp.b-cdn.net/Product%20Photos/PoE%20Injector%20OD_WithoutBG/PoE%20Injector%20OD.png"
    ],
    "isDeleted": false,
    "createdAt": "2024-09-24T05:57:00.989Z",

    "updatedAt": "2024-09-24T05:57:00.989Z",

  },
  {
    "_id": "66f254ac53bbe09c7c63fa60",
    "title": "Outdoor Ethernet Surge Protector",
    "description": 
	"Model :  ETH-SPD_OD	Nominal Voltage : 56V upto 60V 90W Data Line Protection :  RJ45 10/100/1000 Mbps @ All 4 Pairs Compliance : IEEE 802.3.af/at/btOperating Temperature : -40 to 90°C	Protection Mode : Line-To-Line and Line-To-Ground Power Indicator : Yes (Inside)\n",
    "price": 5000,
    "discountPercentage": 10,
    "category": "65a7e24602e12c44f599443f"
    ,
    "brand": "65a7e20102e12c44f5994427"
    ,
    "stockQuantity": 998,
    "thumbnail": "http://103.142.118.24/(Outdoor)%20Ethernet%20Surge%20Protector.png",
    "images": [
      "http://103.142.118.24/(Outdoor)%20Ethernet%20Surge%20Protector.png",
      "http://103.142.118.24/(Outdoor)%20Ethernet%20Surge%20Protector.png",
      "http://103.142.118.24/(Outdoor)%20Ethernet%20Surge%20Protector.png",
      "http://103.142.118.24/(Outdoor)%20Ethernet%20Surge%20Protector.png"
    ],
    "isDeleted": false,
    "createdAt": "2024-09-24T05:57:00.989Z",

    "updatedAt": "2024-09-24T05:57:00.989Z",

  },
{
    "_id": "66f254ac53bbe09c7c63fa61",
    "title": "DC 2 DC Convertor",
    "description": 
	"Model:       D2D0505 Input:         48V DCOutput:      5V DC 1Amp.\n",
    "price": 5000,
    "discountPercentage": 10,
    "category": "65a7e24602e12c44f599443f"
    ,
    "brand": "65a7e20102e12c44f5994427"
    ,
    "stockQuantity": 998,
    "thumbnail": "http://103.142.118.24/DC%202%20DC%20Convertor.png",
    "images": [
      "http://103.142.118.24/DC%202%20DC%20Convertor.png",
      "http://103.142.118.24/DC%202%20DC%20Convertor.png",
      "http://103.142.118.24/DC%202%20DC%20Convertor.png",
      "http://103.142.118.24/DC%202%20DC%20Convertor.png"
    ],
    "isDeleted": false,
    "createdAt": "2024-09-24T05:57:00.989Z",

    "updatedAt": "2024-09-24T05:57:00.989Z",

  }
];

exports.seedProduct = async () => {
  try {
    await Product.insertMany(products);
    console.log("Product seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
