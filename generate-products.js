const fs = require('fs');

// Valid Unsplash photo IDs organized by category
const validImages = {
  ART: [
    "1579783902654-bfbc149b3b0f", "1541961017774-22349e4a1262",
    "1513364776144-60967b0f800f", "1544967082-d9d25d867d66",
    "1518998053901-5348d3961a04", "1547826039-bfc35e0f1ea8",
    "1551524559-8af4e6624178", "1513475382585-d06e58bcb0e0",
    "1545989253-06cc0f191097", "1519608487953-e999c86e7455",
    "1543857778-c4a1a3e0b2eb", "1557672172-298e090bd0f1",
    "1549490349-8643362243b5", "1513519245088-0e12902e35ca",
    "1578301977673-965f55b5c0f4", "1558618666-fcd25c85f82e",
    "1578301978693-85fa9c0320b9", "1547891654-e66ed7ebb968",
    "1549887534-1541e9326642", "1533139502658-0192f5b74848",
    "1579783901586-d88db46077c7", "1513519245088-0e12902e35ca",
    "1544027993-37dbfe43562a", "1541961017774-22349e4a1262",
    "1547826039-bfc35e0f1ea8", "1513364776144-60967b0f800f",
    "1557672172-298e090bd0f1", "1579783902654-bfbc149b3b0f",
    "1518998053901-5348d3961a04", "1544967082-d9d25d867d66",
    "1551524559-8af4e6624178", "1545989253-06cc0f191097",
    "1519608487953-e999c86e7455", "1543857778-c4a1a3e0b2eb",
    "1549490349-8643362243b5", "1578301977673-965f55b5c0f4"
  ],
  WATCHES: [
    "1524592094714-0f0654e20314", "1522312346375-d1a52e2b99da",
    "1614164185128-e4ec99c436d7", "1533139502658-0192f5b74848",
    "1547996160-81dfa63595aa", "1508685096489-7aacd43bd3b1",
    "1594534475838-2eed594df61d", "1622434641406-a15852f94afa",
    "1612817159949-195b6eb9e31a", "1539874754764-5a96559165b0",
    "1585123334904-845d60e97b29", "1619134778706-7015533a6150",
    "1619946794135-5bc917a27793", "1542496658-e33a6d015082",
    "1594534475838-2eed594df61d", "1587836374828-4dbafa94cf0e",
    "1612817159949-195b6eb9e31a", "1547996160-81dfa63595aa",
    "1508685096489-7aacd43bd3b1", "1524592094714-0f0654e20314",
    "1522312346375-d1a52e2b99da", "1614164185128-e4ec99c436d7",
    "1547996160-81dfa63595aa", "1594534475838-2eed594df61d",
    "1622434641406-a15852f94afa", "1612817159949-195b6eb9e31a",
    "1539874754764-5a96559165b0", "1585123334904-845d60e97b29",
    "1619134778706-7015533a6150", "1619946794135-5bc917a27793",
    "1542496658-e33a6d015082", "1594534475838-2eed594df61d",
    "1587836374828-4dbafa94cf0e", "1612817159949-195b6eb9e31a"
  ],
  CARS: [
    "1544636331-e26879cd4d9b", "1503376780353-7e6692767b70",
    "1580274455191-1c62238ce452", "1552519507-da3b142c6e3d",
    "1553440569-bcc63803a83d", "1542362567-b07e54358753",
    "1618843479313-40f8afb4b4d8", "1555215695-3004980ad54e",
    "1494976388531-d1058494cdd8", "1525609004556-c46c65a0f36f",
    "1553440569-bcc63803a83d", "1544636331-e26879cd4d9b",
    "1503376780353-7e6692767b70", "1580274455191-1c62238ce452",
    "1552519507-da3b142c6e3d", "1542362567-b07e54358753",
    "1618843479313-40f8afb4b4d8", "1555215695-3004980ad54e",
    "1494976388531-d1058494cdd8", "1525609004556-c46c65a0f36f",
    "1544636331-e26879cd4d9b", "1503376780353-7e6692767b70",
    "1580274455191-1c62238ce452", "1552519507-da3b142c6e3d",
    "1553440569-bcc63803a83d", "1542362567-b07e54358753",
    "1618843479313-40f8afb4b4d8", "1555215695-3004980ad54e",
    "1494976388531-d1058494cdd8", "1525609004556-c46c65a0f36f",
    "1553440569-bcc63803a83d", "1544636331-e26879cd4d9b",
    "1503376780353-7e6692767b70", "1580274455191-1c62238ce452"
  ],
  JEWELLERY: [
    "1515562141589-67f0d569b34e", "1535632066927-ab7c9ab60908",
    "1573408301185-9146fe634ad0", "1611591437281-460bfbe1220a",
    "1602751584552-8ba73aad10e1", "1603561591411-07134e71a2a9",
    "1599643478518-a784e5dc4c8f", "1605100804763-247f67b3557e",
    "1535632066927-ab7c9ab60908", "1611591437281-460bfbe1220a",
    "1573408301185-9146fe634ad0", "1602751584552-8ba73aad10e1",
    "1599643478518-a784e5dc4c8f", "1603561591411-07134e71a2a9",
    "1515562141589-67f0d569b34e", "1599643478518-a784e5dc4c8f",
    "1605100804763-247f67b3557e", "1535632066927-ab7c9ab60908",
    "1611591437281-460bfbe1220a", "1602751584552-8ba73aad10e1",
    "1573408301185-9146fe634ad0", "1515562141589-67f0d569b34e",
    "1599643478518-a784e5dc4c8f", "1603561591411-07134e71a2a9",
    "1605100804763-247f67b3557e", "1535632066927-ab7c9ab60908",
    "1611591437281-460bfbe1220a", "1602751584552-8ba73aad10e1",
    "1573408301185-9146fe634ad0", "1515562141589-67f0d569b34e",
    "1599643478518-a784e5dc4c8f", "1603561591411-07134e71a2a9"
  ],
  COLLECTIBLES: [
    "1589998059171-988d887df646", "1531346878377-a5be20888e57",
    "1621259182978-fbf93132d53d", "1558618666-fcd25c85f82e",
    "1585771724684-38269d6639fd", "1526170375885-4d8ecf77b99f",
    "1550745165-9bc0b252726f", "1594736797933-d0501ba2fe65",
    "1580809361436-42a7ec204889", "1536440136628-849c177e76a1",
    "1578662996442-48f60103fc96", "1581783898377-1c85bf937427",
    "1582555172866-f89de384e22a", "1558618666-fcd25c85f82e",
    "1577993625940-c3d102806e8a", "1594736797933-d0501ba2fe65",
    "1526170375885-4d8ecf77b99f", "1581783898377-1c85bf937427",
    "1536440136628-849c177e76a1", "1582555172866-f89de384e22a",
    "1589998059171-988d887df646", "1531346878377-a5be20888e57",
    "1621259182978-fbf93132d53d", "1558618666-fcd25c85f82e",
    "1585771724684-38269d6639fd", "1526170375885-4d8ecf77b99f",
    "1550745165-9bc0b252726f", "1594736797933-d0501ba2fe65",
    "1580809361436-42a7ec204889", "1536440136628-849c177e76a1"
  ],
  FASHION: [
    "1551028719-00167b16eac5", "1544923246-77307dd270da",
    "1518622358385-8ea7d228e554", "1507679799987-c73779587ccf",
    "1542272604-787c3835535d", "1542291026-7eec264c27ff",
    "1434389677669-e08b4cda3a60", "1601924994988-55c0d0c5d2f1",
    "1548036328-c9fa89d128fa", "1576871337622-98d48d1cf531",
    "1598032895397-b947244d418f", "1553062407-98eeb64c6a62",
    "1520903920243-00d872a2d1c9", "1544923246-77307dd270da",
    "1542291026-7eec264c27ff", "1601924994988-55c0d0c5d2f1",
    "1548036328-c9fa89d128fa", "1576871337622-98d48d1cf531",
    "1598032895397-b947244d418f", "1553062407-98eeb64c6a62",
    "1551028719-00167b16eac5", "1544923246-77307dd270da",
    "1518622358385-8ea7d228e554", "1507679799987-c73779587ccf",
    "1542272604-787c3835535d", "1542291026-7eec264c27ff",
    "1434389677669-e08b4cda3a60", "1601924994988-55c0d0c5d2f1",
    "1548036328-c9fa89d128fa", "1576871337622-98d48d1cf531"
  ],
  ANTIQUES: [
    "1555041469-a586c61ea9bc", "1507003211169-0a1dd7228f2d",
    "1519710164239-da123dc03ef4", "1558618666-fcd25c85f82e",
    "1582555172866-f89de384e22a", "1513694203232-719a280e022f",
    "1555041469-a586c61ea9bc", "1519710164239-da123dc03ef4",
    "1558618666-fcd25c85f82e", "1582555172866-f89de384e22a",
    "1513694203232-719a280e022f", "1555041469-a586c61ea9bc",
    "1519710164239-da123dc03ef4", "1558618666-fcd25c85f82e",
    "1582555172866-f89de384e22a", "1513694203232-719a280e022f",
    "1555041469-a586c61ea9bc", "1519710164239-da123dc03ef4",
    "1558618666-fcd25c85f82e", "1582555172866-f89de384e22a"
  ],
  SHOES: [
    "1542291026-7eec264c27ff", "1549298916-b41d501d3772",
    "1608256246200-53e635b5b65f", "1606107557195-0e29a4b5b4aa",
    "1495427514346-46b9ae065a68", "1605812860327-8b4b3e0e1094",
    "1595950653106-6c9ebd614d3a", "1525966222134-fcfa99b8ae77",
    "1549298916-b41d501d3772", "1608256246200-53e635b5b65f",
    "1495427514346-46b9ae065a68", "1606107557195-0e29a4b5b4aa",
    "1595950653106-6c9ebd614d3a", "1525966222134-fcfa99b8ae77",
    "1549298916-b41d501d3772", "1608256246200-53e635b5b65f",
    "1495427514346-46b9ae065a68", "1606107557195-0e29a4b5b4aa",
    "1595950653106-6c9ebd614d3a", "1525966222134-fcfa99b8ae77"
  ],
  BAGS: [
    "1548036328-c9fa89d128fa", "1553062407-98eeb64c6a62",
    "1584917865442-de89df76afd3", "1622560480654-d96214fdc887",
    "1590874185020-619f112f1a7b", "1594223274512-ad4803739b7c",
    "1548036328-c9fa89d128fa", "1553062407-98eeb64c6a62",
    "1584917865442-de89df76afd3", "1622560480654-d96214fdc887",
    "1590874185020-619f112f1a7b", "1594223274512-ad4803739b7c",
    "1548036328-c9fa89d128fa", "1553062407-98eeb64c6a62",
    "1584917865442-de89df76afd3", "1622560480654-d96214fdc887",
    "1590874185020-619f112f1a7b", "1594223274512-ad4803739b7c",
    "1548036328-c9fa89d128fa", "1553062407-98eeb64c6a62"
  ]
};

const categories = {
  ART: {
    prefixes: [
      "Original Oil Painting", "Abstract Canvas Art", "Watercolor Landscape", "Modern Art Print",
      "Vintage Poster", "Lithograph Print", "Mixed Media Collage", "Acrylic Painting",
      "Charcoal Drawing", "Oil on Canvas", "Impressionist Painting", "Surrealist Art Print",
      "Pop Art Canvas", "Minimalist Wall Art", "Expressionist Painting", "Still Life Painting",
      "Portrait Oil Painting", "Seascape Watercolor", "Cityscape Print", "Botanical Illustration",
      "Abstract Expressionism", "Contemporary Art Piece", "Renaissance Style Painting",
      "Japanese Woodblock Print", "Art Deco Poster", "Photography Print", "Sculpture Bronze",
      "Ceramic Art Piece", "Glass Art Vase", "Textile Wall Hanging", "Digital Art Print",
      "Pixel Art Canvas", "Street Art Print", "Graffiti Canvas", "Neon Art Installation",
      "Kinetic Sculpture", "Marble Bust", "Woodcut Print", "Etching Print",
      "Serigraph Print", "Gouache Painting", "Tempera Painting", "Fresco Style Art"
    ]
  },
  WATCHES: {
    prefixes: [
      "Rolex Submariner", "Omega Speedmaster", "Patek Philippe Nautilus", "Audemars Piguet Royal Oak",
      "TAG Heuer Carrera", "Breitling Navitimer", "Cartier Tank", "IWC Portugieser",
      "Zenith El Primero", "Tudor Black Bay", "Seiko Presage", "Grand Seiko Snowflake",
      "Longines Master Collection", "Breguet Classique", "Vacheron Constantin Overseas",
      "Jaeger-LeCoultre Reverso", "Blancpain Fifty Fathoms", "Hublot Big Bang",
      "Panerai Luminor", "Bulgari Octo", "Vintage Rolex Datejust", "Omega Seamaster",
      "TAG Heuer Monaco", "Breitling Superocean", "Cartier Santos", "IWC Pilot",
      "Tudor Pelagos", "Seiko Prospex", "Grand Seiko Spring Drive", "Longines HydroConquest",
      "Breguet Marine", "Vacheron Constantin Patrimony", "Jaeger-LeCoultre Master",
      "Blancpain Villeret", "Hublot Classic Fusion", "Panerai Submersible",
      "Bulgari Serpenti", "Bell & Ross BR 03", "Chopard Happy Sport", "Ulysse Nardin Marine"
    ]
  },
  CARS: {
    prefixes: [
      "Ferrari 488 GTB", "Lamborghini Huracan", "Porsche 911 Turbo S", "McLaren 720S",
      "Aston Martin Vantage", "Bugatti Chiron", "Mercedes-AMG GT", "BMW M4 Competition",
      "Ford Mustang GT", "Chevrolet Corvette Stingray", "Dodge Challenger SRT",
      "Jaguar F-Type", "Maserati GranTurismo", "Bentley Continental GT", "Rolls-Royce Wraith",
      "Classic Porsche 911", "Vintage Ferrari 250", "Ford GT40", "Shelby Cobra",
      "Chevrolet Camaro ZL1", "Nissan GT-R", "Toyota Supra MK4", "Mazda RX-7",
      "Subaru WRX STI", "Honda NSX", "Lexus LFA", "Audi R8", "Lamborghini Aventador",
      "Ferrari F8 Tributo", "McLaren Senna", "Pagani Huayra", "Koenigsegg Jesko",
      "Porsche Carrera GT", "Mercedes-Benz 300SL", "Aston Martin DB5", "Bentley Speed Six",
      "Bugatti Type 57", "Ferrari 250 GTO", "Jaguar E-Type", "Alfa Romeo 8C"
    ]
  },
  JEWELLERY: {
    prefixes: [
      "Diamond Solitaire Ring", "Sapphire Pendant Necklace", "Emerald Cut Earrings", "Pearl Choker Necklace",
      "Ruby Tennis Bracelet", "Platinum Wedding Band", "Gold Chain Necklace", "Tennis Bracelet Diamonds",
      "Vintage Brooch Pin", "Cubic Zirconia Studs", "Gold Signet Ring", "Sapphire Eternity Band",
      "Emerald Cocktail Ring", "Pearl Drop Earrings", "Ruby Halo Ring", "Diamond Eternity Band",
      "White Gold Hoops", "Vintage Locket", "Art Deco Brooch", "Citrine Pendant",
      "Amethyst Cocktail Ring", "Tanzanite Necklace", "Opal Fire Ring", "Aquamarine Earrings",
      "Alexandrite Pendant", "Garnet Tennis Bracelet", "Topaz Solitaire", "Moonstone Ring",
      "Turquoise Cuff Bracelet", "Jade Bangle", "Coral Necklace", "Lapis Lazuli Pendant"
    ]
  },
  COLLECTIBLES: {
    prefixes: [
      "Vintage Vinyl Record", "First Edition Comic Book", "Rare Coin Collection", "Vintage Toy Figure",
      "Antique Music Box", "Vintage Camera", "Retro Gaming Console", "Limited Edition Statuette",
      "Signed Baseball Card", "Vintage Movie Poster", "Rare Stamp Collection", "Vintage Typewriter",
      "Antique Globe", "Vintage Radio", "Retro Board Game", "Collectible Figurine",
      "Vintage Watch Box", "Antique Key Collection", "Vintage Map", "Retro Lunchbox",
      "Limited Edition Print", "Vintage Film Reel", "Antique Clock", "Vintage Compass",
      "Retro Telephone", "Vintage Luggage", "Antique Frame", "Vintage Binoculars",
      "Collectible Plate", "Vintage Thermos", "Antique Candlestick", "Vintage Telescope"
    ]
  },
  FASHION: {
    prefixes: [
      "Designer Leather Jacket", "Cashmere Overcoat", "Silk Evening Gown", "Tailored Wool Blazer",
      "Vintage Denim Jacket", "Italian Leather Boots", "Cashmere Sweater", "Silk Scarf",
      "Leather Crossbody Bag", "Wool Fedora Hat", "Silk Tie Set", "Leather Belt",
      "Cashmere Gloves", "Wool Peacoat", "Leather Chelsea Boots", "Silk Pajama Set",
      "Vintage Leather Satchel", "Wool Tweed Jacket", "Cashmere Cardigan", "Leather Driving Gloves",
      "Silk Bow Tie", "Wool Flat Cap", "Leather Watch Strap", "Cashmere Beanie",
      "Silk Pocket Square", "Wool Waistcoat", "Leather Oxford Shoes", "Cashmere Wrap",
      "Silk Blouse", "Wool Dress Pants", "Leather Ankle Boots", "Cashmere V-Neck"
    ]
  },
  ANTIQUES: {
    prefixes: [
      "Victorian Writing Desk", "Art Nouveau Lamp", "Georgian Mahogany Chair", "Edwardian Silver Tea Set",
      "Regency Period Mirror", "Tudor Style Cabinet", "Baroque Picture Frame", "Rococo Style Vase",
      "Antique Brass Compass", "Vintage Crystal Decanter", "Antique Ivory Figurine", "Vintage Porcelain Plate",
      "Antique Silver Candlestick", "Vintage Silk Fan", "Antique Wood Carving", "Vintage Bronze Sculpture",
      "Antique Pocket Knife", "Vintage Glass Cloche", "Antique Brass Telescope", "Vintage Ceramic Pot",
      "Antique Silver Locket", "Vintage Wood Box", "Antique Crystal Brooch", "Vintage Lace Tablecloth",
      "Antique Bronze Bell", "Vintage Velvet Cushion", "Antique Jade Pendant", "Vintage Music Sheet",
      "Antique Copper Kettle", "Vintage Glass Bottle", "Antique Silver Thimble", "Vintage Linen Doily"
    ]
  },
  SHOES: {
    prefixes: [
      "Italian Leather Loafers", "Suede Desert Boots", "Patent Leather Oxfords", "Canvas Espadrilles",
      "Wingtip Brogues", "Suede Chelsea Boots", "Leather Moccasins", "Canvas Slip-Ons",
      "Leather Sneakers", "Suede Chukka Boots", "Leather Driving Shoes", "Canvas Platform Sneakers",
      "Leather Monk Strap", "Suede Chelsea Boots", "Leather Derby Shoes", "Canvas High-Top Sneakers",
      "Leather Ankle Boots", "Suede Penny Loafers", "Leather Boat Shoes", "Canvas Low-Top Sneakers",
      "Leather Combat Boots", "Suede Side-Zip Boots", "Leather Cap-Toe Shoes", "Canvas Slip-On Sneakers",
      "Leather Western Boots", "Suede Lace-Up Boots", "Leather Penny Loafers", "Canvas Platform Sandals",
      "Leather Chelsea Boots", "Suede Monk Strap", "Leather Oxford Sneakers", "Canvas Espadrille Wedges"
    ]
  },
  BAGS: {
    prefixes: [
      "Leather Tote Bag", "Canvas Messenger Bag", "Suede Crossbody Bag", "Nylon Backpack",
      "Leather Briefcase", "Woven Straw Bag", "Leather Clutch", "Canvas Duffle Bag",
      "Suede Shoulder Bag", "Nylon Laptop Bag", "Leather Weekender", "Woven Rattan Bag",
      "Leather Satchel", "Canvas Tote", "Suede Bucket Bag", "Nylon Travel Bag",
      "Leather Belt Bag", "Canvas Gym Bag", "Suede Hobo Bag", "Nylon Mini Backpack",
      "Leather Card Holder", "Canvas Shopper Bag", "Suede Wristlet", "Nylon Crossbody",
      "Leather Passport Holder", "Canvas Weekend Bag", "Suede Dome Bag", "Nylon Duffel",
      "Leather Phone Pouch", "Canvas Drawstring Bag", "Suede Envelope Clutch", "Nylon Belt Bag"
    ]
  }
};

const auctionHouses = [
  "Key Date Coins", "Gold Standard Auction", "Timeline Auctions Limited",
  "Auction at Showplace", "Richard L. Edwards Auctioneering", "Kubli Haus",
  "Prestige Auction House", "Heritage Auctions", "Bonhams", "Christie's",
  "Sotheby's", "Phillips Auctioneers"
];

const locations = ["usa", "uk", "europe"];
const conditions = ["new", "used", "restored", "forparts"];
const actions = ["timed", "upcoming", "live"];
const genders = ["men", "women", "unisex"];

const descriptions = {
  ART: [
    "A stunning original artwork that captures the essence of modern artistic expression. This piece features bold brushstrokes and a captivating color palette. Perfect for collectors seeking a statement piece.",
    "This exceptional artwork showcases mastery of light and shadow. Created with premium materials on archival-grade canvas, this piece maintains its vibrancy for generations.",
    "An remarkable example of contemporary artistry, blending traditional techniques with modern sensibilities. The intricate details and thoughtful composition make it a standout piece.",
    "This captivating work demonstrates exceptional technical skill and creative vision. The harmonious color scheme and dynamic composition create a powerful visual impact.",
    "A beautiful representation of artistic excellence combining classical influences with a fresh, modern perspective. Premium pigments ensure lasting quality and visual appeal."
  ],
  WATCHES: [
    "This exceptional timepiece represents the pinnacle of horological excellence. Featuring a precision Swiss movement with chronometer certification, sapphire crystal face and stainless steel case.",
    "A masterpiece of watchmaking engineering with automatic movement and extended power reserve. The meticulously finished dial reflects the brand's commitment to perfection.",
    "This distinguished wristwatch combines classic design with modern technology. Self-winding movement provides reliable timekeeping while scratch-resistant sapphire ensures lasting clarity.",
    "An iconic timepiece with robust case construction, luminous markers, and precision chronograph function. Water-resistant and built to last generations.",
    "This premium watch exemplifies fine watchmaking with intricate dial design, exhibition caseback, and premium leather strap. Both functional instrument and work of art."
  ],
  CARS: [
    "This magnificent automobile represents the apex of automotive engineering. Powerful engine, aerodynamic body, and luxurious interior deliver an unparalleled driving experience.",
    "A true automotive legend combining raw power with refined elegance. Hand-built engine produces breathtaking acceleration while chassis delivers precise handling.",
    "This exceptional sports car delivers an adrenaline-pumping experience. Twin-turbocharged engine, advanced suspension, and carbon fiber construction make it a formidable performer.",
    "An icon of automotive excellence with distinctive styling and race-derived powertrain. Every element optimized for performance and driver engagement.",
    "This remarkable automobile combines breathtaking performance with everyday usability. Advanced hybrid powertrain delivers instant torque while maintaining impressive efficiency."
  ],
  JEWELLERY: [
    "This exquisite piece features meticulously selected gemstones set in premium precious metal. Each stone expertly cut and polished to maximize brilliance and fire.",
    "A stunning example of fine jewellery craftsmanship showcasing exceptional gemstones in a sophisticated setting. Artisanal expertise reflected in every detail.",
    "This magnificent creation combines rare gemstones with innovative design. Centerpiece stone exhibits exceptional clarity and color with accent stones adding depth.",
    "An elegant piece transcending trends with timeless design executed with contemporary precision. Premium materials ensure this piece will be treasured for generations.",
    "This luxurious creation represents the finest in jewellery design. Certified gemstones of exceptional quality set in hallmarked precious metal with certificate of authenticity."
  ],
  COLLECTIBLES: [
    "A rare and highly sought-after collectible in excellent condition. Carefully preserved with original packaging and documentation where applicable.",
    "This exceptional collectible is a must-have for serious enthusiasts. Rarity, condition, and historical significance make it valuable to any collection.",
    "An outstanding collectible representing a pivotal moment in its category. Maintained in remarkable condition with complete documentation and provenance.",
    "This remarkable find represents the holy grail for collectors. Pristine condition, complete documentation, and provenance make it an exceptional investment.",
    "A true collector's treasure combining rarity, condition, and desirability. Careful preservation has maintained its original quality over the decades."
  ],
  FASHION: [
    "This premium fashion piece represents pinnacle luxury craftsmanship. Constructed from finest materials, combining timeless style with exceptional durability.",
    "An exquisite example of high-fashion design with meticulous tailoring and premium materials. Attention to detail reflects the brand's commitment to excellence.",
    "This luxurious fashion item embodies sophistication and style. Crafted from premium materials with expert construction for both comfort and elegance.",
    "A masterpiece of fashion design combining classic elegance with contemporary flair. Premium materials and expert craftsmanship ensure style and longevity.",
    "This distinguished fashion piece showcases fine tailoring. Using highest quality materials and time-honored construction techniques for unmatched quality."
  ],
  ANTIQUES: [
    "This remarkable antique represents the finest craftsmanship of its era. Carefully preserved over decades, retaining original character and beauty.",
    "An exceptional example of historical craftsmanship expertly maintained and verified for authenticity. Intricate details reflect high standards of its creator.",
    "This distinguished antique carries the weight of history and beauty of traditional craftsmanship. Excellent condition speaks to generations of care.",
    "A captivating relic from a past era combining historical significance with aesthetic appeal. Masterful construction ensured survival in remarkable condition.",
    "This superb antique represents the pinnacle of craftsmanship from its period. Attention to detail, quality materials, and preservation make it exceptional."
  ],
  SHOES: [
    "These premium footwear exemplify fine shoemaking. Constructed from finest leathers using traditional techniques for exceptional comfort and durability.",
    "An exquisite pair combining classic design with modern comfort technology. Hand-selected leather, cushioned insole, and durable outsole provide all-day comfort.",
    "These distinguished shoes represent the finest in footwear craftsmanship. Premium leather construction and traditional last shape create beautiful, lasting shoes.",
    "A masterclass in footwear design featuring premium materials and expert construction. Attention to detail reflects generations of shoemaking expertise.",
    "These exceptional shoes combine timeless elegance with contemporary comfort. Handcrafted construction and innovative sole technology suit any occasion."
  ],
  BAGS: [
    "This premium bag represents finest luxury leather goods. Constructed from carefully selected leather using traditional techniques for style and functionality.",
    "An exquisite example of fine leather craftsmanship with premium materials and expert construction. Timeless design and functional interior for professional and personal use.",
    "This distinguished bag combines elegant design with practical functionality. Premium leather, quality hardware, and thoughtful organization create a lasting piece.",
    "A masterpiece of bag design featuring finest materials and expert construction. Attention to detail in every element reflects commitment to excellence.",
    "This luxurious bag represents pinnacle leather goods craftsmanship. Hand-selected materials, expert construction, and timeless design ensure it will be treasured."
  ]
};

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomTime() {
  const days = getRandomNumber(0, 7);
  const hours = getRandomNumber(0, 23);
  const mins = getRandomNumber(0, 59);
  return `${String(days).padStart(2, '0')}d:${String(hours).padStart(2, '0')}h:${String(mins).padStart(2, '0')}sec`;
}

function getImages(category, index) {
  const imgs = validImages[category];
  const baseId = imgs[index % imgs.length];
  return [
    `https://images.unsplash.com/photo-${baseId}?w=800&h=800&fit=crop&q=80`,
    `https://images.unsplash.com/photo-${baseId}?w=800&h=800&fit=crop&q=80&sat=-100`,
    `https://images.unsplash.com/photo-${baseId}?w=800&h=800&fit=crop&q=80&bri=-20`,
    `https://images.unsplash.com/photo-${baseId}?w=800&h=800&fit=crop&q=80&con=20`
  ];
}

function getFeatures(category) {
  const featureMap = {
    ART: ["Museum-quality canvas and pigments", "Certificate of authenticity", "Expertly framed", "Limited edition", "Verified artist signature"],
    WATCHES: ["Swiss automatic movement", "Sapphire crystal glass", "Water resistant 100m", "Original box and papers", "5-year warranty"],
    CARS: ["Full service history", "Low mileage example", "Comprehensive inspection", "Premium paint and interior", "Performance exhaust"],
    JEWELLERY: ["Certified gemstone grading", "Hallmarked precious metal", "Independent valuation", "Lifetime warranty", "Premium presentation box"],
    COLLECTIBLES: ["Mint condition preserved", "Original packaging included", "Limited production number", "Verified authenticity", "Climate-controlled storage"],
    FASHION: ["Premium materials sourced", "Expert craftsmanship", "Timeless design", "Italian leather construction", "Hand-finished details"],
    ANTIQUES: ["Expertly authenticated", "Original condition preserved", "Historical provenance verified", "Professional conservation", "Museum-quality specimen"],
    SHOES: ["Hand-stitched construction", "Premium leather upper", "Cushioned insole", "Goodyear-welted sole", "Made in Italy"],
    BAGS: ["Full-grain leather", "Hand-stitched details", "Quality brass hardware", "Organized interior pockets", "Dust bag included"]
  };
  const features = featureMap[category];
  return features.sort(() => 0.5 - Math.random()).slice(0, getRandomNumber(3, 5));
}

function getColor(category) {
  const colorMap = {
    ART: ["Multicolor", "Blue", "Red", "Green", "Black", "White", "Gold", "Silver"],
    WATCHES: ["Silver", "Gold", "Rose Gold", "Black", "Blue", "White", "Green"],
    CARS: ["Red", "Black", "White", "Blue", "Silver", "Yellow", "Green", "Grey"],
    JEWELLERY: ["Gold", "Silver", "Rose Gold", "Platinum", "White Gold"],
    COLLECTIBLES: ["Multicolor", "Black", "Red", "Blue", "Green", "Gold"],
    FASHION: ["Black", "Brown", "Navy", "Camel", "Burgundy", "Grey", "Tan"],
    ANTIQUES: ["Brown", "Gold", "Bronze", "Silver", "Cream", "Mahogany"],
    SHOES: ["Black", "Brown", "Tan", "Navy", "Burgundy", "White", "Grey"],
    BAGS: ["Black", "Brown", "Tan", "Navy", "Burgundy", "Cream", "Grey"]
  };
  return getRandomItem(colorMap[category]);
}

function getPriceRange(category) {
  const ranges = {
    ART: { min: 50, max: 15000 },
    WATCHES: { min: 500, max: 50000 },
    CARS: { min: 5000, max: 250000 },
    JEWELLERY: { min: 100, max: 25000 },
    COLLECTIBLES: { min: 25, max: 5000 },
    FASHION: { min: 50, max: 3000 },
    ANTIQUES: { min: 100, max: 10000 },
    SHOES: { min: 50, max: 2000 },
    BAGS: { min: 75, max: 5000 }
  };
  return ranges[category];
}

const products = [];
let id = 1;

const categoryDistribution = {
  ART: 130, WATCHES: 120, CARS: 110, JEWELLERY: 120,
  COLLECTIBLES: 110, FASHION: 120, ANTIQUES: 100, SHOES: 95, BAGS: 95
};

for (const [category, count] of Object.entries(categoryDistribution)) {
  const prefixes = categories[category].prefixes;
  
  for (let i = 0; i < count; i++) {
    const prefix = prefixes[i % prefixes.length];
    const suffix = i >= prefixes.length ? ` #${Math.floor(i / prefixes.length) + 1}` : '';
    const title = `${prefix}${suffix}`;
    
    const priceRange = getPriceRange(category);
    const starting = getRandomNumber(priceRange.min, priceRange.max);
    const highestBid = starting + getRandomNumber(10, Math.floor(starting * 0.5));
    const bids = getRandomNumber(5, 50);
    
    products.push({
      id: String(id++).padStart(4, '0'),
      title,
      time: getRandomTime(),
      starting,
      bids,
      highestBid,
      img: getImages(category, i),
      action: getRandomItem(actions),
      category,
      condition: getRandomItem(conditions),
      location: getRandomItem(locations),
      auctionHouse: getRandomItem(auctionHouses),
      description: getRandomItem(descriptions[category]),
      features: getFeatures(category),
      color: getRandomItem(getColor(category).split ? [getColor(category)] : [getColor(category)]),
      gender: (category === "FASHION" || category === "SHOES" || category === "BAGS")
        ? getRandomItem(["men", "women", "unisex"])
        : "unisex"
    });
  }
}

// Shuffle
for (let i = products.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [products[i], products[j]] = [products[j], products[i]];
}

fs.writeFileSync('src/data/products.json', JSON.stringify(products, null, 2), 'utf-8');

console.log(`Generated ${products.length} products`);
const dist = {};
products.forEach(p => { dist[p.category] = (dist[p.category] || 0) + 1; });
console.log('Category distribution:', dist);

// Verify all image URLs
let validCount = 0;
let invalidCount = 0;
products.forEach(p => {
  p.img.forEach(url => {
    if (url.startsWith('https://images.unsplash.com/photo-')) {
      validCount++;
    } else {
      invalidCount++;
      console.log('Invalid URL:', url);
    }
  });
});
console.log(`Valid URLs: ${validCount}, Invalid URLs: ${invalidCount}`);
