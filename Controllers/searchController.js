const { Op, Sequelize } = require("sequelize");
const express = require("express");
const User = require("../Models/User");
const Spam = require("../Models/SpamReport");
const Contact = require("../Models/Contact");


const searchByNumber = async (req, res) => {
  const { number } = req.query;
  if (number) {
    try {
      const spamNumbers = await Spam.findAll({
        attributes: [
          "PhoneNumber",
          [Sequelize.fn("COUNT", Sequelize.col("*")), "spamCount"],
        ],
        group: ["PhoneNumber"],
      });

      const spamNumbersDict = spamNumbers.reduce((acc, spamNumber) => {
        acc[spamNumber.dataValues.PhoneNumber] =
          spamNumber.dataValues.spamCount;
        return acc;
      }, {});


      const registeredUser = await User.findOne({
        where: { PhoneNumber: number },
      });
      if (registeredUser) {
        res.json({
          results: [
            {
              name: registeredUser.name,
              PhoneNumber: registeredUser.PhoneNumber,
              noOfUsersReportedAsSpam:
                spamNumbersDict[registeredUser.PhoneNumber] || 0,
              email: registeredUser.email,
            },
          ],
        });
      } else {
   
        const contacts = await Contact.findAll({
          attributes: ["name", "PhoneNumber"],
          where: { PhoneNumber: number },
        });
        if (contacts.length > 0) {
          res.json({
            results: contacts.map((contact) => ({
              name: contact.name,
              PhoneNumber: contact.Phone_number,
              noOfUsersReportedAsSpam:
                spamNumbersDict[contact.PhoneNumber] || 0,
            })),
          });
        } else {
         
          const count = await Spam.count({
            where: { PhoneNumber: number },
          });
          if (count > 0) {
            res.json({
              number: number,
              msg: "Number is marked as spam by" + count + " users",
            });
          } else {
            res.json({ err: "No user with this number exists" });
          }
        }
      }
    } catch (error) {
      console.error("Error while searching by number:", error);
      res.status(500).json({ error: "Issue occurred" });
    }
  } else {
    res.status(400).json({ err: "Invalid Request. Number not provided" });
  }
};

const searchByName = async (req, res) => {
  const { name } = req.query;
  if (name) {
    try {
    
      const registeredUsers1 = await User.findAll({
        attributes: ["name", "PhoneNumber"],
        where: {
          name: {
            [Op.iLike]: name + "%",
          },
        },
      });

     
      const contacts1 = await Contact.findAll({
        attributes: ["name", "PhoneNumber"],
        where: {
          name: {
            [Op.iLike]: name + "%",
          },
        },
      });

      const registeredUsers2 = await User.findAll({
        attributes: ["name", "PhoneNumber"],
        where: {
          name: {
            [Op.notILike]: name + "%",
            [Op.iLike]: "%" + name + "%",
          },
        },
      });

   
      const contacts2 = await Contact.findAll({
        attributes: ["name", "PhoneNumber"],
        where: {
          name: {
            [Op.notILike]: name + "%",
            [Op.iLike]: "%" + name + "%",
          },
        },
      });

  
      const spamNumbers = await Spam.findAll({
        attributes: [
          "PhoneNumber",
          [Sequelize.fn("COUNT", Sequelize.col("*")), "spamCount"],
        ],
        group: ["PhoneNumber"],
      });

     
      const spamNumbersDict = spamNumbers.reduce((acc, spamNumber) => {
        acc[spamNumber.dataValues.PhoneNumber] =
          spamNumber.dataValues.spamCount;
        return acc;
      }, {});

      let namePhoneArray = [];
      registeredUsers1.forEach((user) => {
        if (
          !namePhoneArray.some(
            (obj) =>
              obj.name === user.dataValues.name &&
              obj.PhoneNumber === user.dataValues.PhoneNumber
          )
        ) {
          namePhoneArray.push({
            name: user.dataValues.name,
            PhoneNumber: user.dataValues.PhoneNumber,
            spamCount: spamNumbersDict[user.dataValues.PhoneNumber] || 0,
          });
        }
      });

      contacts1.forEach((contact) => {
        if (
          !namePhoneArray.some(
            (obj) =>
              obj.name === contact.dataValues.name &&
              obj.PhoneNumber === contact.dataValues.PhoneNumber
          )
        ) {
          namePhoneArray.push({
            name: contact.dataValues.name,
            PhoneNumber: contact.dataValues.PhoneNumber,
            spamCount: spamNumbersDict[contact.dataValues.PhoneNumber] || 0,
          });
        }
      });

      registeredUsers2.forEach((user) => {
        if (
          !namePhoneArray.some(
            (obj) =>
              obj.name === user.dataValues.name &&
              obj.PhoneNumber === user.dataValues.PhoneNumber
          )
        ) {
          namePhoneArray.push({
            name: user.dataValues.name,
            PhoneNumber: user.dataValues.PhoneNumber,
            spamCount: spamNumbersDict[user.dataValues.PhoneNumber] || 0,
          });
        }
      });

      contacts2.forEach((contact) => {
        if (
          !namePhoneArray.some(
            (obj) =>
              obj.name === contact.dataValues.name &&
              obj.PhoneNumber === contact.dataValues.PhoneNumber
          )
        ) {
          namePhoneArray.push({
            name: contact.dataValues.name,
            PhoneNumber: contact.dataValues.PhoneNumber,
            spamCount: spamNumbersDict[contact.dataValues.PhoneNumber] || 0,
          });
        }
      });

      res.status(200).json({ results: namePhoneArray });
    } catch (error) {
      console.error("Error searching by name:", error);
      res.status(500).json({ error: "Issue occurred" });
    }
  } else {
    res.status(400).json({ err: "Invalid Request. Name not provided" });
  }
};

module.exports = {searchByNumber,searchByName};