const express = require('express');
const { authRequired } = require('../middleware/auth');
const { getClientConfig } = require('../config/insuranceClients');
const router = express.Router();

// Get client-specific configuration
router.get('/config', authRequired, async (req, res) => {
  try {
    const { get } = require('../db/connection');
    const { getSheetHeaders } = require('../services/sheetFieldsService');
    
    const user = await get('SELECT company_name, email FROM users WHERE id = ?', [req.user.id]);
    const identifier = user.company_name || user.email;
    const config = getClientConfig(identifier);
    
    // Fetch actual column names from Google Sheet
    const sheetHeaders = await getSheetHeaders(config.spreadsheetId, config.tabName);
    
    res.json({
      clientKey: config.key,
      clientName: config.name,
      schema: config.schema,
      spreadsheetId: config.spreadsheetId,
      tabName: config.tabName,
      sheetHeaders: sheetHeaders
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
