/**
 * Google Analytics query configurations
 *
 * ! If you are deploying this with your own account
 * ! , then you will need to change this config file.
 * ! Don't put your privateKey inside this file directly!
 */
export default {
  propertyId: '335033272',
  auth: {
    projectId: 'market-visit-count',
    privateKey: process.env.PRIVATE_KEY,
    clientEmail: 'account1@market-visit-count.iam.gserviceaccount.com',
  },
  allFilter: ['/'],
  startDate: '2010-01-01',
  endDate: 'today'
}
