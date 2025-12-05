const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/env');
const { runMigrations } = require('./db/connection');
const { errorHandler, notFoundHandler } = require('./middleware/error');

// Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const walletRoutes = require('./routes/wallet');
const billingRoutes = require('./routes/billing');
const toolsRoutes = require('./routes/tools');
const jobsRoutes = require('./routes/jobs');
const candidatesRoutes = require('./routes/candidates');
const resumesRoutes = require('./routes/resumes');
const emailRoutes = require('./routes/email');
const analyticsRoutes = require('./routes/analytics');
const testSheetsRoutes = require('./routes/test-sheets');
const testConnectionRoutes = require('./routes/testConnection');
const clientAnalyticsRoutes = require('./routes/client-analytics');

const adminCandidatesRoutes = require('./routes/admin-candidates');
const voiceRoutes = require('./routes/voice');
const applicationsRoutes = require('./routes/applications');
const resumeParserRoutes = require('./routes/resume-parser');
const insuranceRoutes = require('./routes/insurance');
const insuranceConfigRoutes = require('./routes/insuranceConfig');
const messageWebhooksRoutes = require('./routes/messageWebhooks');


const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://automations-frontend-production-01fd.up.railway.app",
    "https://hr-agent-dashboard-production-01fd.up.railway.app",
    "https://automationdash.up.railway.app"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(morgan('dev'));

// Stripe webhook needs raw body
app.use('/api/billing/stripe/webhook', express.raw({ type: 'application/json' }));
app.use('/api/billing/razorpay/webhook', express.raw({ type: 'application/json' }));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database and run migrations
async function initializeDatabase() {
  try {
    await runMigrations();
    
    // Run insurance company name migration
    const migration004 = require('../migrations/004-set-insurance-company-names');
    await migration004.up();
    console.log('✅ Insurance company names migration completed');
    
    // Run client message tables migration
    const migration005 = require('../migrations/005-create-client-message-tables');
    await migration005.up();
    console.log('✅ Client message tables migration completed');
  } catch (err) {
    console.error('❌ Failed to initialize database:', err);
    process.exit(1);
  }
}

initializeDatabase();

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Viral Bug Automations API', 
    version: '1.0.0',
    status: 'running' 
  });
});

app.use('/uploads', express.static('uploads'));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/tools', toolsRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/candidates', candidatesRoutes);
app.use('/api/resumes', resumesRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/test-sheets', testSheetsRoutes);
app.use('/api/client-analytics', clientAnalyticsRoutes);
app.use('/api/test-connection', testConnectionRoutes);
app.use('/api/test', require('./routes/test-sync'));
app.use('/api/admin/candidates', adminCandidatesRoutes);
app.use('/api/voice', voiceRoutes);
app.use('/api/applications', applicationsRoutes);
app.use('/api/resume-parser', resumeParserRoutes);
app.use('/api/debug-sheets', require('./routes/debugSheets'));
app.use('/api/debug-sheet', require('./routes/debug-sheet'));
app.use('/api/debug', require('./routes/debug'));
app.use('/api/insurance', insuranceRoutes);
app.use('/api/insurance-config', insuranceConfigRoutes);
app.use('/api/policies', require('./routes/policies'));
app.use('/api/webhooks', messageWebhooksRoutes);


// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`🚀 Viral Bug Automations server running on http://localhost:${config.port}`);
  console.log(`📝 Environment: ${config.nodeEnv}`);
  console.log(`🔗 Frontend URL: ${config.frontendUrl}`);
});

module.exports = app;