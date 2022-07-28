const { Text } = require("../db");

const controller = {};

controller.allText = async (req, res) => {
  const { text } = req.query;
  //const invertedText = text.split("").reverse().join("");

  try {
    const allText = await Text.findAll();
    // const searchText = await allText.filter((t) =>
    //   t.text.toLowerCase().includes(text.toLowerCase())
    // );

    if (!text) {
      res.status(200).send(allText);
      // } else if (text.toLowerCase().split("").reverse().join("")=text) {
      //   res.status(200).json({
      //     data1: text.toLowerCase().split("").reverse().join(""),
      //     palindrome: true,
      //   });
    } else {
      text.toLowerCase().split("").reverse().join("") != text
        ? res.status(200).json({
            text: text,
            invertedText: text.toLowerCase().split("").reverse().join(""),
            palindrome: false,
          })
        : res.status(200).json({
            text: text,
            invertedText: text.toLowerCase().split("").reverse().join(""),
            palindrome: true,
          });
    }
  } catch (error) {
    console.log(error);
  }
};

controller.createText = async (req, res) => {
  const { text } = req.body;

  const validate = (validator) => {
    const separate = validator.split("");
    const letters = [];
    //console.log(separate.toString().split(",").join(""), "separate");
    for (let i = 0; i <= separate.length; i++) {
      if (isNaN(separate[i]) || separate[i] == " ") {
        // letters.push(separate[i]);
        continue;
      } else {
        return res.status(400).send("text must be only letters");
      }
    }
    return separate.toString().split(",").join("");
  };

  try {
    const textExist = await Text.findOne({
      where: {
        text,
      },
    });

    if (textExist) {
      res.status(400).send("text allready exist");
    } else {
      await Text.create({
        text: validate(text),
      });
    }
    res.status(200).send("text created");
  } catch (error) {
    console.log(error);
    //return res.status(400).send("text must be only letters");
  }
};

controller.editText = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    await Text.update(
      {
        text,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).send("text update");
  } catch (error) {
    console.log(error);
  }
};

controller.eliminateText = async (req, res) => {
  const { id } = req.params;

  try {
    await Text.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("text eliminated");
  } catch (error) {
    console.log(error);
  }
};

module.exports = controller;
