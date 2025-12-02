const express = require('express');
const { authRequired } = require('../middleware/auth');
const { getClientConfig } = require('../config/insuranceClients');
const router = express.Router();

// Get client-specific configuration
router.get('/config', authRequired, (req, res) => {
  try {
    const config = getClientConfig(req.user.email);
    res.json({
      clientKey: config.key,
      clientName: config.name,
      schema: config.schema,
      spreadsheetId: config.spreadsheetId,
      tabName: config.tabName
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
