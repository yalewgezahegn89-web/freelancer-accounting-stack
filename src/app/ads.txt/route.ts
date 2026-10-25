export async function GET() {
  const publisherId = process.env.ADSENSE_PUBLISHER_ID ?? '';
  const cleanId = publisherId.replace(/^ca-/, '');
  const content = cleanId ? `google.com, ${cleanId}, DIRECT, f08c47fec0942fa0` : '';
  
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}