import type { CareersContentModel } from '@/types';

/**
 * Used until a Careers document is published in Sanity. Once one exists, it
 * takes over, including its "Currently hiring" switch.
 */
export const careersFallbackValue: CareersContentModel = {
  _id: 'careers',
  _type: 'careers',
  _createdAt: '2026-11-26T00:00:00Z',
  isHiring: true,
  roleTitle: 'A Grade Electrician',
  bannerText: "We're hiring an A Grade Electrician",
  teamCardHeading: 'This could be you',
  teamCardButton: 'Join the team',
  seoTitle: "A Grade Electrician Job in Melbourne's West | Storm Electrical Solutions",
  seoDescription:
    'Storm Electrical Solutions is hiring a licensed A Grade Electrician in Altona North. Residential, commercial and solar work across Melbourne. Call or email to apply.',
  heading: 'Join our team as an A Grade Electrician',
  intro: [
    "We're a local electrical business based in Altona North, looking after homes and businesses across Melbourne's west since 2018.",
    "Our work keeps growing, so we're looking for a licensed A Grade Electrician to join Karl and the team. You'll get a good mix of jobs and work with people who take pride in doing things properly.",
  ],
  employmentType: 'FULL_TIME',
  responsibilities: [
    'Residential and commercial electrical work, from fault finding to new installs',
    'Switchboard upgrades, lighting, power points and data cabling',
    'Air conditioning and solar installations',
    'Testing and tagging, and safety checks',
    'Dealing directly with customers on site',
  ],
  requirements: [
    'Victorian A Grade Electrical Licence',
    "Current driver's licence",
    'Construction induction card (White Card)',
    'Experience in residential and commercial work',
    'Good communication and a tidy, safety-first approach',
  ],
  benefits: [
    'Steady, full-time work with a growing local business',
    'Variety: residential, commercial, solar and air conditioning',
    'A small, supportive team led by an experienced director',
    'Ongoing training and accreditations',
    'Competitive pay based on experience',
  ],
  applyText:
    'Send an email with your resume, or give Karl a call for a chat. Tell us a bit about your experience and when you could start.',
  applyEmail: 'info@sesmelbourne.com.au',
  referralText:
    "Put a great A Grade Electrician in touch with us. If we hire them and they pass their 3-month probation, we'll pay you $1,000.",
  datePosted: '2026-11-26',
};
