export const categories = [
  'Electronics',
  'Home & Kitchen',
  'Fashion',
  'Sports',
  'Books',
  'Beauty',
  'Toys'
]

const raw = [
  // Electronics
  { id: 1, name: 'Wireless Noise-Cancelling Headphones', brand: 'Aurel', category: 'Electronics', price: 89.99, oldPrice: 129.99, rating: 4.5, reviews: 2841, stock: 24, kw: 'headphones',
    about: 'Over-ear headphones built for long flights and open offices.',
    bullets: ['Active noise cancelling with a transparency mode for announcements', '40 hours of playback, and 10 minutes of charging gives you 3 hours', 'Folds flat into the hard case that comes in the box'] },
  { id: 2, name: 'Smart Watch with Heart Rate Monitor', brand: 'Pulsar', category: 'Electronics', price: 59.99, oldPrice: 79.99, rating: 4.2, reviews: 1520, stock: 12, kw: 'smartwatch',
    about: 'Tracks workouts, sleep and notifications from your phone.',
    bullets: ['1.8 inch always-on display that stays readable in sunlight', '14 sport modes and built-in GPS', 'Water resistant to 50 metres, battery lasts up to 9 days'] },
  { id: 3, name: 'Portable Bluetooth Speaker', brand: 'Nimbus', category: 'Electronics', price: 34.99, rating: 4.6, reviews: 5210, stock: 40, kw: 'speaker',
    about: 'A small speaker that is louder than it looks.',
    bullets: ['360 degree sound with a passive bass radiator', 'Floats and survives a drop in the pool (IP67)', 'Pair two speakers together for stereo sound'] },
  { id: 4, name: '27-inch 4K Monitor', brand: 'Veyra', category: 'Electronics', price: 279, oldPrice: 329, rating: 4.4, reviews: 860, stock: 6, kw: 'monitor',
    about: 'Sharp IPS panel with accurate colours for work and play.',
    bullets: ['3840 x 2160 resolution with 99% sRGB coverage', 'USB-C port charges your laptop and carries video on one cable', 'Height, tilt and swivel adjustable stand'] },

  // Home & Kitchen
  { id: 5, name: 'Air Fryer 5 L with Digital Display', brand: 'Crispa', category: 'Home & Kitchen', price: 79.99, oldPrice: 109.99, rating: 4.5, reviews: 9300, stock: 31, kw: 'kitchen,appliance',
    about: 'Cooks with hot air instead of a pool of oil.',
    bullets: ['Fits a whole chicken or a family-size portion of chips', '8 presets plus manual temperature up to 200 C', 'The basket and tray are dishwasher safe'] },
  { id: 6, name: 'Pour-Over Coffee Set', brand: 'Brewhaus', category: 'Home & Kitchen', price: 42, rating: 4.7, reviews: 640, stock: 18, kw: 'coffee,pourover',
    about: 'Everything you need to brew a clean cup of filter coffee.',
    bullets: ['Glass carafe, ceramic dripper and 40 paper filters', 'Heat resistant to 120 C', 'Makes up to four cups at a time'] },
  { id: 7, name: 'Memory Foam Pillow, 2 Pack', brand: 'Cloudly', category: 'Home & Kitchen', price: 36.99, oldPrice: 49.99, rating: 4.4, reviews: 7420, stock: 55, kw: 'pillow',
    about: 'Medium-firm pillows that keep their shape night after night.',
    bullets: ['Shredded foam you can add to or remove for the right height', 'Washable bamboo cover with a zip', 'Ships rolled up and fluffs up in 24 hours'] },
  { id: 8, name: 'Cast Iron Skillet 26 cm', brand: 'Forge & Fern', category: 'Home & Kitchen', price: 27.5, rating: 4.8, reviews: 12100, stock: 70, kw: 'skillet',
    about: 'Pre-seasoned and ready to use on any hob, grill or campfire.',
    bullets: ['Holds heat evenly for a proper sear', 'Works on gas, electric, induction and in the oven', 'Gets better with use if you dry and oil it after washing'] },

  // Fashion
  { id: 9, name: 'Classic Denim Jacket', brand: 'Northline', category: 'Fashion', price: 54.99, oldPrice: 74.99, rating: 4.3, reviews: 2310, stock: 22, kw: 'denim,jacket',
    about: 'A mid-weight denim jacket with a regular fit.',
    bullets: ['100% cotton denim with a soft wash', 'Two chest pockets and two side pockets', 'Machine washable at 30 C'] },
  { id: 10, name: 'Lightweight Running Sneakers', brand: 'Stridewell', category: 'Fashion', price: 64.99, rating: 4.4, reviews: 3800, stock: 35, kw: 'sneakers',
    about: 'Cushioned everyday trainers for road and treadmill.',
    bullets: ['Breathable knit upper that stretches with your foot', 'Foam midsole with a 8 mm heel drop', 'Rubber outsole with grip in wet weather'] },
  { id: 11, name: 'Canvas Backpack 25 L', brand: 'Tarn', category: 'Fashion', price: 39.99, rating: 4.6, reviews: 4120, stock: 48, kw: 'backpack',
    about: 'A roomy daypack with a padded laptop sleeve.',
    bullets: ['Fits a 15 inch laptop, a lunch box and a jacket', 'Waxed canvas that sheds light rain', 'Padded straps and a back panel for long walks'] },

  // Sports
  { id: 12, name: 'Non-Slip Yoga Mat 6 mm', brand: 'Flexa', category: 'Sports', price: 24.99, oldPrice: 34.99, rating: 4.5, reviews: 8800, stock: 60, kw: 'yoga',
    about: 'Cushioned mat with a grippy surface for sweaty sessions.',
    bullets: ['183 x 61 cm, long enough for most people', 'Textured top that does not slide on wood or tile', 'Comes with a carrying strap'] },
  { id: 13, name: 'Adjustable Dumbbell Pair', brand: 'IronPeak', category: 'Sports', price: 119, oldPrice: 149, rating: 4.6, reviews: 2200, stock: 9, kw: 'dumbbell',
    about: 'Two dumbbells that replace a whole rack of weights.',
    bullets: ['Each one adjusts from 2 kg to 20 kg in 2 kg steps', 'Change the weight by turning a dial, no tools needed', 'Includes a tray that keeps them tidy'] },
  { id: 14, name: 'Insulated Water Bottle 1 L', brand: 'Keepcool', category: 'Sports', price: 22.99, rating: 4.7, reviews: 15300, stock: 120, kw: 'waterbottle',
    about: 'Keeps drinks cold for a day or hot for half of one.',
    bullets: ['Double-wall stainless steel, no condensation on the outside', 'Cold for 24 hours, hot for 12 hours', 'Leak-proof lid with a carry loop'] },

  // Books
  { id: 15, name: 'The Last Lighthouse Keeper', brand: 'Harbour Press', category: 'Books', price: 12.99, rating: 4.6, reviews: 3100, stock: 80, kw: 'book',
    about: 'A novel about the final winter at a remote lighthouse.',
    bullets: ['Paperback, 352 pages', 'Includes a reading group guide', 'Winner of a regional fiction award'] },
  { id: 16, name: 'Cooking by Feel', brand: 'Larder Books', category: 'Books', price: 24.99, oldPrice: 29.99, rating: 4.7, reviews: 1900, stock: 26, kw: 'cookbook',
    about: 'A cookbook that teaches technique first and recipes second.',
    bullets: ['Hardcover with 140 illustrated recipes', 'Chapters organised by method, not by course', 'Substitution notes on every page'] },
  { id: 17, name: 'Learn JavaScript in a Weekend', brand: 'Byteshelf', category: 'Books', price: 29.99, rating: 4.4, reviews: 780, stock: 33, kw: 'programming',
    about: 'A fast, hands-on start for people who already know how to code a little.',
    bullets: ['Paperback, 280 pages', 'Ten small projects, each one finished in an hour', 'Downloadable code for every chapter'] },

  // Beauty
  { id: 18, name: 'Vitamin C Face Serum 30 ml', brand: 'Dewline', category: 'Beauty', price: 17.99, oldPrice: 24.99, rating: 4.3, reviews: 6400, stock: 75, kw: 'skincare',
    about: 'A lightweight serum for brighter-looking skin.',
    bullets: ['15% vitamin C with hyaluronic acid', 'Fragrance free and suitable for daily use', 'Dropper bottle with a dark glass body'] },
  { id: 19, name: 'Ionic Hair Dryer 1800 W', brand: 'Silkair', category: 'Beauty', price: 39.99, rating: 4.4, reviews: 3300, stock: 28, kw: 'hairdryer',
    about: 'Dries quickly with less frizz.',
    bullets: ['Three heat settings and a cool shot button', 'Ionic output to reduce static', 'Includes a concentrator and a diffuser'] },
  { id: 20, name: 'Cordless Beard Trimmer Kit', brand: 'Edgeworks', category: 'Beauty', price: 29.99, rating: 4.5, reviews: 2750, stock: 16, kw: 'trimmer',
    about: 'Rechargeable trimmer with five attachments.',
    bullets: ['20 length settings from 0.5 mm to 10 mm', 'Washable head, runs for 90 minutes per charge', 'Travel pouch included'] },

  // Toys
  { id: 21, name: '1000-Piece Jigsaw Puzzle', brand: 'Pieceworks', category: 'Toys', price: 15.99, rating: 4.7, reviews: 2400, stock: 44, kw: 'puzzle',
    about: 'A landscape puzzle with a poster of the finished picture.',
    bullets: ['Finished size 70 x 50 cm', 'Thick board with a matte finish that reduces glare', 'Pieces cut so they fit tightly'] },
  { id: 22, name: 'Wooden Building Blocks, 100 Pieces', brand: 'Timbertots', category: 'Toys', price: 26.99, oldPrice: 34.99, rating: 4.8, reviews: 5100, stock: 38, kw: 'blocks',
    about: 'Smooth beech blocks in shapes that stack, balance and bridge.',
    bullets: ['For ages 3 and up', 'Finished with water-based, child-safe paint', 'Comes in a cotton storage bag'] },
  { id: 23, name: 'Remote Control Rock Crawler', brand: 'Dustrunner', category: 'Toys', price: 33.99, rating: 4.2, reviews: 1800, stock: 20, kw: 'toy,car',
    about: 'A 1:16 scale truck that climbs over just about anything in the garden.',
    bullets: ['Four-wheel drive with soft rubber tyres', '2.4 GHz remote with a range of 50 metres', 'Two rechargeable batteries, about 40 minutes of play'] },

  // more electronics
  { id: 24, name: 'True Wireless Earbuds', brand: 'Aurel', category: 'Electronics', price: 49.99, oldPrice: 69.99, rating: 4.3, reviews: 6120, stock: 52, kw: 'earbuds',
    about: 'Small earbuds with a charging case that fits in a coin pocket.',
    bullets: ['Six hours per charge, 24 hours with the case', 'Four microphones for clear calls in wind', 'Three sizes of ear tips in the box'] },
  { id: 25, name: 'Power Bank 20000 mAh', brand: 'Voltly', category: 'Electronics', price: 31.99, rating: 4.6, reviews: 9800, stock: 64, kw: 'powerbank',
    about: 'Charges a phone four or five times before it needs a charge itself.',
    bullets: ['USB-C port with 65 W output, enough for most laptops', 'Two extra USB-A ports for phones and watches', 'Small screen shows the exact percentage left'] },
  { id: 26, name: 'Mechanical Keyboard, Tenkeyless', brand: 'Clackwell', category: 'Electronics', price: 59.99, oldPrice: 74.99, rating: 4.5, reviews: 3470, stock: 14, kw: 'keyboard',
    about: 'A compact keyboard with tactile switches that you can swap without soldering.',
    bullets: ['Hot-swappable switches, tactile brown switches fitted', 'Connects by cable, Bluetooth or a 2.4 GHz dongle', 'White backlight with six brightness levels'] },

  // more home & kitchen
  { id: 27, name: 'Robot Vacuum Cleaner', brand: 'Sweepa', category: 'Home & Kitchen', price: 189, oldPrice: 249, rating: 4.2, reviews: 4280, stock: 11, kw: 'vacuum',
    about: 'Maps your rooms, cleans on a schedule and goes back to the dock by itself.',
    bullets: ['2500 Pa suction that handles carpet and hard floors', 'Runs up to 150 minutes on a charge', 'Set no-go zones and cleaning times in the phone app'] },
  { id: 28, name: 'Stoneware Dinner Set, 16 Pieces', brand: 'Clayhouse', category: 'Home & Kitchen', price: 68, rating: 4.6, reviews: 2150, stock: 19, kw: 'plates',
    about: 'Plates and bowls for four, with a reactive glaze that varies from piece to piece.',
    bullets: ['Four dinner plates, side plates, bowls and mugs', 'Dishwasher, microwave and oven safe', 'Stacks tightly in a cupboard'] },
  { id: 29, name: 'Soy Candle Trio', brand: 'Wickery', category: 'Home & Kitchen', price: 21.99, oldPrice: 28.99, rating: 4.7, reviews: 1320, stock: 46, kw: 'candle',
    about: 'Three hand-poured candles in cedar, fig and clean linen.',
    bullets: ['Each candle burns for about 40 hours', 'Cotton wick and soy wax, no paraffin', 'Reusable glass jars with a lid'] },

  // more fashion
  { id: 30, name: 'Polarized Sunglasses', brand: 'Solace', category: 'Fashion', price: 28.99, oldPrice: 39.99, rating: 4.4, reviews: 3920, stock: 58, kw: 'sunglasses',
    about: 'Light frames with lenses that cut glare off water and roads.',
    bullets: ['UV400 protection and polarized lenses', 'Flexible hinges that fit most face shapes', 'Hard case and cleaning cloth included'] },
  { id: 31, name: 'Wool Blend Scarf', brand: 'Northline', category: 'Fashion', price: 24.99, rating: 4.5, reviews: 1760, stock: 41, kw: 'scarf',
    about: 'A long, soft scarf in a herringbone weave.',
    bullets: ['70% wool, 30% acrylic, so it stays soft and keeps its shape', '180 x 30 cm, long enough to wrap twice', 'Dry clean or hand wash cold'] },

  // more sports
  { id: 32, name: 'Cycling Helmet with Rear Light', brand: 'Rimline', category: 'Sports', price: 44.99, rating: 4.5, reviews: 2680, stock: 17, kw: 'bicycle,helmet',
    about: 'A ventilated helmet with a USB-rechargeable light at the back.',
    bullets: ['18 vents and a lightweight in-mold shell', 'Dial at the back adjusts the fit, 56 to 62 cm', 'Rear light lasts 8 hours and is visible from 300 m'] },
  { id: 33, name: 'Resistance Bands Set, 5 Levels', brand: 'Flexa', category: 'Sports', price: 16.99, oldPrice: 22.99, rating: 4.6, reviews: 11200, stock: 90, kw: 'fitness',
    about: 'Five loop bands that go from light stretching to heavy leg work.',
    bullets: ['Natural latex that does not roll or pinch', 'Colour coded from 5 kg to 25 kg of resistance', 'Mesh bag and a printed exercise guide included'] },

  // more books
  { id: 34, name: 'Salt Orbit', brand: 'Harbour Press', category: 'Books', price: 14.99, rating: 4.4, reviews: 2060, stock: 52, kw: 'library',
    about: 'A science fiction novel about a salvage crew that finds a ship that should not exist.',
    bullets: ['Paperback, 410 pages', 'First book in a trilogy', 'Includes a map of the system and a short glossary'] },

  // more beauty & toys
  { id: 35, name: 'Electric Toothbrush with 3 Heads', brand: 'Dentora', category: 'Beauty', price: 34.99, oldPrice: 49.99, rating: 4.5, reviews: 5340, stock: 30, kw: 'toothbrush',
    about: 'Sonic toothbrush with a two minute timer that pauses every 30 seconds.',
    bullets: ['Five modes, including gum care and whitening', 'One charge lasts about 30 days', 'Travel case comes in the box'] },
  { id: 36, name: 'Acrylic Paint Set, 24 Colours', brand: 'Easel & Co', category: 'Toys', price: 19.99, rating: 4.7, reviews: 2890, stock: 36, kw: 'paint',
    about: 'Bright, thick paints for canvas, wood and paper, with three brushes.',
    bullets: ['24 tubes of 12 ml, non-toxic', 'Dries in about 20 minutes and is water resistant after that', 'Brushes and a palette included'] }
]

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// Every picture is a list of places to try, in order:
//   1. a file you put in /public/images (named like the slug + -1.jpg, -2.jpg ...)
//   2. your own link, if you add `photos: ['https://...', ...]` to the product above
//   3. a stock photo found by keyword
//   4. a random photo, so the page never has a hole in it
// If nothing loads, ProductImage shows a plain tile.
export const products = raw.map((p) => {
  const slug = slugify(p.name)
  const images = [1, 2, 3].map((n) => [
    `/images/${slug}-${n}.jpg`,
    ...(p.photos && p.photos[n - 1] ? [p.photos[n - 1]] : []),
    `https://loremflickr.com/640/640/${p.kw}?lock=${p.id * 10 + n}`,
    `https://picsum.photos/seed/${slug}-${n}/640/640`
  ])
  return { ...p, slug, images }
})


export function getProduct(id) {
  return products.find((p) => p.id === Number(id))
}

export function discount(p) {
  return p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0
}

export function money(n) {
  return '$' + n.toFixed(2)
}

export function deliveryDate(days = 3) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
}
