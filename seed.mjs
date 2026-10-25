import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

const articleContent = {
  'why-most-freelancers-overpay': [
    'Most freelancers do not set aside enough for taxes during the year, which turns a manageable bill into a stressful surprise in April. The first fix is simple: calculate your tax rate once, then move that percentage into a separate savings account every time an invoice is paid.',
    'The second mistake is missing deductions. Home office costs, software subscriptions, payment processing fees, business travel, and a portion of your phone and internet bill can all reduce taxable income. Keep receipts and log expenses as they happen instead of reconstructing a year of spending later.',
    'Estimated taxes are another common trap. If you expect to owe more than a small amount for the year, the IRS generally expects quarterly payments. Paying too little can trigger an underpayment penalty even when your final return is correct.',
    'Finally, do not confuse revenue with profit. A bookkeeping routine that tracks income and expenses monthly gives you a realistic view of what you actually earned, which makes both tax planning and pricing decisions much easier.',
  ].join('\n\n'),
  'freshbooks-vs-quickbooks': [
    'FreshBooks and QuickBooks both handle the core needs of a freelance business: invoicing, expense tracking, and financial reports. The better choice depends on how much accounting complexity you want to take on and how you prefer to work.',
    'FreshBooks is generally easier to learn. Its invoice-first design suits solo consultants, writers, and designers who mainly need to bill clients, record expenses, and see a clean profit-and-loss statement. Time tracking and client-friendly estimates are built into the workflow.',
    'QuickBooks is the stronger option when your business is growing. It offers deeper reporting, more robust bank reconciliation, inventory support, and an ecosystem of accountants and integrations. That flexibility comes with a steeper learning curve and a higher price at most tiers.',
    'For a freelancer with straightforward income and expenses, FreshBooks is often the faster path. If you plan to hire contractors, carry inventory, or hand your books to an accountant who works in QuickBooks, choose QuickBooks and invest the time in learning it properly.',
  ].join('\n\n'),
};

async function seed() {
  const [seriesRow] = await sql`
    INSERT INTO series (slug, title, description)
    VALUES (
      'freelancer-accounting-stack',
      'The Freelancer Accounting Stack',
      'The ultimate guide to setting up your freelance finances.'
    )
    ON CONFLICT (slug) DO UPDATE
    SET title = EXCLUDED.title,
        description = EXCLUDED.description
    RETURNING id
  `;

  const seriesId = seriesRow.id;
  console.log('Series ID:', seriesId);

  const articleRows = [
    {
      slug: 'why-most-freelancers-overpay',
      title: 'Why Most Freelancers Overpay on Taxes',
      excerpt:
        'The budgeting, deduction, and estimated-tax mistakes that quietly inflate your annual tax bill.',
      seriesOrder: 1,
    },
    {
      slug: 'freshbooks-vs-quickbooks',
      title: 'FreshBooks vs. QuickBooks for Freelancers',
      excerpt:
        'A practical comparison of the two most popular accounting tools for solo consultants.',
      seriesOrder: 2,
    },
  ];

  for (const article of articleRows) {
    await sql`
      INSERT INTO articles (slug, title, content, excerpt, author_name, series_id, series_order)
      VALUES (
        ${article.slug},
        ${article.title},
        ${articleContent[article.slug]},
        ${article.excerpt},
        'Jane Doe',
        ${seriesId},
        ${article.seriesOrder}
      )
      ON CONFLICT (slug) DO UPDATE
      SET title = EXCLUDED.title,
          content = EXCLUDED.content,
          excerpt = EXCLUDED.excerpt,
          author_name = EXCLUDED.author_name,
          series_id = EXCLUDED.series_id,
          series_order = EXCLUDED.series_order
    `;
  }

  console.log(`Seeded ${articleRows.length} articles for series ${seriesId}.`);
  return seriesId;
}

await seed();
