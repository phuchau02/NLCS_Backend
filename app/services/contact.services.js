const { ObjectId } = require("mongodb");

class ContactServices {
  constructor(client) {
    this.Contact = client.db().collection("contacts");
  }

  // Thêm mới một liên hệ
  async create(contact) {
    const result = await this.Contact.insertOne(contact);
    return result.ops[0];
  }

  // Lấy tất cả các liên hệ
  async findAll() {
    const cursor = await this.Contact.find();
    return cursor.toArray();
  }

  // Lấy một liên hệ theo ID
  async findOne(id) {
    const result = await this.Contact.findOne({ _id: new ObjectId(id) });
    return result;
  }

  // Cập nhật một liên hệ theo ID
  async update(id, updateData) {
    const result = await this.Contact.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: "after" }
    );
    return result.value;
  }

  // Xóa một liên hệ theo ID
  async remove(id) {
    const result = await this.Contact.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  // Xóa tất cả các liên hệ
  async removeAll() {
    const result = await this.Contact.deleteMany({});
    return result.deletedCount;
  }

  // Tìm kiếm các liên hệ theo tên
  async findByName(name) {
    const cursor = await this.Contact.find({
      name: { $regex: new RegExp(name, "i") },
    });
    return cursor.toArray();
  }
}

module.exports = ContactServices;
