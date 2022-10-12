import { NowRequest, NowResponse } from '@vercel/node'
import { google } from 'googleapis'
import { BetaAnalyticsDataClient } from '@google-analytics/data'
import config from './config'

/**
 * Blog hit count. Served by Google Analytics
 */
export default async (req: NowRequest, resp: NowResponse) => {
  // API query page parameter
  const { page = '' } = req.query
  const analyticsDataClient = new BetaAnalyticsDataClient({ projectId: config.auth.projectId, credentials: { client_email: config.auth.clientEmail, private_key: config.auth.privateKey } });


  // page path filter
  const filter =
    page === ''
      ? { dimensionName: 'ga:pagePath', operator: 'BEGINS_WITH', expressions: config.allFilter }
      : {
        dimensionName: 'ga:pagePath',
        operator: 'EXACT',
        expressions: [page] as string[],
      }


  // Runs a simple report.
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${config.propertyId}`,
      dateRanges: [
        {
          startDate: '2020-03-31',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'city',
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
      ],
    });


    resp.setHeader('Access-Control-Allow-Origin', '*')
    resp.status(200).send(response)
}
