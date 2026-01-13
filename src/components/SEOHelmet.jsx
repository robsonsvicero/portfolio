import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHelmet = ({ 
  title = 'Svicero Studio - Design Digital & Desenvolvimento Web',
  description = 'Transformamos suas ideias em experiências digitais memoráveis. Especialistas em UI/UX Design, Desenvolvimento Front-End e Identidade Visual.',
  keywords = 'design digital, desenvolvimento web, ui ux design, front-end, identidade visual, branding',
  ogImage = '/images/og-image.jpg',
  ogType = 'website'
}) => {
  const siteUrl = 'https://svicerostudio.com.br';
  const fullTitle = title.includes('Svicero Studio') ? title : `${title} | Svicero Studio`;

  return (
    <Helmet>
      {/* Meta Tags Básicas */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="Svicero Studio" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Robots */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
    </Helmet>
  );
};

export default SEOHelmet;
