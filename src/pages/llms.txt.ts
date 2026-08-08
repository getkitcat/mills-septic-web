import type { APIRoute } from 'astro';
import site from '../data/site.json';

// /llms.txt — a clean, link-rich summary for AI answer engines (ChatGPT,
// Perplexity, Google AI Overviews, Claude): who we are + what we do.
export const GET: APIRoute = async ({ site: astroSite }) => {
  const u = (astroSite?.href ?? 'https://example.com/').replace(/\/$/, '');

  const body = `# ${site.name}

> Local septic company serving Ocala and all of Marion County, FL. Septic tank pumping, cleaning, inspections, drainfield repair and replacement, septic repair, new system installation, grease trap pumping, and 24/7 emergency service — with honest diagnosis and upfront pricing.

## Key facts
- Business: ${site.legalName}
- Location: ${site.address.city}, ${site.address.state} ${site.address.zip}
- Phone: ${site.phone} (24/7 emergency)
- Website: ${u}
- Hours: 24 hours a day, 7 days a week — including weekends and holidays
- Service area: Ocala and all of Marion County FL — including Belleview, Silver Springs, Dunnellon, Summerfield, Ocklawaha, Marion Oaks, Anthony, Reddick, Fort McCoy and surrounding communities
- Estimates: free and on-site

## What makes us different
- One local company handles the whole system — pumping, repair, drainfield work, and installs in-house, so you're not bounced between contractors.
- Honest diagnosis: sludge and solids measured on every visit; we only recommend a pump-out or repair when it's actually needed.
- 24/7 emergency response across Marion County.

## Services
- [Septic Tank Pumping](${u}/services/#pumping): Routine and emergency pump-outs for homes and businesses.
- [Septic Cleaning & Maintenance](${u}/services/#cleaning): Filter cleaning and maintenance that prevents backups.
- [Septic Inspections](${u}/services/#inspection): Real-estate and point-of-sale inspections with a written report.
- [Drainfield Repair & Replacement](${u}/services/#drainfield): Diagnosis and repair or rebuild of failing fields.
- [Septic Repair](${u}/services/#repair): Pipes, baffles, lift pumps, clogs and backups.
- [New System Installation](${u}/services/#install): Complete new systems, permitted and inspected.
- [Grease Trap Pumping](${u}/services/#grease): Scheduled service for restaurants and commercial kitchens.
- [24/7 Emergency Service](${u}/services/#emergency): After-hours, weekend and holiday response.

## Company
- [Home](${u}/)
- [Services We Offer](${u}/services/)
- [Service Areas](${u}/service-areas/)
- [About](${u}/about/)
- [Contact](${u}/contact/)

## Contact
Call ${site.phone} any time — 24/7 emergency service, free estimates, serving all of Marion County, FL.
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
