import { MongoAPIError } from "mongodb";
import ContactServices from "../app/services/contact.services";
import MongoDB from "../app/utils/mongodb.utils";

exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new MongoAPIError(400, "Name can not be empty"));
  }
  try {
    const ContactServices = new ContactServices(MongoDB.client);
    const document = await ContactServices.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new MongoAPIError(500, "An error occurred while creating the contact")
    );
  }
};
