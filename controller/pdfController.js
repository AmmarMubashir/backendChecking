const pdfSchema = require("../Model/pdfSchema");

exports.uploadPdf = async (req, res) => {
  // console.log(req.body.title, req.file.filename);
  //   console.log(req.body.title, req.file.filename);
  const title = req.body.title;
  const fileName = req.file.filename;

  //   console.log();
  try {
    const data = await pdfSchema.create({ title: title, pdf: fileName });
    res.send({ status: "ok", data });
  } catch (error) {
    res.json({ status: error });
  }
};

exports.getPdf = async (req, res) => {
  try {
    const data = await pdfSchema.find({});

    res.status(200).json(data);
  } catch (error) {
    console.log("Error in get pdf controller", error.message);
    res.status(500).json("Error in getting pdfs");
  }
};
