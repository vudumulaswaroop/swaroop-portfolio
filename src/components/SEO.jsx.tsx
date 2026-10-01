import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    canonicalUrl?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, canonicalUrl }) => {
    const { t } = useTranslation();
    const siteUrl = canonicalUrl || 'https://swaroopvudumula.com/';
    const defaultTitle = t('seo.title');
    const defaultDescription = t('seo.description');

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title ? `${title} | Swaroop Reddy Vudumula` : defaultTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || t('seo.keywords')} />
            <meta property="og:locale" content={i18n.language.replace('-', '_')} />
            <link rel="canonical" href={siteUrl} />

            {/* Open Graph / Social Media */}
            <meta property="og:title" content={title || defaultTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:type" content="website" />

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title || defaultTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
        </Helmet>
    );
};

export default SEO;