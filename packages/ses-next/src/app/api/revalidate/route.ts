import { revalidateTag } from 'next/cache';

import { config } from '@/lib/config';

type RevalidateBody = {
  _type: string;
};

const allowedTypes = new Set([
  'siteSettings',
  'homepage',
  'service',
  'blog-post',
  'faq',
  'locationPage',
  'terms-and-conditions',
  'teamMember',
  'training',
  'showcase',
  'servicesHub',
]);

export async function POST(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (authHeader !== `Bearer ${config.revalidateSecret}`) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  let rawBody: unknown;
  try {
    rawBody = JSON.parse(await request.text());
  } catch {
    return Response.json({ message: 'Invalid request body' }, { status: 400 });
  }

  const body = rawBody as RevalidateBody;
  if (!body._type) {
    return Response.json({ message: 'Missing _type field' }, { status: 400 });
  }

  if (!allowedTypes.has(body._type)) {
    return Response.json({ message: 'Unknown document type' }, { status: 400 });
  }

  revalidateTag(body._type, 'default');

  return Response.json({ revalidated: true, tag: body._type });
}

export async function GET() {
  return Response.json({ message: 'Method not allowed' }, { status: 405 });
}
