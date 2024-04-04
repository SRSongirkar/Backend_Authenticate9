const { SpamReport } = require('../Models');


  const markAsSpam= async (req, res) => {
    try {
      const { phoneNumber, userId } = req.body;
      const spamReport = await SpamReport.create({ phoneNumber, userId });
      res.status(201).json(spamReport);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const getSpamReports = async(req, res)=> {
    try {
      const userId = req.params.userId;
      const spamReports = await SpamReport.findAll({ where: { userId } });
      res.json(spamReports);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


module.exports = {markAsSpam,getSpamReports};
