import Airtable from 'airtable';
import csv from 'csv-parse';
import fs from 'fs';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID!);

async function importSubscribers(csvPath: string) {
  const subscribers = fs.readFileSync(csvPath, 'utf-8');
  
  csv.parse(subscribers, {
    columns: true,
    skip_empty_lines: true
  }, async (err, records) => {
    if (err) throw err;

    for (const record of records) {
      try {
        await base('Newsletter Subscribers').create({
          'Email': record.email,
          'Status': 'Active',
          'Subscribed On': new Date().toISOString().split('T')[0],
          'Source': 'Import'
        });
        console.log(`Imported: ${record.email}`);
      } catch (error) {
        console.error(`Failed to import ${record.email}:`, error);
      }
    }
  });
}
