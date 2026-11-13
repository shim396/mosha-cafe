/* ==========================================================
   منيو موشا — عدّل الأسعار والأصناف من هنا فقط (الأسعار بالريال اليمني ر.ي)
   price: سعر واحد أو "صغير-كبير"
   img: اسم الصورة داخل images/menu/ (اختياري)
   ========================================================== */
const MENU = [
  {
    id: "coffee", title: "مشروبات القهوة", en: "Coffee", icon: "cup",
    items: [
      { name: "سبانش لاتيه", nameEn: "Spanish Latte", price: "4000-4200", img: "spanish-latte.jpg" },
      { name: "موشا", nameEn: "Mosha Latte", price: "4000-5000", tag: "توقيع موشا", tagEn: "Signature", img: "mosha.jpg" },
      { name: "وايت موكا", nameEn: "White Mocha", price: "5000-5500" },
      { name: "كراميل", nameEn: "Caramel Latte", price: "4500-4700" },
      { name: "كراميل ميكاتو", nameEn: "Caramel Macchiato", price: "4800-5000" },
      { name: "سبانش فانيلا", nameEn: "Spanish Vanilla", price: "4800-5000" },
      { name: "كورتادو", nameEn: "Cortado", price: "4500-4700" },
      { name: "لاتيه", nameEn: "Caffè Latte", price: "3800-4000" },
      { name: "قهوة تركي", nameEn: "Turkish Coffee", price: "5000" },
      { name: "فلات وايت", nameEn: "Flat White", price: "3500" },
      { name: "كابتشينو", nameEn: "Cappuccino", price: "3500" },
      { name: "ماتشا لاتيه", nameEn: "Matcha Latte", price: "5000" }
    ]
  },
  {
    id: "black", title: "بلاك كوفي", en: "Black Coffee", icon: "bean",
    items: [
      { name: "امريكانو", nameEn: "Americano", price: "3500-3700" },
      { name: "V60", nameEn: "V60 Pour Over", price: "6000" },
      { name: "V60 محاصيل مختارة", nameEn: "V60 Single Origin", price: "6500" },
      { name: "اسبريسو", nameEn: "Espresso", price: "2000" },
      { name: "كولد برو", nameEn: "Cold Brew", price: "4000" },
      { name: "قهوة اليوم", nameEn: "Coffee of the Day", price: "3000" }
    ]
  },
  {
    id: "shakes", title: "ميلك شيك وفرابتشينو", en: "Shakes & Frappé", icon: "frappe",
    items: [
      { name: "كراميل", nameEn: "Caramel Shake", price: "5000-5300" },
      { name: "كندر", nameEn: "Kinder Shake", price: "5200-5300" },
      { name: "سنيكرز", nameEn: "Snickers Shake", price: "5000-5300" },
      { name: "شوكلاتة", nameEn: "Chocolate Shake", price: "4900-5200" },
      { name: "نوتيلا", nameEn: "Nutella Shake", price: "4900-5200" },
      { name: "لوتس", nameEn: "Lotus Biscoff Shake", price: "4900-5200" },
      { name: "اوريو", nameEn: "Oreo Shake", price: "5100-5800" },
      { name: "فانيلا", nameEn: "Vanilla Shake", price: "4700-5000" },
      { name: "مانجو", nameEn: "Mango Shake", price: "5400-5800" }
    ]
  },
  {
    id: "mojito", title: "موهيتو وسلاش", en: "Mojito & Slush", icon: "mojito",
    items: [
      { name: "توت أزرق", nameEn: "Blueberry Mojito", price: "3000" },
      { name: "توت أحمر", nameEn: "Raspberry Mojito", price: "3000" },
      { name: "رمان", nameEn: "Pomegranate Mojito", price: "3000" },
      { name: "باشن فروت", nameEn: "Passion Fruit Mojito", price: "3000" },
      { name: "فراولة", nameEn: "Strawberry Mojito", price: "3000" },
      { name: "كيوي", nameEn: "Kiwi Mojito", price: "3000" },
      { name: "كودري", nameEn: "Code Red Mojito", price: "4000" }
    ]
  },
  {
    id: "sweets", title: "قسم الحلا", en: "Desserts", icon: "cake",
    items: [
      { name: "كيك اليوم", nameEn: "Cake of the Day", price: "2200-3000" },
      { name: "تشيز كيك", nameEn: "Cheesecake", price: "4000" },
      { name: "سان سباستيان", nameEn: "San Sebastián Cheesecake", price: "6000" },
      { name: "براونيز", nameEn: "Chocolate Brownies", price: "3000" },
      { name: "كوكيز", nameEn: "Classic Cookies", price: "1500" },
      { name: "كيكة موشا", nameEn: "Mosha Signature Cake", price: "4000", tag: "توقيع موشا", tagEn: "Signature" }
    ]
  },
  {
    id: "signature", title: "مشروبات موشا", en: "Mosha Drinks", icon: "leaf",
    items: [
      { name: "كركدية موشا", nameEn: "Mosha Hibiscus", price: "3000" },
      { name: "ليمون نعناع موشا", nameEn: "Mosha Lemon Mint", price: "4000" },
      { name: "شاي موشا", nameEn: "Mosha Tea", price: "3000", img: "tea.jpg" },
      { name: "موشا شوكلت", nameEn: "Mosha Chocolate", price: "4800" },
      { name: "آيس موشا", nameEn: "Iced Mosha", price: "4500" }
    ]
  }
];
