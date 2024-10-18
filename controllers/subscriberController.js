const Subscriber = require("../models/Subscriber");

// E-posta aboneliği oluşturma fonksiyonu
const subscribe = async (req, res) => {
  const { email } = req.body;

  try {
    // E-posta adresinin daha önce kaydedilip kaydedilmediğini kontrol et
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: "Bu e-posta zaten abone." });
    }

    // Yeni abonelik oluştur
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.status(201).json({ message: "Abone olundu!" });
  } catch (error) {
    console.error("Abonelik hatası:", error);
    res
      .status(500)
      .json({ message: "Abonelik oluşturulurken bir hata oluştu." });
  }
};

module.exports = { subscribe };
