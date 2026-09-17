import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    canonicalUrl?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, canonicalUrl }) => {
    const siteUrl = canonicalUrl || 'https://swaroopvudumula.com/';
    const defaultTitle = 'Swaroop Reddy Vudumula | Software Engineer, Agri Milk & Pharma Tech';
    const defaultDescription = 'Official portfolio of Swaroop Reddy Vudumula featuring Agri Milk live updates, Pharma Tech, pharmaceutical machinery engineering, and IT software development.';

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title ? `${title} | Swaroop Reddy Vudumula` : defaultTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || 'Swaroop, Swaroop Reddy, Swaroop Reddy Vudumula, Swaroop Vudumula, Agri Milk, Pharma Tech, Pharma Machinery, UI Developer, Software Engineer'} />
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